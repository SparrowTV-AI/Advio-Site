import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import OperatingModel from "@/components/home/OperatingModel";
import { Container, FeatureGrid, SectionHeading } from "@/components/ui/Section";
import CtaBand from "@/components/ui/CtaBand";

export const metadata: Metadata = { title: "How it works" };

export default function HowItWorks() {
  return (
    <>
      <PageHero
        eyebrow="AdGlean by ADVIO"
        title="Intelligence in"
        accent="every impression."
        body="Detect the ad. Evaluate the audience and permissions. Keep the original commitment or activate an eligible replacement. See how ADVIO, broadcasters and distributors each participate."
        cta={{ label: "Request a working session", href: "/contact" }}
      />
      <OperatingModel />
      <section className="bg-ink py-28 md:py-40">
        <Container>
          <SectionHeading
            eyebrow="Who does what"
            title="Three roles. One operating model."
            body="AdGlean coordinates the decisions — the parties keep their responsibilities."
          />
          <FeatureGrid
            items={[
              { title: "Broadcasters", body: "Authorize eligible inventory, set advertiser rules and campaign restrictions, and define what value means for the business." },
              { title: "ADVIO", body: "Provides the eligibility, activation and measurement intelligence that connects inventory authority with delivery capability." },
              { title: "Distributors", body: "Enable supported delivery, establish integration requirements and define commercial participation." },
            ]}
          />
        </Container>
      </section>
      <CtaBand />
    </>
  );
}
