import Button from "./Button";
import Reveal from "./Reveal";

export default function CtaBand({
  title = "Start the conversation.",
  body = "Bring your inventory, footprint and questions. We'll map whether a shared opportunity makes sense — before anyone commits.",
}: {
  title?: string;
  body?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-[#e9edf4] text-ink">
      <div className="absolute -right-40 -top-40 h-[40rem] w-[40rem] rounded-full bg-gem/35 blur-3xl" />
      <div className="relative mx-auto flex max-w-7xl flex-col gap-10 px-5 py-28 md:flex-row md:items-end md:justify-between md:px-10 md:py-36">
        <Reveal>
          <h2 className="display max-w-3xl text-6xl md:text-8xl">{title}</h2>
          <p className="mt-6 max-w-xl text-lg text-ink/70">{body}</p>
        </Reveal>
        <Reveal delay={0.1} className="flex flex-wrap gap-3">
          <Button href="/contact" variant="dark">Request a working session</Button>
          <Button href="/model" variant="dark" className="!bg-transparent !text-ink ring-1 ring-ink/30 hover:!bg-ink/5">
            Model your opportunity
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
