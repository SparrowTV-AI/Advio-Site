"use client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import type { MonolithPose } from "./MonolithScene";

const Scene = dynamic(() => import("./MonolithScene"), { ssr: false, loading: () => null });

/**
 * The 3D mark loads only after the page has finished loading (and the browser is idle),
 * so it never delays first paint. A static poster of the mark shows until then.
 */
export default function Monolith({ pose, className = "" }: { pose?: MonolithPose; className?: string }) {
  const [live, setLive] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const start = () => {
      const w = window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number };
      if (w.requestIdleCallback) w.requestIdleCallback(() => setLive(true), { timeout: 1500 });
      else setTimeout(() => setLive(true), 300);
    };
    if (document.readyState === "complete") start();
    else window.addEventListener("load", start, { once: true });
    return () => window.removeEventListener("load", start);
  }, []);

  return (
    <div className={`relative ${className}`} aria-hidden>
      <div className="absolute left-1/2 top-[55%] h-[55%] w-[55%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gem/30 blur-[90px]" />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/brand/monolith-poster.png"
        alt=""
        className={`absolute inset-0 m-auto h-full w-full object-contain transition-opacity duration-700 ${live ? "opacity-0" : "opacity-100"}`}
      />
      {live && (
        <div className="absolute inset-0 animate-[fadein_0.8s_ease-out]">
          <Scene pose={pose} />
        </div>
      )}
    </div>
  );
}
