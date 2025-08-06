import { NextResponse } from "next/server";
import { Resend } from "resend";
const resend = new Resend(process.env.RESEND_API_KEY!);

export async function POST(req: Request) {
  try {
    const { name, email, message,recaptcha } = await req.json();

      const recaptchaResponse = await fetch(
    `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${recaptcha}`,
    {
      method: 'POST',
    }
  );
  const recaptchaResult = await recaptchaResponse.json();

  // Eğer reCAPTCHA doğrulaması başarısız olursa hata mesajı dönüyoruz
  if (!recaptchaResult.success) {
    // Next.js 13+ App Router için NextResponse kullanılır
    return NextResponse.json(
      { message: 'reCAPTCHA verification failed.' },
      { status: 400 } // Bad Request
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

    console.log("Email send:", emailResponse);
    return NextResponse.json({ message: "success" }, { status: 200 });
  } catch (error) {
    console.log("error:", error);
    return NextResponse.json({ message: "error" }, { status: 500 });
  }
}
