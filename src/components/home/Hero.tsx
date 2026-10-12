"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import Button from "@/components/ui/Button";

const words = ["Two", "sides.", "New", "possibilities."];

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.25]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const lift = useTransform(scrollYProgress, [0, 1], [0, -160]);

  return (
    <section ref={ref} className="grain relative flex min-h-[100svh] items-end overflow-hidden bg-ink pb-24 pt-32">
      {/* Cinematic backdrop */}
      <motion.div style={{ scale }} className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_30%,rgba(59,79,245,0.45),transparent_55%),radial-gradient(ellipse_at_20%_80%,rgba(92,225,230,0.18),transparent_50%)]" />
        <div
          className="grid-bg absolute inset-x-0 bottom-0 h-[70%] opacity-60"
          style={{ transform: "perspective(900px) rotateX(62deg)", transformOrigin: "bottom", maskImage: "linear-gradient(to top, black, transparent)" }}
        />
        {/* Broadcast signal rings */}
        <div className="absolute right-[-10%] top-[8%] h-[80vmin] w-[80vmin] md:right-[2%]">
          {[0, 1, 2, 3].map((i) => (
            <motion.span
              key={i}
              className="absolute inset-0 rounded-full border border-cyan/30"
              initial={{ scale: 0.2, opacity: 0 }}
              animate={{ scale: 1.1, opacity: [0, 0.8, 0] }}
              transition={{ duration: 5, repeat: Infinity, delay: i * 1.25, ease: "easeOut" }}
            />
          ))}
          <div className="absolute inset-[38%] rounded-full bg-[radial-gradient(circle,rgba(212,255,79,0.9),rgba(212,255,79,0.15)_45%,transparent_70%)] blur-sm" />
        </div>
      </motion.div>

      <motion.div style={{ opacity: fade, y: lift }} className="relative mx-auto w-full max-w-7xl px-5 md:px-10">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="eyebrow mb-8 text-cyan"
        >
          Television. Connected.
        </motion.p>
        <h1 className="display max-w-5xl text-[15vw] text-white md:text-[8.5rem]">
          {words.map((w, i) => (
            <span key={w} className="mr-[0.22em] inline-block overflow-hidden pb-[0.08em] align-bottom">
              <motion.span
                className={`inline-block ${i === 3 ? "text-gradient" : ""}`}
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1.1, delay: 0.15 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                {w}
              </motion.span>
            </span>
          ))}
        </h1>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="mt-10 flex flex-col gap-10 md:flex-row md:items-end md:justify-between"
        >
          <p className="max-w-xl text-lg leading-relaxed text-muted md:text-xl">
            Broadcasters bring premium inventory. Distributors bring audience reach. ADVIO connects the
            intelligence and delivery around eligible advertising opportunities — helping both sides explore
            additional value.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button href="/contact">Request a working session</Button>
            <Button href="#connection" variant="ghost">Watch the connection</Button>
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        style={{ opacity: fade }}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-white/40 md:flex"
      >
        Scroll
        <motion.span
          className="h-10 w-px bg-gradient-to-b from-lime to-transparent"
          animate={{ scaleY: [0, 1, 0], originY: 0 }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.div>
    </section>
  );
}
