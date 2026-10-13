"use client";
import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";

export default function ImageSplit({
  eyebrow,
  title,
  subtitle,
  paragraphs,
  image,
  cta,
  reverse,
  tone = "dark",
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  paragraphs: string[];
  image?: string;
  cta?: { label: string; href: string };
  reverse?: boolean;
  tone?: "dark" | "light";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const clip = useTransform(scrollYProgress, [0, 0.35], ["inset(18% 18% 18% 18% round 32px)", "inset(0% 0% 0% 0% round 32px)"]);
  const light = tone === "light";

  return (
    <section className={`${light ? "bg-paper text-ink" : "bg-ink"} py-24 md:py-36`}>
      <div ref={ref} className={`mx-auto grid max-w-7xl items-center gap-14 px-5 md:grid-cols-2 md:px-10 ${reverse ? "md:[&>*:first-child]:order-2" : ""}`}>
        <div>
          <Reveal><p className={`eyebrow mb-5 ${light ? "text-electric" : "text-cyan"}`}>{eyebrow}</p></Reveal>
          <Reveal delay={0.05}><h2 className={`display text-4xl md:text-6xl ${light ? "text-ink" : "text-white"}`}>{title}</h2></Reveal>
          {subtitle && <Reveal delay={0.08}><p className={`mt-6 text-2xl font-semibold ${light ? "text-electric" : "text-lime"}`}>{subtitle}</p></Reveal>}
          {paragraphs.map((p, i) => (
            <Reveal key={i} delay={0.1 + i * 0.05}>
              <p className={`mt-6 text-lg leading-relaxed ${light ? "text-slate-600" : "text-muted"}`}>{p}</p>
            </Reveal>
          ))}
          {cta && <Reveal delay={0.2} className="mt-10"><Button href={cta.href}>{cta.label}</Button></Reveal>}
        </div>
        <motion.div style={{ clipPath: clip }} className="relative aspect-[4/3] overflow-hidden rounded-[2rem]">
          {image && (
            <motion.div style={{ y }} className="absolute -inset-[10%]">
              <Image src={image} alt="" fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
