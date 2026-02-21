import { templates } from "@/components/email/templates";
import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function POST(req: Request) {
  const { to, subject, template, data } = await req.json();

  if (!templates[template as keyof typeof templates]) {
    return NextResponse.json({ error: "Template inválido" }, { status: 400 });
  }

  const { error } = await resend.emails.send({
    from: process.env.EMAIL_FROM!,
    to,
    subject,
    react: templates[template as keyof typeof templates](data),
  });

  if (error) {
    return NextResponse.json({ error }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
