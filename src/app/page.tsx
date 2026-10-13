import ImageHero from "@/components/sections/ImageHero";
import ImageCards from "@/components/sections/ImageCards";
import ShowcaseTabs from "@/components/sections/ShowcaseTabs";
import ImageSplit from "@/components/sections/ImageSplit";
import Connection from "@/components/sections/Connection";
import FeatureSlides from "@/components/sections/FeatureSlides";
import StepsScroll from "@/components/sections/StepsScroll";
import Challenge from "@/components/sections/Challenge";
import Marquee from "@/components/ui/Marquee";
import CtaBand from "@/components/ui/CtaBand";
import { home } from "@/lib/content";

export default function Home() {
  return (
    <>
      <ImageHero {...home.hero} />
      <Marquee items={["Live Sports", "Local News", "Political Advertising", "Premium Live Events"]} />
      <ImageCards
        id="who-we-help"
        eyebrow={home.whoWeHelp.eyebrow}
        title={home.whoWeHelp.title}
        body={home.whoWeHelp.body}
        cards={home.whoWeHelp.sides.map((s) => ({ label: s.eyebrow, title: s.title, body: s.body, image: s.image, cta: s.cta }))}
      />
      <ShowcaseTabs {...home.linear} />
      <Challenge {...home.challenge} />
      <ImageCards tone="light" eyebrow={home.needed.eyebrow} title={home.needed.title} cards={home.needed.items} />
      <ImageSplit
        eyebrow={home.solution.eyebrow}
        title={home.solution.title}
        subtitle={home.solution.subtitle}
        paragraphs={[home.solution.body]}
        image={home.solution.image}
      />
      <Connection {...home.connection} />
      <FeatureSlides eyebrow={home.advantage.eyebrow} title={home.advantage.title} items={home.advantage.items} backdrop={home.advantage.backdrop} />
      <ImageSplit
        reverse
        tone="light"
        eyebrow={home.howTeaser.eyebrow}
        title={home.howTeaser.title}
        paragraphs={[home.howTeaser.body, home.howTeaser.body2]}
        image={home.howTeaser.image}
        cta={home.howTeaser.cta}
      />
      <StepsScroll eyebrow="How AdGlean works" title="Intelligence That Finds Opportunity in Every Impression." steps={home.steps} />
      <CtaBand />
    </>
  );
}
