"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import Button from "@/components/ui/Button";
import Monolith from "@/components/three/Monolith";

const lines = [
  { t: "Unlock more", c: "text-white" },
  { t: "value from", c: "text-white" },
  { t: "television.", c: "text-gradient" },
];

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const fade = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const lift = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const objY = useTransform(scrollYProgress, [0, 1], [0, 120]);

  return (
    <section ref={ref} className="grain relative flex min-h-[100svh] items-center overflow-hidden pt-24">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_10%,#26324f_0%,transparent_55%),radial-gradient(ellipse_at_75%_60%,#1b2742_0%,transparent_60%)]" />
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink to-transparent" />

      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-6 px-5 md:grid-cols-[1.05fr_1fr] md:px-10">
        <motion.div style={{ opacity: fade, y: lift }} className="relative z-10 order-2 md:order-1">
          <h1 className="display text-[15vw] md:text-[6.6rem]">
            {lines.map((l, i) => (
              <span key={l.t} className="block overflow-hidden pb-[0.06em]">
                <motion.span
                  className={`block ${l.c}`}
                  initial={{ y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1.1, delay: 0.15 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                >
                  {l.t}
                </motion.span>
              </span>
            ))}
          </h1>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            <p className="mt-8 max-w-md text-lg text-muted md:text-xl">Connect inventory, delivery and measurement.</p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Button href="/broadcasters">For Broadcasters</Button>
              <Button href="/distributors" variant="ghost">For Distributors</Button>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          style={{ y: objY }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="order-1 md:order-2"
        >
          <Monolith className="mx-auto h-[46vh] w-full md:h-[78vh]" />
        </motion.div>
      </div>
    </section>
  );
}
