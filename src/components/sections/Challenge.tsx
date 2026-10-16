"use client";
import Image from "next/image";
import { useEffect, useId, useRef, useState } from "react";
import { useScroll, useMotionValueEvent, useReducedMotion } from "motion/react";

const AUTO_REVEAL_PERCENT = 80;

/** Scroll introduces the comparison; visitors control the rest of the reveal. */
export default function Challenge({ eyebrow, title, body, images }: { eyebrow: string; title: string; body: string; images: string[] }) {
  const ref = useRef<HTMLElement>(null);
  const frame = useRef<HTMLDivElement>(null);
  const manual = useRef(false);
  const pointer = useRef<{ id: number; x: number; y: number; moved: boolean } | null>(null);
  const [pos, setPos] = useState(0);
  const reducedMotion = useReducedMotion();
  const id = useId();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80px", "end end"] });

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    if (!manual.current && !reducedMotion) {
      // Begin once the scene is pinned; pause at 80% AdGlean before it scrolls away.
      setPos(Math.min(1, Math.max(0, progress) / 0.8) * AUTO_REVEAL_PERCENT);
    }
  });

  useEffect(() => {
    if (reducedMotion && !manual.current) setPos(AUTO_REVEAL_PERCENT);
  }, [reducedMotion]);

  const choose = (value: number) => {
    manual.current = true;
    setPos(Math.max(0, Math.min(100, value)));
  };

  const move = (clientX: number) => {
    const bounds = frame.current?.getBoundingClientRect();
    if (bounds?.width) choose(((clientX - bounds.left) / bounds.width) * 100);
  };

  useEffect(() => {
    const element = frame.current;
    if (!element) return;
    const onWheel = (event: WheelEvent) => {
      // Horizontal trackpad gestures reveal the image; vertical scrolling stays free.
      if (Math.abs(event.deltaX) <= Math.abs(event.deltaY)) return;
      event.preventDefault();
      event.stopPropagation();
      manual.current = true;
      const unit = event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? element.clientWidth : 1;
      setPos((value) => Math.max(0, Math.min(100, value + (event.deltaX * unit / element.clientWidth) * 100)));
    };
    element.addEventListener("wheel", onWheel, { passive: false });
    return () => element.removeEventListener("wheel", onWheel);
  }, []);

  return (
    <section ref={ref} className="comparison-section bg-ink" aria-labelledby={`${id}-title`}>
      <div className="comparison-scene">
        <div className="comparison-heading">
          <p className="eyebrow text-cyan">{eyebrow}</p>
          <h2 id={`${id}-title`} className="display mt-3 text-white">{title}</h2>
          <p id={`${id}-description`} className="mt-3 text-muted">{body}</p>
        </div>
        <div className="comparison-figure">
          <div className="comparison-stage">
            <div
              ref={frame}
              className="comparison-frame relative cursor-ew-resize touch-pan-y select-none overflow-hidden rounded-2xl border border-white/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lime"
              role="slider"
              tabIndex={0}
              aria-label="Compare traditional television with AdGlean"
              aria-describedby={`${id}-description ${id}-hint`}
              aria-orientation="horizontal"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={Math.round(pos)}
              aria-valuetext={`${Math.round(pos)}% With AdGlean, ${Math.round(100 - pos)}% Traditional television`}
              onKeyDown={(event) => {
                const value = event.key === "ArrowLeft" || event.key === "ArrowDown" ? pos - 5
                  : event.key === "ArrowRight" || event.key === "ArrowUp" ? pos + 5
                  : event.key === "Home" ? 0 : event.key === "End" ? 100 : null;
                if (value !== null) { event.preventDefault(); choose(value); }
              }}
              onPointerDown={(event) => {
                if (!event.isPrimary || event.button !== 0) return;
                event.currentTarget.setPointerCapture(event.pointerId);
                pointer.current = { id: event.pointerId, x: event.clientX, y: event.clientY, moved: false };
                if (event.pointerType === "mouse") move(event.clientX);
              }}
              onPointerMove={(event) => {
                const active = pointer.current;
                if (!active || active.id !== event.pointerId) return;
                const dx = Math.abs(event.clientX - active.x);
                const dy = Math.abs(event.clientY - active.y);
                if (dx > 6 && dx > dy) active.moved = true;
                if (active.moved) move(event.clientX);
              }}
              onPointerUp={(event) => {
                const active = pointer.current;
                if (active?.id === event.pointerId) {
                  if (Math.abs(event.clientX - active.x) < 6 && Math.abs(event.clientY - active.y) < 6) move(event.clientX);
                  pointer.current = null;
                }
              }}
              onPointerCancel={() => { pointer.current = null; }}
              onLostPointerCapture={() => { pointer.current = null; }}
            >
              <Image src={images[0]} alt="Traditional television: Ad A is delivered to every household." fill sizes="(min-width: 1024px) 650px, 100vw" draggable={false} className="pointer-events-none object-contain" />
              <div className="pointer-events-none absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
                <Image src={images[1]} alt="With AdGlean: two households receive Ad A, two receive Ad B, and two receive Ad C." fill sizes="(min-width: 1024px) 650px, 100vw" draggable={false} className="object-contain" />
              </div>
              <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 w-0.5 bg-[#b9caff] shadow-[0_0_20px_rgba(127,162,255,0.8)]" style={{ left: `${pos}%` }} />
              <div aria-hidden="true" className="pointer-events-none absolute top-1/2 grid h-11 w-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-[#b9caff] text-xl font-bold text-[#050a1f] shadow-lg" style={{ left: `clamp(1.5rem, ${pos}%, calc(100% - 1.5rem))` }}>⇆</div>
            </div>
          </div>
          <div className="comparison-controls">
            <div className="flex items-center justify-between gap-3 text-xs font-semibold sm:text-sm">
              <button type="button" onClick={() => choose(0)} className="min-h-11 rounded-full border border-white/20 px-4 text-white transition hover:border-lime hover:text-lime focus-visible:outline-2 focus-visible:outline-lime">Traditional TV</button>
              <button type="button" onClick={() => choose(100)} className="min-h-11 rounded-full border border-lime/50 px-4 text-lime transition hover:bg-lime hover:text-ink focus-visible:outline-2 focus-visible:outline-lime">With AdGlean</button>
            </div>
            <p id={`${id}-hint`} className="mt-2 text-center text-xs text-muted">Drag or swipe to compare. Keep scrolling to continue.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
