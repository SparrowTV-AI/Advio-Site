import type { Metadata } from "next";
import Calculator from "@/components/model/Calculator";
import { Container } from "@/components/ui/Section";

export const metadata: Metadata = { title: "Model your opportunity" };

export default function ModelPage() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-ink pb-32 pt-36">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_0%,rgba(59,79,245,0.35),transparent_55%)]" />
      <Container className="relative">
        <p className="eyebrow mb-6 text-cyan">Partner-specific economics</p>
        <h1 className="display max-w-4xl text-6xl text-white md:text-8xl">
          Start with <span className="text-gradient">your numbers.</span>
        </h1>
        <p className="mb-16 mt-8 max-w-2xl text-lg text-muted">
          Adjust the inputs to explore how eligible impressions, demand and delivery could translate into shared net value.
        </p>
        <Calculator />
      </Container>
    </section>
  );
}
