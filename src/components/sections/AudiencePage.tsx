import ImageHero from "./ImageHero";
import ImageSplit from "./ImageSplit";
import FeatureSlides from "./FeatureSlides";
import ImageCards from "./ImageCards";
import CtaBand from "@/components/ui/CtaBand";
import type { broadcasters } from "@/lib/content";

type Data = typeof broadcasters;

export default function AudiencePage({ data }: { data: Data }) {
  return (
    <>
      <ImageHero eyebrow={data.hero.eyebrow} title={data.hero.title} body={data.hero.body} ctas={[data.hero.cta]} image={data.hero.image} tall={false} />
      <ImageSplit tone="light" eyebrow={data.untapped.eyebrow} title={data.untapped.title} paragraphs={data.untapped.paragraphs} image={data.untapped.image} />
      <FeatureSlides eyebrow={data.advantage.eyebrow} title={data.advantage.title} items={data.advantage.items} backdrop={data.advantage.backdrop} />
      <ImageCards tone="light" eyebrow={data.start.eyebrow} title={data.start.title} body={data.start.body} cards={data.start.steps} numbered="Step" />
      <CtaBand />
    </>
  );
}
