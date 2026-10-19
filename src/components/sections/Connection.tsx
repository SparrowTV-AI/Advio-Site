"use client";
import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Container, SectionHeading } from "@/components/ui/Section";

type Item = { label: string; title: string; body: string; image?: string };

export default function Connection({ eyebrow, title, body, items }: { eyebrow: string; title: string; body: string; items: Item[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "center 50%"] });
  const line = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section className="relative overflow-hidden bg-navy py-24 md:py-36">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_60%,rgba(36,87,255,0.25),transparent_60%)]" />
      <Container className="relative">
        <SectionHeading eyebrow={eyebrow} title={title} body={body} />
        <div ref={ref} className="relative mt-20">
          {/* connecting line */}
          <div className="absolute left-[16%] right-[16%] top-[30%] hidden h-px bg-white/10 md:block">
            <motion.div style={{ width: line }} className="h-full bg-gradient-to-r from-cyan via-lime to-cyan shadow-[0_0_20px_rgba(135,163,255,0.7)]" />
          </div>
          <div className="relative grid gap-8 md:grid-cols-3">
            {items.map((it, i) => (
              <motion.div
                key={it.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.9, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                className={`rounded-3xl border p-3 ${i === 1 ? "border-lime/50 bg-navy-3/60 md:-translate-y-6" : "border-white/10 bg-navy-2/60"}`}
              >
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                  {it.image && <Image src={it.image} alt="" fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover" />}
                </div>
                <div className="p-5">
                  <p className={`eyebrow ${i === 1 ? "text-lime" : "text-cyan"}`}>{it.label}</p>
                  <h3 className="mt-3 text-2xl font-semibold text-white">{it.title}</h3>
                  <p className="mt-3 leading-relaxed text-muted">{it.body}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
