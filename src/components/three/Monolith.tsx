"use client";
import dynamic from "next/dynamic";
import type { MonolithPose } from "./MonolithScene";

const Scene = dynamic(() => import("./MonolithScene"), {
  ssr: false,
  loading: () => null,
});

export default function Monolith({ pose, className = "" }: { pose?: MonolithPose; className?: string }) {
  return (
    <div className={`relative ${className}`} aria-hidden>
      <div className="absolute left-1/2 top-[55%] h-[55%] w-[55%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gem/25 blur-[90px]" />
      <div className="absolute inset-0">
        <Scene pose={pose} />
      </div>
    </div>
  );
}
