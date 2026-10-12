"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import Logo from "@/components/ui/Logo";
import { nav, cta } from "@/lib/site";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const path = usePathname();

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  useEffect(() => setOpen(false), [path]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled || open ? "border-b border-white/10 bg-ink/75 backdrop-blur-xl" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 md:px-10">
        <Logo />
        <nav className="hidden items-center gap-8 lg:flex">
          {nav.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className={`text-sm transition-colors hover:text-lime ${path === n.href ? "text-lime" : "text-white/80"}`}
            >
              {n.label}
            </Link>
          ))}
          <Link
            href={cta.href}
            className="rounded-full bg-lime px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-white"
          >
            {cta.label}
          </Link>
        </nav>
        <button
          className="relative h-10 w-10 lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          <span className={`absolute left-2 right-2 h-0.5 bg-white transition-all ${open ? "top-5 rotate-45" : "top-3.5"}`} />
          <span className={`absolute left-2 right-2 h-0.5 bg-white transition-all ${open ? "top-5 -rotate-45" : "top-6"}`} />
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden lg:hidden"
          >
            <div className="flex flex-col gap-1 px-5 pb-8">
              {[...nav, { label: "Model your opportunity", href: "/model" }].map((n) => (
                <Link key={n.href} href={n.href} className="display py-3 text-3xl text-white">
                  {n.label}
                </Link>
              ))}
              <Link href={cta.href} className="mt-4 rounded-full bg-lime px-5 py-4 text-center font-semibold text-ink">
                {cta.label}
              </Link>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
