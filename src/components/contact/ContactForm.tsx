"use client";
import { useState } from "react";
import { motion } from "motion/react";

export default function ContactForm() {
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("sending");
    const data = Object.fromEntries(new FormData(e.currentTarget));
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).catch(() => null);
    setState(res?.ok ? "sent" : "error");
  }

  if (state === "sent")
    return (
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="rounded-3xl bg-lime p-12 text-ink">
        <p className="display text-5xl">Thank you.</p>
        <p className="mt-4 text-lg">We&apos;ll be in touch shortly.</p>
      </motion.div>
    );

  const input =
    "w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3.5 text-white placeholder:text-white/30 outline-none transition focus:border-lime";
  return (
    <form onSubmit={submit} className="space-y-4 rounded-3xl border border-white/10 bg-navy p-7 md:p-10">
      <div className="grid gap-4 md:grid-cols-2">
        <input name="name" placeholder="Name" className={input} />
        <input required type="email" name="email" placeholder="Email*" className={input} />
      </div>
      <input name="phone" type="tel" placeholder="Phone" className={input} />
      <textarea name="comment" rows={6} placeholder="Comment" className={input} />
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
      <button
        disabled={state === "sending"}
        className="w-full rounded-full bg-lime px-6 py-4 font-semibold uppercase tracking-[0.14em] text-ink transition hover:bg-white disabled:opacity-60"
      >
        {state === "sending" ? "Sending…" : "Let's talk →"}
      </button>
      {state === "error" && <p className="text-sm text-red-300">Something went wrong. Please try again.</p>}
    </form>
  );
}
