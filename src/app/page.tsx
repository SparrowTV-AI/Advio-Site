import Hero from "@/components/home/Hero";
import Evidence from "@/components/home/Evidence";
import HouseholdsScene from "@/components/home/HouseholdsScene";
import ConnectionScene from "@/components/home/ConnectionScene";
import OperatingModel from "@/components/home/OperatingModel";
import Marquee from "@/components/ui/Marquee";
import { Container, FeatureGrid, SectionHeading } from "@/components/ui/Section";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import CtaBand from "@/components/ui/CtaBand";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Hero />
      <Evidence />
      <Marquee items={["Live moments", "Premium inventory", "Connected opportunity", "Shared value"]} />
      <HouseholdsScene />
      <ConnectionScene />

      <section className="bg-ink py-28 md:py-40">
        <Container>
          <SectionHeading
            eyebrow="Why it works"
            title={<>Built for <span className="text-gem">both sides.</span></>}
            body="Broadcasters and distributors depend on each other to bring television to viewers. New advertising opportunity becomes practical when those interests have a clear way to work together."
          />
          <FeatureGrid
            items={[
              { title: "A clearer way to collaborate", body: "Define eligible inventory, delivery responsibilities and approval requirements before activation. Each party can see its role and the conditions for moving forward." },
              { title: "A larger opportunity to evaluate", body: "Explore additional value from eligible impressions, rather than assuming all value must come from existing commercial arrangements." },
              { title: "Evidence everyone can review", body: "Agree how detection, delivery and net incremental economics will be measured. Use the pilot to decide whether the model works for everyone." },
            ]}
          />
        </Container>
      </section>

      <OperatingModel />

      <section className="bg-paper py-28 text-ink md:py-40">
        <Container>
          <SectionHeading
            tone="light"
            eyebrow="An operating model built around control"
            title={<>Protect the commitment.<br />Evaluate the opportunity.</>}
          />
          <FeatureGrid
            tone="light"
            items={[
              { title: "Intended audience", body: "The model preserves the original commercial for its agreed intended audience." },
              { title: "Inventory permission", body: "Broadcasters authorize eligible inventory and campaign restrictions before activation." },
              { title: "Original-ad fallback", body: "When no qualified replacement can proceed, the original advertisement is retained. Fallback is validated in the partner environment." },
            ]}
          />
        </Container>
      </section>

      <section className="bg-navy py-28 md:py-40">
        <Container className="grid gap-16 md:grid-cols-2">
          <SectionHeading
            eyebrow="Partner-specific economics"
            title={<>The opportunity starts with <span className="text-gem">your numbers.</span></>}
            body="Use your actual inventory, audience, delivery footprint and advertising economics to model potential value. A pilot separates estimates from observed results."
          />
          <div className="flex flex-col justify-end gap-4">
            {[
              ["Eligible impressions", "Which opportunities qualify under the agreed rights and technical conditions?"],
              ["Demand and delivery", "What can be filled, at what realized pricing, with what operating costs?"],
              ["Shared net value", "How could broadcaster and distributor participation work after incremental costs?"],
            ].map(([t, b], i) => (
              <Reveal key={t} delay={i * 0.08}>
                <Link href="/model" className="group flex items-start justify-between gap-6 rounded-2xl border border-white/10 p-6 transition-colors hover:border-gem/60 hover:bg-white/[0.03]">
                  <div>
                    <h3 className="text-xl font-semibold text-white">{t}</h3>
                    <p className="mt-2 text-muted">{b}</p>
                  </div>
                  <span className="text-2xl text-gem transition-transform group-hover:translate-x-1">→</span>
                </Link>
              </Reveal>
            ))}
            <Reveal delay={0.3} className="mt-4">
              <Button href="/model">Model my opportunity</Button>
            </Reveal>
          </div>
        </Container>
      </section>

      <CtaBand />
    </>
  );
}
