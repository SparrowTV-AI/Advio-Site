"use client";
import Image from "next/image";
import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "motion/react";
import { Container, SectionHeading } from "@/components/ui/Section";

/** Before/after comparison: scroll (or drag) to wipe from Traditional TV to AdGlean. */
export default function Challenge({ eyebrow, title, body, images }: { eyebrow: string; title: string; body: string; images: string[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState(100);
  const [dragging, setDragging] = useState(false);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 40%"] });
  const scale = useTransform(scrollYProgress, [0, 0.4], [0.92, 1]);
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (!dragging) setPos(Math.max(0, Math.min(100, 100 - v * 130)));
  });

  const move = (clientX: number) => {
    const r = ref.current?.getBoundingClientRect();
    if (r) setPos(Math.max(0, Math.min(100, ((clientX - r.left) / r.width) * 100)));
  };

  return (
    <section className="bg-ink py-24 md:py-36">
      <Container>
        <SectionHeading eyebrow={eyebrow} title={title} body={body} />
        <motion.div
          ref={ref}
          style={{ scale }}
          className="relative mx-auto mt-16 aspect-[5/4] max-w-4xl cursor-ew-resize select-none overflow-hidden rounded-[2rem] border border-white/10 md:aspect-[5/4]"
          onPointerDown={(e) => { setDragging(true); move(e.clientX); }}
          onPointerMove={(e) => dragging && move(e.clientX)}
          onPointerUp={() => setDragging(false)}
          onPointerLeave={() => setDragging(false)}
        >
          <Image src={images[1]} alt="With AdGlean" fill sizes="(min-width: 1024px) 900px, 100vw" className="object-cover" />
          <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
            <Image src={images[0]} alt="Traditional television" fill sizes="(min-width: 1024px) 900px, 100vw" className="object-cover" />
          </div>
          <div className="absolute inset-y-0 w-0.5 bg-lime shadow-[0_0_20px_rgba(127,162,255,0.8)]" style={{ left: `${pos}%` }}>
            <div className="absolute top-1/2 grid h-11 w-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-lime text-sm font-bold text-ink">⇆</div>
          </div>
        </motion.div>
        <p className="mt-6 text-center text-sm text-white/40">Scroll or drag to compare traditional delivery with AdGlean.</p>
      </Container>
    </section>
  );
}
