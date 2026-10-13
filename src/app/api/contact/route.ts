import { NextResponse } from "next/server";

/**
 * Contact form handler. Set RESEND_API_KEY and CONTACT_TO (optionally CONTACT_FROM) in Vercel
 * to deliver submissions by email. Without them, submissions are logged to the server console.
 */
export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  if (!body || body.website) return NextResponse.json({ ok: true }); // honeypot
  const { name, email, phone, comment } = body;
  if (!email) return NextResponse.json({ error: "Email is required" }, { status: 400 });

  const text = [`Name: ${name ?? ""}`, `Email: ${email}`, `Phone: ${phone ?? ""}`, "", comment ?? ""].join("\n");

  const key = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO;
  if (!key || !to) {
    console.log("[contact] submission (email not configured):\n" + text);
    return NextResponse.json({ ok: true });
  }
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM ?? "Advio Website <onboarding@resend.dev>",
      to: [to],
      reply_to: email,
      subject: `Website inquiry — ${name || email}`,
      text,
    }),
  });
  if (!res.ok) return NextResponse.json({ error: "Send failed" }, { status: 502 });
  return NextResponse.json({ ok: true });
}
