import Hero from "@/components/draft/Hero";
import HouseholdsScene from "@/components/draft/HouseholdsScene";
import MeetAdGlean from "@/components/draft/MeetAdGlean";
import ConnectionScene from "@/components/draft/ConnectionScene";
import OperatingModel from "@/components/draft/OperatingModel";
import ImageCards from "@/components/sections/ImageCards";
import ShowcaseTabs from "@/components/sections/ShowcaseTabs";
import FeatureSlides from "@/components/sections/FeatureSlides";
import Challenge from "@/components/sections/Challenge";
import Marquee from "@/components/ui/Marquee";
import CtaBand from "@/components/ui/CtaBand";
import { home } from "@/lib/content";
import { DRAFT } from "@/lib/draft";

export default function Home() {
  return (
    <>
      <Hero />

      {DRAFT === 1 && (
        <>
          <Marquee items={["Live Sports", "Local News", "Political Advertising", "Premium Live Events"]} />
          <ImageCards
            id="who-we-help"
            eyebrow={home.whoWeHelp.eyebrow}
            title={home.whoWeHelp.title}
            body={home.whoWeHelp.body}
            cards={home.whoWeHelp.sides.map((s) => ({ label: s.eyebrow, title: s.title, body: s.body, image: s.image, cta: s.cta }))}
          />
          <ShowcaseTabs {...home.linear} />
        </>
      )}

      {/* The challenge: households first */}
      <HouseholdsScene />

      <MeetAdGlean eyebrow={home.solution.eyebrow} body={home.solution.body} image={home.solution.image} />

      <ConnectionScene />

      <FeatureSlides eyebrow={home.advantage.eyebrow} title={home.advantage.title} items={home.advantage.items} backdrop={home.advantage.backdrop} />

      <OperatingModel />

      {/* Before/after slider sits under How AdGlean works */}
      <Challenge
        eyebrow="See the difference"
        title="Traditional television vs. AdGlean."
        body="Drag the slider to compare: the same commercial to every household, or the original ad kept for its audience and new eligible ads for the rest."
        images={home.challenge.images}
      />

      <CtaBand />
    </>
  );
}
