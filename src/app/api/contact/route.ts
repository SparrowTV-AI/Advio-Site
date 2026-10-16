import { NextResponse } from "next/server";
import { site } from "@/lib/site";

/**
 * Deliver contact submissions to the site's published inbox.
 * Configure RESEND_API_KEY and optionally CONTACT_FROM in Vercel.
 */
export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  if (!body || body.website) return NextResponse.json({ ok: true }); // honeypot
  const { name, email, phone, company, title, role, message, comment } = body;
  if (!email) return NextResponse.json({ error: "Email is required" }, { status: 400 });

  const text = [
    `Name: ${name ?? ""}`,
    `Email: ${email}`,
    `Company: ${company ?? ""}`,
    `Title: ${title ?? ""}`,
    `Role: ${role ?? ""}`,
    `Phone: ${phone ?? ""}`,
    "",
    message ?? comment ?? "",
  ].join("\n");

  const key = process.env.RESEND_API_KEY;
  if (!key) {
    return NextResponse.json({ error: "Email delivery is not configured" }, { status: 503 });
  }
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM ?? "Advio Website <onboarding@resend.dev>",
      to: [site.email],
      reply_to: email,
      subject: `Website inquiry — ${name || email}`,
      text,
    }),
  });
  if (!res.ok) return NextResponse.json({ error: "Send failed" }, { status: 502 });
  return NextResponse.json({ ok: true });
}
