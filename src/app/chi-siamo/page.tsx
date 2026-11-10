import type { Metadata } from "next";
import { CtaBand } from "@/components/sections/CtaBand";
import { HowWeWork } from "@/components/sections/HowWeWork";
import { PersonScroll } from "@/components/sections/PersonScroll";
import { TeamIntro } from "@/components/sections/TeamIntro";
import { ContactLinks } from "@/components/sections/ContactLinks";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Chi siamo",
  description: "Il team di Triskell Agency (Tomaso, founder, e William, web developer) e il metodo con cui lavoriamo: analisi, strategia, produzione, risultati.",
  alternates: { canonical: "/chi-siamo" },
};

export default function AboutPage() {
  const { about } = site;
  return (
    <>
      <TeamIntro />
      {about.people.map((p, i) => (
        <PersonScroll key={p.id} person={p} index={i} />
      ))}
      <HowWeWork />
      <CtaBand content={site.cta.generic} />
      <ContactLinks />
    </>
  );
}
