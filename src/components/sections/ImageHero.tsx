"use client";
import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import Button from "@/components/ui/Button";

export default function ImageHero({
  eyebrow,
  title,
  body,
  ctas,
  image,
  tall = true,
}: {
  eyebrow: string;
  title: string;
  body: string;
  ctas: { label: string; href: string }[];
  image?: string;
  tall?: boolean;
}) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const words = title.split(" ");

  return (
    <section ref={ref} className={`grain relative flex items-end overflow-hidden bg-ink pb-20 pt-36 ${tall ? "min-h-[100svh]" : "min-h-[85svh]"}`}>
      {image ? (
        <motion.div style={{ y }} className="absolute inset-0">
          <motion.div
            className="absolute inset-0"
            initial={{ scale: 1.15 }}
            animate={{ scale: 1.03 }}
            transition={{ duration: 8, ease: "easeOut" }}
          >
            <Image src={image} alt="" fill priority sizes="100vw" className="object-cover" />
          </motion.div>
        </motion.div>
      ) : (
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_20%,rgba(59,79,245,0.45),transparent_55%)]" />
      )}
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,11,22,0.95)_0%,rgba(5,11,22,0.75)_45%,rgba(5,11,22,0.2)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink to-transparent" />

      <motion.div style={{ opacity: fade }} className="relative mx-auto w-full max-w-7xl px-5 md:px-10">
        <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="eyebrow mb-7 text-cyan">
          {eyebrow}
        </motion.p>
        <h1 className="display max-w-5xl text-5xl text-white md:text-[5.5rem]">
          {words.map((w, i) => (
            <span key={i} className="mr-[0.22em] inline-block overflow-hidden pb-[0.08em] align-bottom">
              <motion.span
                className="inline-block"
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1, delay: 0.1 + i * 0.05, ease: [0.16, 1, 0.3, 1] }}
              >
                {w}
              </motion.span>
            </span>
          ))}
        </h1>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.7 }}>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-white/75">{body}</p>
          <div className="mt-10 flex flex-wrap gap-3">
            {ctas.map((c, i) => (
              <Button key={c.label} href={c.href} variant={i === 0 ? "lime" : "ghost"}>
                {c.label}
              </Button>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
