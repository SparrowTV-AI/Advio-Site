import type { Metadata } from "next";
import ImageHero from "@/components/sections/ImageHero";
import StepsScroll from "@/components/sections/StepsScroll";
import Figure from "@/components/sections/Figure";
import { Container, FeatureGrid, SectionHeading } from "@/components/ui/Section";
import CtaBand from "@/components/ui/CtaBand";
import { adglean } from "@/lib/content";

export const metadata: Metadata = { title: "AdGlean Technology" };

export default function Page() {
  return (
    <>
      <ImageHero eyebrow={adglean.hero.eyebrow} title={adglean.hero.title} body={adglean.hero.body} ctas={[adglean.hero.cta]} image={adglean.hero.image} tall={false} />
      <StepsScroll id="how" eyebrow={adglean.how.eyebrow} title={adglean.how.title} body={adglean.how.body} steps={adglean.how.steps} />
      <Figure {...adglean.path} alt="AdGlean impression decision flow" />
      <section className="bg-paper py-24 text-ink md:py-32">
        <Container>
          <SectionHeading tone="light" eyebrow={adglean.safeguards.eyebrow} title={adglean.safeguards.title} body={adglean.safeguards.body} />
          <FeatureGrid tone="light" items={adglean.safeguards.items} />
        </Container>
      </section>
      <Figure {...adglean.fits} alt="Broadcasters, Advio + AdGlean, and distributors" />
      <CtaBand />
    </>
  );
}
