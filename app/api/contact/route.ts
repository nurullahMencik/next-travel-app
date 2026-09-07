import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

// Resend istemcisi modül seviyesinde degil, istek aninda olusturuluyor.
// Aksi halde RESEND_API_KEY tanimli degilken "next build" tamamen coker.
function getResend() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return null;
  return new Resend(apiKey);
}

export async function POST(req: Request) {
  try {
    const { name, email, message, recaptcha } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { message: "Name, email and message are required." },
        { status: 400 }
      );
    }

    // reCAPTCHA yalnizca secret key tanimliysa dogrulanir.
    if (process.env.RECAPTCHA_SECRET_KEY) {
      const recaptchaResponse = await fetch(
        `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${recaptcha}`,
        { method: "POST" }
      );
      const recaptchaResult = await recaptchaResponse.json();

      if (!recaptchaResult.success) {
        return NextResponse.json(
          { message: "reCAPTCHA verification failed." },
          { status: 400 }
        );
      }
    }

    const resend = getResend();
    if (!resend) {
      console.error("contact error: RESEND_API_KEY is not configured");
      return NextResponse.json(
        { message: "Mail service is not configured." },
        { status: 503 }
      );
    }

    const emailResponse = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: ["nurullahmencik42@gmail.com"],
      subject: "Mail",
      html: `
    <h2>Mail</h2>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Message:</strong> ${message}</p>
  `,
    });

    if (emailResponse.error) {
      console.error("contact error:", emailResponse.error);
      return NextResponse.json({ message: "error" }, { status: 500 });
    }

    return NextResponse.json({ message: "success" }, { status: 200 });
  } catch (error) {
    console.error("contact error:", error);
    return NextResponse.json({ message: "error" }, { status: 500 });
  }
}
