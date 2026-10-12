import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import { Container, FeatureGrid, SectionHeading } from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";
import CtaBand from "@/components/ui/CtaBand";

export const metadata: Metadata = { title: "Measurement" };

const stages = [
  ["Detection", "Was the commercial identified correctly, at the moment it aired?"],
  ["Eligibility", "Did the impression qualify under the agreed rights, audience rules and technical conditions?"],
  ["Delivery", "Did the replacement play as intended, with continuity and fallback behaving as agreed?"],
  ["Economics", "After incremental costs, what net value was created — and how was it shared?"],
];

export default function Measurement() {
  return (
    <>
      <PageHero
        eyebrow="Measurement"
        title="Evidence everyone"
        accent="can review."
        body="Agree how detection, delivery and net incremental economics will be measured — then use the pilot to decide whether the model benefits every participating organization."
        cta={{ label: "Model your opportunity", href: "/model" }}
      />
      <section className="bg-paper py-28 text-ink md:py-40">
        <Container>
          <SectionHeading tone="light" eyebrow="What gets measured" title="From signal to shared value." />
          <div className="mt-16 grid gap-px overflow-hidden rounded-3xl bg-ink/10 md:grid-cols-4">
            {stages.map(([t, b], i) => (
              <Reveal key={t} delay={i * 0.08} className="bg-paper">
                <div className="flex h-full flex-col p-8">
                  <span className="display text-6xl text-electric/25">{i + 1}</span>
                  <h3 className="mt-8 text-2xl font-semibold">{t}</h3>
                  <p className="mt-3 leading-relaxed text-slate-600">{b}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
      <section className="bg-ink py-28 md:py-40">
        <Container>
          <SectionHeading eyebrow="Pilot first" title="Estimates in. Observed results out." body="A pilot separates estimates from observed results, and establishes the evidence for expansion." />
          <FeatureGrid
            items={[
              { title: "Agreed up front", body: "The parties define metrics, reporting access and success criteria before activation." },
              { title: "Bounded environment", body: "Delivery, playback and fallback are validated in a controlled partner environment." },
              { title: "Shared reporting", body: "Impression-level evidence each party can review and use to decide on next steps." },
            ]}
          />
        </Container>
      </section>
      <CtaBand />
    </>
  );
}
