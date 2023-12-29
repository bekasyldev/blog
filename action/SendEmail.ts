import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend("re_F5ERk6aC_PwTqVVR46X29h8RnwMnLG5gT");

export default async function SendEmail() {
  try {
    const data = await resend.emails.send({
      from: `[${process.env.ADMIN_EMAIL}]`,
      to: ["utepovbekasyl@gmail.com"],
      subject: "Hello World",
      html: "<strong>It works!</strong>",
    });

    console.log(data);
  } catch (error) {
    console.error("Action error", error);
    return new NextResponse("[SEND EMAIL ERROR]", {status: 502})
  }
}
