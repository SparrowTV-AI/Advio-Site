import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import { Container, SectionHeading } from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";
import CtaBand from "@/components/ui/CtaBand";

export const metadata: Metadata = { title: "Company" };

export default function Company() {
  return (
    <>
      <PageHero
        eyebrow="Company"
        title="Television,"
        accent="connected."
        body="ADVIO — formerly SparrowTV — builds the intelligence that connects broadcasters and distributors around new advertising opportunity."
      />
      <section className="bg-paper py-28 text-ink md:py-40">
        <Container className="grid gap-16 md:grid-cols-2">
          <SectionHeading
            tone="light"
            eyebrow="Our view"
            title="The value is already on the screen."
            body="Television reaches every household at once. We believe the commercials already moving through broadcast and distribution networks can create more value for everyone involved — when the parties have a clear, controlled way to work together."
          />
          <div className="grid gap-4 self-end">
            {["Inventory.", "Intelligence.", "Delivery.", "Shared opportunity."].map((w, i) => (
              <Reveal key={w} delay={i * 0.08}>
                <p className={`display text-5xl md:text-6xl ${i === 3 ? "text-electric" : "text-ink"}`}>{w}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
      <section className="bg-ink py-28 md:py-40">
        <Container>
          <SectionHeading eyebrow="Leadership" title="The team." body="Team bios and photos go here." />
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map((n) => (
              <Reveal key={n} delay={n * 0.05}>
                <div className="aspect-[4/5] rounded-3xl bg-gradient-to-br from-navy-3 to-navy-2" />
                <p className="mt-4 font-semibold text-white">Name</p>
                <p className="text-sm text-muted">Title</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
      <CtaBand />
    </>
  );
}
