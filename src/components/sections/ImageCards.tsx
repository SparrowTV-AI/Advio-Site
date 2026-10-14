"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { Container, SectionHeading } from "@/components/ui/Section";

type Card = { label?: string; title: string; body: string; image?: string; cta?: { label: string; href: string } };

export default function ImageCards({
  eyebrow,
  title,
  body,
  cards,
  numbered,
  tone = "dark",
  id,
}: {
  eyebrow: string;
  title: string;
  body?: string;
  cards: Card[];
  numbered?: string;
  tone?: "dark" | "light";
  id?: string;
}) {
  const light = tone === "light";
  const cols = cards.length === 2 ? "md:grid-cols-2" : "md:grid-cols-3";
  return (
    <section id={id} className={`${light ? "bg-paper text-ink" : "bg-ink"} scroll-mt-20 py-24 md:py-32`}>
      <Container>
        <SectionHeading tone={tone} eyebrow={eyebrow} title={title} body={body} />
        <div className={`mt-16 grid gap-6 ${cols}`}>
          {cards.map((c, i) => {
            const inner = (
              <>
                <div className={`relative overflow-hidden rounded-3xl ${cards.length === 2 ? "aspect-[16/10]" : "aspect-[4/3]"}`}>
                  {c.image ? (
                    <Image src={c.image} alt="" fill sizes="(min-width: 768px) 40vw, 100vw" className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105" />
                  ) : (
                    <div className="h-full w-full bg-gradient-to-br from-navy-3 to-navy" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
                  {(c.label || numbered) && (
                    <span className="eyebrow absolute left-5 top-5 rounded-full bg-ink/60 px-3 py-1.5 text-[10px] text-white backdrop-blur">
                      {numbered ? `${numbered} ${i + 1}` : c.label}
                    </span>
                  )}
                </div>
                <h3 className={`mt-6 text-2xl font-semibold tracking-tight md:text-3xl ${light ? "text-ink" : "text-white"}`}>{c.title}</h3>
                <p className={`mt-3 text-lg leading-relaxed ${light ? "text-ink/70" : "text-muted"}`}>{c.body}</p>
                {c.cta && (
                  <span className={`mt-5 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.14em] ${light ? "text-electric" : "text-lime"}`}>
                    {c.cta.label} <span className="transition-transform group-hover:translate-x-1">→</span>
                  </span>
                )}
              </>
            );
            return (
              <motion.div
                key={c.title}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.9, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                className="group"
              >
                {c.cta ? <Link href={c.cta.href}>{inner}</Link> : inner}
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
