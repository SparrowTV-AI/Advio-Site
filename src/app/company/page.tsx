import type { Metadata } from "next";
import { Container } from "@/components/ui/Section";
import LeadershipGroups from "@/components/sections/Leadership";
import CtaBand from "@/components/ui/CtaBand";
import { leadership } from "@/lib/content";

export const metadata: Metadata = { title: "Leadership" };

export default function Page() {
  return (
    <>
      <section className="relative overflow-hidden bg-ink pb-28 pt-40">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_0%,rgba(59,79,245,0.35),transparent_55%)]" />
        <Container className="relative">
          <h1 className="display text-6xl text-white md:text-8xl">{leadership.title}</h1>
          <p className="mt-8 max-w-3xl text-lg leading-relaxed text-muted md:text-xl">{leadership.body}</p>
          <div className="mt-20">
            <LeadershipGroups groups={leadership.groups} />
          </div>
        </Container>
      </section>
      <CtaBand />
    </>
  );
}
