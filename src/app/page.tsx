import Hero from "@/components/draft/Hero";
import HouseholdsScene from "@/components/draft/HouseholdsScene";
import MeetAdGlean from "@/components/draft/MeetAdGlean";
import ConnectionScene from "@/components/draft/ConnectionScene";
import StepsScroll from "@/components/sections/StepsScroll";
import ImageCards from "@/components/sections/ImageCards";
import ShowcaseTabs from "@/components/sections/ShowcaseTabs";
import FeatureSlides from "@/components/sections/FeatureSlides";
import Challenge from "@/components/sections/Challenge";
import Marquee from "@/components/ui/Marquee";
import CtaBand from "@/components/ui/CtaBand";
import { adglean, home } from "@/lib/content";
import { DRAFT } from "@/lib/draft";

export default function Home() {
  const opportunity = <HouseholdsScene key="opportunity" />;
  const solution = <MeetAdGlean key="solution" eyebrow={home.solution.eyebrow} body={home.solution.body} image={home.solution.image} />;
  const connection = <ConnectionScene key="connection" />;
  const smarterPath = (
    <FeatureSlides key="smarter" eyebrow={home.advantage.eyebrow} title={home.advantage.title} items={home.advantage.items} backdrop={home.advantage.backdrop} />
  );
  const how = <StepsScroll key="how" id="how" {...adglean.how} />;
  const difference = (
    <Challenge
      key="difference"
      eyebrow="See the difference"
      title="Traditional television vs. AdGlean."
      body="Keep Ad A with its intended audience. Deliver Ad B or Ad C to other eligible households."
      images={home.challenge.images}
    />
  );

  return (
    <>
      <Hero />

      {DRAFT === 1 ? (
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
          {[opportunity, solution, connection, smarterPath, how, difference]}
        </>
      ) : (
        // Draft 2 order: Opportunity → Connection → Solution → How AdGlean works → A smarter path → See the difference
        [opportunity, connection, solution, how, smarterPath, difference]
      )}

      <CtaBand />
    </>
  );
}
