"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import Button from "@/components/ui/Button";

const cards = [
  { n: "01", t: "Detect", b: "Identify the commercial as it airs inside the partner environment.", accent: "text-cyan" },
  { n: "02", t: "Evaluate", b: "Check the household against the intended audience, inventory permissions and campaign rules.", accent: "text-cyan" },
  { n: "03", t: "Protect", b: "Inside the intended audience? The original commitment runs exactly as agreed.", accent: "text-white" },
  { n: "04", t: "Activate", b: "Outside it and eligible? An approved replacement can be activated — measured and shared.", accent: "text-lime" },
  { n: "05", t: "Fallback", b: "When no qualified replacement can proceed, the original advertisement is retained.", accent: "text-white" },
];

export default function OperatingModel() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0.05, 0.95], ["0%", "-62%"]);

  return (
    <section ref={ref} className="relative h-[320vh] bg-mist text-ink">
      <div className="sticky top-0 flex h-[100svh] flex-col justify-center overflow-hidden">
        <div className="mx-auto w-full max-w-7xl px-5 md:px-10">
          <p className="eyebrow mb-5 text-electric">Meet AdGlean</p>
          <h2 className="display max-w-4xl text-5xl md:text-7xl">The connection has an operating model.</h2>
        </div>
        <motion.div style={{ x }} className="mt-14 flex gap-5 pl-5 md:pl-[max(2.5rem,calc((100vw-80rem)/2+2.5rem))]">
          {cards.map((c) => (
            <div
              key={c.n}
              className="flex h-[46vh] min-h-[320px] w-[78vw] shrink-0 flex-col justify-between rounded-[2rem] bg-ink p-8 text-white md:w-[34vw] md:p-12"
            >
              <span className="display text-sm text-white/40">{c.n}</span>
              <div>
                <h3 className={`display text-5xl md:text-7xl ${c.accent}`}>{c.t}</h3>
                <p className="mt-6 max-w-sm text-lg leading-relaxed text-muted">{c.b}</p>
              </div>
            </div>
          ))}
          <div className="flex w-[70vw] shrink-0 items-center md:w-[30vw]">
            <Button href="/adglean" variant="dark">See how AdGlean works</Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
