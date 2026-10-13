"use client";
import Image from "next/image";
import { motion } from "motion/react";
import { Container, SectionHeading } from "@/components/ui/Section";

export default function Figure({ eyebrow, title, body, image, imageMobile, alt }: { eyebrow: string; title: string; body: string; image: string; imageMobile?: string; alt: string }) {
  return (
    <section className="relative overflow-hidden bg-ink py-24 md:py-36">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_70%,rgba(59,79,245,0.25),transparent_60%)]" />
      <Container className="relative">
        <SectionHeading eyebrow={eyebrow} title={title} body={body} />
        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="mt-16 overflow-hidden rounded-[2rem] border border-white/10"
        >
          <Image src={image} alt={alt} width={1800} height={900} sizes="(min-width: 1280px) 1200px, 100vw" className={`h-auto w-full ${imageMobile ? "hidden md:block" : ""}`} />
          {imageMobile && <Image src={imageMobile} alt={alt} width={1024} height={1536} sizes="100vw" className="h-auto w-full md:hidden" />}
        </motion.div>
      </Container>
    </section>
  );
}
