import type { Metadata } from "next";
import ContactForm from "@/components/contact/ContactForm";
import { Container } from "@/components/ui/Section";
import { contact } from "@/lib/content";

export const metadata: Metadata = { title: "Contact" };

export default function Contact() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-ink pb-32 pt-40">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_10%_10%,rgba(92,225,230,0.16),transparent_50%),radial-gradient(ellipse_at_90%_80%,rgba(59,79,245,0.3),transparent_55%)]" />
      <Container className="relative grid gap-16 lg:grid-cols-[1fr_1.1fr]">
        <div>
          <p className="eyebrow mb-6 text-cyan">Let&apos;s talk</p>
          <h1 className="display text-6xl text-white md:text-8xl">{contact.title}</h1>
          <p className="mt-8 max-w-md text-lg leading-relaxed text-muted">{contact.body}</p>
        </div>
        <ContactForm />
      </Container>
    </section>
  );
}
