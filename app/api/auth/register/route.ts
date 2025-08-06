import { NextResponse } from "next/server";
import { prismadb } from "@/lib/db";
import bcrypt from "bcrypt";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, username, password, firstName, lastName } = body;

    if (!email || !username || !password || !firstName || !lastName) {
      console.log("Missing required fields:", {
        email,
        username,
        password,
        firstName,
        lastName,
      });
      return NextResponse.json(
        { message: "ERROR Missing required fields" },
        { status: 400 }
      );
    }

    console.log("ALL required fields provided")

    const existingUser = await prismadb.user.findFirst({
        where:{
            OR:[{email},{username}]
        }
    })
    if(existingUser){
        console.log("User already existing : " ,existingUser)
        return NextResponse.json(
            {message:"User with provided email or username already"},
            {status:400}
        )
    }
    console.log("No existing user found")

    console.log("Hashing password...")
    
    const hashedPassword = await bcrypt.hash(password,12)

    console.log("Password hashed successfully")
    console.log("Creating new user in database")

    const user = await prismadb.user.create({
        data:{
            email,
            username,
            photo:"",
            firstName,
            lastName,
            hashedPassword,
        }
    })

    console.log("User created successfully: ",user)
  return NextResponse.json({ message: "Kullanıcı başarıyla oluşturuldu" }, { status: 201 });

  } catch (error) {
    console.error("register error : ",error)
    return NextResponse.json({ message: "someting went wrong" }, { status: 500 });
  }
}
