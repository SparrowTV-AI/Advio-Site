"use client";
import { useEffect, useRef, useState } from "react";
import Button from "@/components/ui/Button";

const cards = [
  { n: "01", t: "Detect", b: "Identify the commercial as it airs inside the partner environment.", accent: "text-steel" },
  { n: "02", t: "Evaluate", b: "Check the household against the intended audience, inventory permissions and campaign rules.", accent: "text-steel" },
  { n: "03", t: "Protect", b: "Inside the intended audience? The original commitment runs exactly as agreed.", accent: "text-white" },
  { n: "04", t: "Activate", b: "Outside it and eligible? An approved replacement can be activated — measured and shared.", accent: "text-silver" },
  { n: "05", t: "Fallback", b: "When no qualified replacement can proceed, the original advertisement is retained.", accent: "text-white" },
];

/** Side-to-side carousel: swipe, trackpad, drag with the mouse, or use the arrows. Every card is fully reachable. */
export default function OperatingModel() {
  const track = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const drag = useRef<{ x: number; left: number; moved: boolean } | null>(null);

  const update = () => {
    const el = track.current;
    if (!el) return;
    setAtStart(el.scrollLeft < 8);
    setAtEnd(el.scrollLeft + el.clientWidth > el.scrollWidth - 8);
    const kids = [...el.querySelectorAll<HTMLElement>("[data-card]")].filter((k) => k.offsetParent !== null);
    const mid = el.scrollLeft + el.clientWidth / 3;
    let best = 0;
    kids.forEach((k, i) => {
      if (Math.abs(k.offsetLeft - mid) < Math.abs(kids[best].offsetLeft - mid)) best = i;
    });
    setActive(el.scrollLeft + el.clientWidth > el.scrollWidth - 8 ? kids.length - 1 : best);
  };

  useEffect(() => {
    update();
    const el = track.current;
    el?.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el?.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const go = (dir: number) => {
    const el = track.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-card]");
    el.scrollBy({ left: dir * ((card?.offsetWidth ?? 400) + 20), behavior: "smooth" });
  };
  const goTo = (i: number) => {
    const el = track.current;
    const k = el?.querySelectorAll<HTMLElement>("[data-card]")[i];
    if (el && k) el.scrollTo({ left: k.offsetLeft - el.offsetLeft - 20, behavior: "smooth" });
  };

  return (
    <section id="how" className="relative scroll-mt-20 overflow-hidden bg-mist py-24 text-ink md:py-32">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-5 md:flex-row md:items-end md:justify-between md:px-10">
        <div>
          <p className="eyebrow mb-5 text-electric">How AdGlean works</p>
          <h2 className="display max-w-3xl text-4xl md:text-6xl">Intelligence that finds opportunity in every impression.</h2>
        </div>
        <div className="flex items-center gap-3">
          <span className="mr-2 hidden text-sm text-slate-500 md:inline">Swipe or drag to explore 5 steps</span>
          <Arrow dir={-1} disabled={atStart} onClick={() => go(-1)} />
          <Arrow dir={1} disabled={atEnd} onClick={() => go(1)} />
        </div>
      </div>

      <div
        ref={track}
        className="no-scrollbar mt-12 flex cursor-grab snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth px-5 pb-4 active:cursor-grabbing md:px-[max(2.5rem,calc((100vw-80rem)/2+2.5rem))]"
        onPointerDown={(e) => {
          if (e.pointerType !== "mouse" || !track.current) return;
          drag.current = { x: e.clientX, left: track.current.scrollLeft, moved: false };
          track.current.style.scrollSnapType = "none";
          track.current.style.scrollBehavior = "auto";
        }}
        onPointerMove={(e) => {
          if (!drag.current || !track.current) return;
          const dx = e.clientX - drag.current.x;
          if (Math.abs(dx) > 3) drag.current.moved = true;
          track.current.scrollLeft = drag.current.left - dx;
        }}
        onPointerUp={() => {
          if (!track.current) return;
          drag.current = null;
          track.current.style.scrollSnapType = "";
          track.current.style.scrollBehavior = "";
        }}
        onPointerLeave={() => {
          if (!drag.current || !track.current) return;
          drag.current = null;
          track.current.style.scrollSnapType = "";
          track.current.style.scrollBehavior = "";
        }}
      >
        {cards.map((c) => (
          <div
            key={c.n}
            data-card
            className="flex h-[400px] w-[82vw] shrink-0 select-none snap-start flex-col justify-between rounded-[2rem] bg-ink p-8 text-white sm:w-[420px] md:h-[440px] md:p-10"
          >
            <span className="display text-sm text-white/40">{c.n}</span>
            <div>
              <h3 className={`display text-5xl md:text-6xl ${c.accent}`}>{c.t}</h3>
              <p className="mt-6 max-w-sm text-lg leading-relaxed text-muted">{c.b}</p>
            </div>
          </div>
        ))}
        <div data-card className="hidden w-[320px] shrink-0 snap-start items-center sm:flex">
          <Button href="/adglean" variant="dark">See how AdGlean works</Button>
        </div>
        {/* end spacer so the last card is never cut off */}
        <div aria-hidden className="w-1 shrink-0 md:w-[max(1.5rem,calc((100vw-80rem)/2))]" />
      </div>

      <div className="mx-auto mt-8 flex max-w-7xl items-center gap-2 px-5 md:px-10">
        {cards.map((c, i) => (
          <button
            key={c.n}
            aria-label={`Go to step ${i + 1}: ${c.t}`}
            onClick={() => goTo(i)}
            className={`h-1.5 rounded-full transition-all duration-500 ${i === Math.min(active, cards.length - 1) ? "w-10 bg-electric" : "w-4 bg-ink/15"}`}
          />
        ))}
        <span className="ml-3 text-sm text-slate-500 md:hidden">Swipe to explore 5 steps</span>
      </div>
      <div className="mt-8 px-5 sm:hidden">
        <Button href="/adglean" variant="dark">See how AdGlean works</Button>
      </div>
    </section>
  );
}

function Arrow({ dir, disabled, onClick }: { dir: number; disabled: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={dir < 0 ? "Previous step" : "Next step"}
      className="grid h-12 w-12 place-items-center rounded-full bg-ink text-white transition hover:bg-electric disabled:opacity-25"
    >
      <span aria-hidden>{dir < 0 ? "←" : "→"}</span>
    </button>
  );
}
