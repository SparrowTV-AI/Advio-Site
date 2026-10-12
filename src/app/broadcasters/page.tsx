import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import { Container, FeatureGrid, SectionHeading } from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";
import Faq from "@/components/ui/Faq";
import CtaBand from "@/components/ui/CtaBand";

export const metadata: Metadata = { title: "Broadcasters" };

export default function Broadcasters() {
  return (
    <>
      <PageHero
        eyebrow="For broadcasters"
        title="Put inventory"
        accent="potential to work."
        pose={{ rotation: [0.2, 0.6, Math.PI / 4], scale: 0.95 }}
        body="Keep commercial authority over every commitment while exploring the value in impressions that fall outside an advertiser's intended audience."
        cta={{ label: "Explore a broadcaster partnership", href: "/contact?role=broadcaster" }}
      />

      <section className="bg-mist py-28 text-ink md:py-40">
        <Container>
          <SectionHeading
            tone="light"
            eyebrow="The business case"
            title={<>Premium inventory.<br />Commercial authority.</>}
            body="Live sports, local news and premium events reach every household on the network. When a commercial reaches homes outside its intended audience, those impressions can be evaluated for additional, broadcaster-approved value — without changing what was promised to the original advertiser."
          />
          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {[
              ["Authorize", "Decide which inventory is eligible and which campaigns, categories and advertisers are restricted."],
              ["Establish rules", "Set advertiser rules and approval requirements before anything is activated."],
              ["Define value", "Agree what success means for your business — and how it will be measured."],
            ].map(([t, b], i) => (
              <Reveal key={t} delay={i * 0.08}>
                <div className="h-full rounded-3xl bg-white p-10 shadow-[0_20px_60px_-30px_rgba(5,11,22,0.25)]">
                  <h3 className="display text-4xl text-electric">{t}</h3>
                  <p className="mt-4 text-lg leading-relaxed text-slate-600">{b}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-ink py-28 md:py-40">
        <Container>
          <SectionHeading eyebrow="Built around control" title="Protect the commitment. Evaluate the opportunity." />
          <FeatureGrid
            items={[
              { title: "Intended audience preserved", body: "The original commercial runs for its agreed intended audience, exactly as sold." },
              { title: "Inventory permission", body: "You authorize eligible inventory and campaign restrictions before activation." },
              { title: "Original-ad fallback", body: "When no qualified replacement can proceed, the original advertisement is retained." },
            ]}
          />
        </Container>
      </section>

      <section className="bg-paper py-28 text-ink md:py-40">
        <Container>
          <SectionHeading tone="light" eyebrow="Questions partners ask" title="Before the first conversation." />
          <Faq
            items={[
              { q: "Do we keep control of our inventory?", a: "Yes. Broadcasters authorize eligible inventory, advertiser rules and campaign restrictions before activation." },
              { q: "What happens to the original advertiser's commitment?", a: "The original commercial is preserved for its agreed intended audience. When no qualified replacement can proceed, the original ad runs." },
              { q: "How is value measured and shared?", a: "Detection, delivery and net incremental economics are agreed up front and measured in a pilot before any expansion." },
            ]}
          />
        </Container>
      </section>
      <CtaBand title="Explore a broadcaster partnership." />
    </>
  );
}
