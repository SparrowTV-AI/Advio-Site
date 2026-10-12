import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import { Container, FeatureGrid, SectionHeading } from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";
import Faq from "@/components/ui/Faq";
import CtaBand from "@/components/ui/CtaBand";

export const metadata: Metadata = { title: "Distributors" };

export default function Distributors() {
  return (
    <>
      <PageHero
        eyebrow="For distributors"
        title="Your footprint."
        accent="New opportunity."
        body="Explore advertising value in the television already moving through your network, with integration and viewer continuity tested before scale."
        cta={{ label: "Explore a distribution partnership", href: "/contact?role=distributor" }}
      />

      <section className="bg-mist py-28 text-ink md:py-40">
        <Container>
          <SectionHeading
            tone="light"
            eyebrow="The business case"
            title={<>Your delivery footprint.<br />A defined economic role.</>}
            body={
              <>
                <p>Your network or service already connects television programming with viewers. The opportunity is to evaluate whether supported addressable delivery can enable additional advertising value from broadcaster-authorized inventory moving through that environment.</p>
                <p className="mt-4">The commercial conversation belongs alongside the technical review. Inventory permissions, integration effort, audience signals, viewer continuity, reporting access and partner participation all affect whether the opportunity makes sense.</p>
              </>
            }
          />
          <div className="mt-16 grid gap-6 md:grid-cols-2">
            {[
              ["What you bring", "Delivery expertise, a supported environment, relevant signals and the operational owner who can assess integration."],
              ["What the parties evaluate", "Authorized opportunities, technical effort, replacement availability, playback quality, reporting and net incremental economics."],
            ].map(([t, b], i) => (
              <Reveal key={t} delay={i * 0.08}>
                <div className="h-full rounded-3xl bg-white p-10 shadow-[0_20px_60px_-30px_rgba(5,11,22,0.25)]">
                  <h3 className="text-2xl font-semibold">{t}</h3>
                  <p className="mt-4 text-lg leading-relaxed text-slate-600">{b}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-10 max-w-2xl text-slate-600">
            Broadcasters remain essential to inventory authorization and campaign rules. ADVIO&apos;s role is to help connect those requirements to the distributor&apos;s delivery capabilities through an agreed operating model.
          </Reveal>
        </Container>
      </section>

      <section className="bg-ink py-28 md:py-40">
        <Container>
          <SectionHeading eyebrow="A defined contribution" title="Enable the path. Evaluate the return." />
          <FeatureGrid
            items={[
              { title: "Delivery and continuity", body: "Scope the supported insertion path, playback behavior, fallback and operational escalation with engineering. Validate the experience in a bounded environment." },
              { title: "Data under agreed policies", body: "Establish the audience signals needed for eligibility, permitted uses, retention and access. Use the distributor's policies to guide the data and privacy working session." },
              { title: "Inventory or revenue participation", body: "The partner framework contemplates sellable inventory or revenue participation. Amount, allocation, demand responsibilities and reporting belong in partner-specific terms." },
            ]}
          />
        </Container>
      </section>

      <section className="bg-paper py-28 text-ink md:py-40">
        <Container>
          <SectionHeading tone="light" eyebrow="Questions partners ask" title="Before the first conversation." />
          <Faq
            items={[
              { q: "Does this use our ad stack on broadcaster inventory?", a: "Placeholder — add ADVIO's approved answer here." },
              { q: "What do we contribute?", a: "Delivery expertise, a supported environment, relevant signals and an operational owner who can assess integration." },
              { q: "How do we participate commercially?", a: "Through inventory or revenue participation defined in partner-specific terms, including allocation, demand responsibilities and reporting." },
            ]}
          />
        </Container>
      </section>
      <CtaBand title="Explore a distribution partnership." />
    </>
  );
}
