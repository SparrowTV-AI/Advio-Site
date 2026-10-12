"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import Button from "./Button";

export default function PageHero({
  eyebrow,
  title,
  accent,
  body,
  cta,
}: {
  eyebrow: string;
  title: string;
  accent?: string;
  body: string;
  cta?: { label: string; href: string };
}) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const o = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  return (
    <section ref={ref} className="grain relative flex min-h-[86svh] items-end overflow-hidden bg-ink pb-20 pt-36">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_20%,rgba(59,79,245,0.4),transparent_55%),radial-gradient(ellipse_at_10%_90%,rgba(212,255,79,0.08),transparent_45%)]" />
      <div className="grid-bg absolute inset-0 opacity-30 [mask-image:radial-gradient(ellipse_at_70%_30%,black,transparent_70%)]" />
      <motion.div style={{ y, opacity: o }} className="relative mx-auto w-full max-w-7xl px-5 md:px-10">
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="eyebrow mb-8 text-cyan">
          {eyebrow}
        </motion.p>
        <h1 className="display max-w-5xl text-6xl text-white md:text-[7.5rem]">
          <motion.span
            className="block"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            {title}
          </motion.span>
          {accent && (
            <motion.span
              className="text-gradient block"
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            >
              {accent}
            </motion.span>
          )}
        </h1>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.35 }}
          className="mt-10 flex flex-col gap-8 md:flex-row md:items-end md:justify-between"
        >
          <p className="max-w-xl text-lg leading-relaxed text-muted md:text-xl">{body}</p>
          {cta && <Button href={cta.href}>{cta.label}</Button>}
        </motion.div>
      </motion.div>
    </section>
  );
}
