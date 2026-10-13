"use client";
import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import Reveal from "@/components/ui/Reveal";

type Person = { name: string; role: string; bio: string[]; photo?: string };

export default function LeadershipGroups({ groups }: { groups: { name: string; people: Person[] }[] }) {
  const [open, setOpen] = useState<string | null>(null);
  return (
    <div className="space-y-24">
      {groups.map((g) => (
        <div key={g.name}>
          <Reveal>
            <div className="flex items-end justify-between border-b border-white/10 pb-5">
              <h2 className="display text-3xl text-white md:text-5xl">{g.name}</h2>
              <span className="text-sm text-white/40">{String(g.people.length).padStart(2, "0")}</span>
            </div>
          </Reveal>
          <div className={`mt-10 grid gap-6 ${g.people.length === 2 ? "md:grid-cols-2" : "md:grid-cols-3"}`}>
            {g.people.map((p, i) => {
              const isOpen = open === p.name;
              const initials = p.name.split(" ").map((n) => n[0]).join("");
              return (
                <Reveal key={p.name} delay={i * 0.08}>
                  <button
                    onClick={() => setOpen(isOpen ? null : p.name)}
                    className={`group w-full rounded-3xl border p-6 text-left transition-colors md:p-8 ${isOpen ? "border-lime/50 bg-navy-2" : "border-white/10 bg-navy hover:border-white/25"}`}
                    aria-expanded={isOpen}
                  >
                    <div className="flex items-center gap-5">
                      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl bg-gradient-to-br from-navy-3 to-electric/50">
                        {p.photo ? (
                          <Image src={p.photo} alt={p.name} fill sizes="80px" className="object-cover grayscale transition duration-500 group-hover:grayscale-0" />
                        ) : (
                          <span className="display absolute inset-0 grid place-items-center text-2xl text-white/80">{initials}</span>
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="text-xl font-semibold text-white">{p.name}</p>
                        <p className="eyebrow mt-1.5 text-[10px] text-cyan">{p.role}</p>
                      </div>
                      <span className={`grid h-9 w-9 place-items-center rounded-full border border-white/20 text-white transition-transform ${isOpen ? "rotate-45" : ""}`}>+</span>
                    </div>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                          className="overflow-hidden"
                        >
                          {p.bio.map((b, j) => (
                            <p key={j} className="mt-5 leading-relaxed text-muted">{b}</p>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                    {!isOpen && <p className="mt-5 line-clamp-2 leading-relaxed text-muted">{p.bio[0]}</p>}
                  </button>
                </Reveal>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
