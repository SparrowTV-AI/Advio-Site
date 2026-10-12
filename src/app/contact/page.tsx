import type { Metadata } from "next";
import { Suspense } from "react";
import ContactForm from "@/components/contact/ContactForm";
import { Container } from "@/components/ui/Section";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Contact" };

export default function Contact() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-ink pb-32 pt-36">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_10%_10%,rgba(92,225,230,0.18),transparent_50%)]" />
      <Container className="relative grid gap-16 lg:grid-cols-[1fr_1.1fr]">
        <div>
          <p className="eyebrow mb-6 text-cyan">Request a working session</p>
          <h1 className="display text-6xl text-white md:text-8xl">
            Let&apos;s map the <span className="text-gradient">opportunity.</span>
          </h1>
          <p className="mt-8 max-w-md text-lg text-muted">
            A working session is a focused conversation about your inventory, footprint and goals — and whether a pilot makes sense.
          </p>
          <ul className="mt-12 space-y-5 text-white/80">
            {["Review roles, permissions and responsibilities", "Scope the technical path and data policies", "Outline pilot measurement and economics"].map((t) => (
              <li key={t} className="flex gap-4">
                <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-lime" />
                {t}
              </li>
            ))}
          </ul>
          <p className="mt-12 text-sm text-white/50">
            Prefer email? <a className="text-lime hover:underline" href={`mailto:${site.email}`}>{site.email}</a>
          </p>
        </div>
        <Suspense>
          <ContactForm />
        </Suspense>
      </Container>
    </section>
  );
}
