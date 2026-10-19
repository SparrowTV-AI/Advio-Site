import Link from "next/link";
import Logo from "@/components/ui/Logo";
import { nav, site } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-ink">
      <div className="mx-auto max-w-7xl px-5 pb-10 pt-24 md:px-10">
        <div className="grid gap-16 md:grid-cols-[1.4fr_1fr]">
          <div>
            <Logo />
            <p className="display mt-10 max-w-2xl text-4xl text-white md:text-6xl">
              Unlock more value from the television
              <span className="text-gradient"> you already deliver.</span>
            </p>
            <p className="mt-6 max-w-md text-muted">{site.description}</p>
          </div>
          <div className="grid grid-cols-2 gap-10 text-sm">
            <div className="flex flex-col gap-3">
              <p className="eyebrow mb-2 text-white/40">Explore</p>
              {nav.map((n) => (
                <Link key={n.href} href={n.href} className="text-white/80 hover:text-lime">
                  {n.label}
                </Link>
              ))}
            </div>
            <div className="flex flex-col gap-3">
              <p className="eyebrow mb-2 text-white/40">Engage</p>
              <Link href="/contact" className="text-white/80 hover:text-lime">Schedule a working session</Link>
              <a href={`mailto:${site.email}`} className="text-white/80 hover:text-lime">{site.email}</a>
            </div>
          </div>
        </div>
        <div className="mt-24 flex flex-col justify-between gap-4 border-t border-white/10 pt-8 text-xs text-white/40 md:flex-row">
          <p>© {new Date().getFullYear()} Advio. All rights reserved.</p>
          {/* Legal links: add hrefs once the pages exist */}
          <ul className="flex flex-wrap gap-x-6 gap-y-2" aria-label="Legal">
            <li>Legal</li>
            <li>Terms of Service</li>
            <li>Privacy Policy</li>
          </ul>
          <p>Powered by AdGlean</p>
        </div>
      </div>
    </footer>
  );
}
