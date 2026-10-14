"use client";
import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import Reveal from "@/components/ui/Reveal";

export default function MeetAdGlean({ eyebrow, body, image }: { eyebrow: string; body: string; image: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const clip = useTransform(scrollYProgress, [0, 0.35], ["inset(18% 18% 18% 18% round 32px)", "inset(0% 0% 0% 0% round 32px)"]);

  return (
    <section className="relative overflow-hidden py-24 md:py-36" style={{ background: "#071036" }}>
      {/* blue spotlight */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_55%_60%_at_70%_45%,rgba(59,91,255,0.55),transparent_65%),radial-gradient(ellipse_40%_40%_at_15%_20%,rgba(127,162,255,0.18),transparent_60%)]" />
      <div ref={ref} className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 md:grid-cols-2 md:px-10">
        <div>
          <Reveal><p className="eyebrow mb-5 text-steel">{eyebrow}</p></Reveal>
          <Reveal delay={0.05}>
            <h2 className="display text-5xl text-white md:text-7xl">
              Meet <span className="text-silver">AdGlean.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="display mt-4 text-3xl text-white md:text-4xl">
              Intelligence in <span className="text-silver">every impression.</span>
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted">{body}</p>
          </Reveal>
        </div>
        <motion.div style={{ clipPath: clip }} className="relative aspect-[4/3] overflow-hidden rounded-[2rem] shadow-[0_40px_120px_-30px_rgba(59,91,255,0.7)]">
          <motion.div style={{ y }} className="absolute -inset-[10%]">
            <Image src={image} alt="AdGlean audience analytics" fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
