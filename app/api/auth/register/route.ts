import { NextResponse } from "next/server";
import { prismadb } from "@/lib/db";
import bcrypt from "bcryptjs";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, username, password, firstName, lastName } = body;

    if (!email || !username || !password || !firstName || !lastName) {
      return NextResponse.json(
        { message: "Tum alanlar zorunludur." },
        { status: 400 }
      );
    }

    if (typeof password !== "string" || password.length < 6) {
      return NextResponse.json(
        { message: "Sifre en az 6 karakter olmalidir." },
        { status: 400 }
      );
    }

    // Giris tarafi da ayni normalizasyonu yapiyor; buyuk/kucuk harf farki
    // yuzunden kullanicinin kendi hesabina girememesini engelliyor.
    const normalizedEmail = String(email).trim().toLowerCase();
    const normalizedUsername = String(username).trim();

    const existingUser = await prismadb.user.findFirst({
      where: {
        OR: [{ email: normalizedEmail }, { username: normalizedUsername }],
      },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "Bu e-posta veya kullanici adi zaten kayitli." },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    await prismadb.user.create({
      data: {
        email: normalizedEmail,
        username: normalizedUsername,
        photo: "",
        firstName,
        lastName,
        hashedPassword,
      },
    });

    return NextResponse.json(
      { message: "Kullanıcı başarıyla oluşturuldu" },
      { status: 201 }
    );
  } catch (error) {
    console.error("register error:", error);
    return NextResponse.json(
      { message: "Sunucu hatasi. Lutfen daha sonra tekrar deneyin." },
      { status: 500 }
    );
  }
}
