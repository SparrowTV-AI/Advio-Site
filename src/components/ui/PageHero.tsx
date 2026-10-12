"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import Button from "./Button";
import Monolith from "@/components/three/Monolith";
import type { MonolithPose } from "@/components/three/MonolithScene";

export default function PageHero({
  eyebrow,
  title,
  accent,
  body,
  cta,
  pose,
}: {
  eyebrow: string;
  title: string;
  accent?: string;
  body: string;
  cta?: { label: string; href: string };
  pose?: MonolithPose;
}) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const o = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  return (
    <section ref={ref} className="grain relative flex min-h-[86svh] items-end overflow-hidden bg-ink pb-20 pt-36">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_10%,#26324f_0%,transparent_55%),radial-gradient(ellipse_at_80%_50%,#1b2742_0%,transparent_60%)]" />
      {pose && (
        <div className="pointer-events-none absolute inset-y-0 right-[-25%] w-[85%] opacity-40 md:right-[-10%] md:w-[48%] md:opacity-100">
          <Monolith pose={pose} className="h-full w-full" />
        </div>
      )}
      <div className="grid-bg absolute inset-0 opacity-30 [mask-image:radial-gradient(ellipse_at_70%_30%,black,transparent_70%)]" />
      <motion.div style={{ y, opacity: o }} className="relative mx-auto w-full max-w-7xl px-5 md:px-10">
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="eyebrow mb-8 text-steel">
          {eyebrow}
        </motion.p>
        <h1 className="display relative z-10 max-w-3xl text-6xl text-white md:text-[6rem]">
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
