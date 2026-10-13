import Button from "./Button";
import Reveal from "./Reveal";

export default function CtaBand({
  title = "See What AdGlean Could Unlock in Your Television Environment.",
  body = "Every television business is different. Let's explore how AdGlean could work within your existing operations to identify new advertising opportunities.",
}: {
  title?: string;
  body?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-lime text-ink">
      <div className="absolute -right-40 -top-40 h-[40rem] w-[40rem] rounded-full bg-cyan/50 blur-3xl" />
      <div className="relative mx-auto flex max-w-7xl flex-col gap-10 px-5 py-28 md:flex-row md:items-end md:justify-between md:px-10 md:py-36">
        <Reveal>
          <p className="eyebrow mb-5 text-ink/60">Let&apos;s talk</p>
          <h2 className="display max-w-4xl text-5xl md:text-7xl">{title}</h2>
          <p className="mt-6 max-w-xl text-lg text-ink/70">{body}</p>
        </Reveal>
        <Reveal delay={0.1} className="flex flex-wrap gap-3">
          <Button href="/contact" variant="dark">Schedule a working session</Button>
        </Reveal>
      </div>
    </section>
  );
}
