"use client";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { motion } from "motion/react";

const roles = [
  { v: "broadcaster", l: "Broadcaster" },
  { v: "distributor", l: "Distributor" },
  { v: "advertiser", l: "Advertiser / agency" },
  { v: "other", l: "Other" },
];

export default function ContactForm() {
  const params = useSearchParams();
  const [role, setRole] = useState(params.get("role") ?? "broadcaster");
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const fromModel = params.get("source") === "model";

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("sending");
    const data = Object.fromEntries(new FormData(e.currentTarget));
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...data, role, model: fromModel ? Object.fromEntries(params) : undefined }),
    }).catch(() => null);
    setState(res?.ok ? "sent" : "error");
  }

  if (state === "sent")
    return (
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="rounded-3xl bg-white p-12 text-ink">
        <p className="display text-5xl">Thank you.</p>
        <p className="mt-4 text-lg">We&apos;ll be in touch shortly to set up a working session.</p>
      </motion.div>
    );

  const input = "w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3.5 text-white placeholder:text-white/30 outline-none transition focus:border-gem";
  return (
    <form onSubmit={submit} className="space-y-6 rounded-3xl border border-white/10 bg-navy p-7 md:p-10">
      <fieldset>
        <legend className="mb-3 text-sm font-semibold text-white">I represent a…</legend>
        <div className="flex flex-wrap gap-2">
          {roles.map((r) => (
            <button
              type="button"
              key={r.v}
              onClick={() => setRole(r.v)}
              className={`rounded-full px-4 py-2 text-sm transition ${role === r.v ? "bg-white text-ink" : "border border-white/15 text-white/80 hover:border-white/40"}`}
            >
              {r.l}
            </button>
          ))}
        </div>
      </fieldset>
      <div className="grid gap-4 md:grid-cols-2">
        <input required name="name" placeholder="Full name" className={input} />
        <input required type="email" name="email" placeholder="Work email" className={input} />
        <input required name="company" placeholder="Company" className={input} />
        <input name="title" placeholder="Title" className={input} />
      </div>
      <textarea
        name="message"
        rows={5}
        placeholder={fromModel ? "Tell us about the numbers you modeled…" : "What would you like to explore?"}
        className={input}
      />
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
      {fromModel && (
        <p className="text-xs text-steel">Your modeled inputs will be attached to this request.</p>
      )}
      <button
        disabled={state === "sending"}
        className="w-full rounded-full bg-white px-6 py-4 font-semibold text-ink transition hover:bg-silver disabled:opacity-60"
      >
        {state === "sending" ? "Sending…" : "Request a working session →"}
      </button>
      {state === "error" && <p className="text-sm text-red-300">Something went wrong. Please try again or email us directly.</p>}
    </form>
  );
}
