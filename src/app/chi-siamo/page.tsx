import type { Metadata } from "next";
import { PerspectiveBg } from "@/components/ui/PerspectiveBg";
import { ContactLinks } from "@/components/sections/ContactLinks";
import { CtaBand } from "@/components/sections/CtaBand";
import { PersonScroll } from "@/components/sections/PersonScroll";
import { StepRail } from "@/components/sections/StepRail";
import { TeamIntro } from "@/components/sections/TeamIntro";
import { Section, SectionHeading } from "@/components/ui/Section";
import { TechBackdrop } from "@/components/ui/TechBackdrop";
import { Reveal } from "@/components/motion/Reveal";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Chi siamo",
  description: "Il team di Triskell Agency: Tomaso, founder (marketing e AI), e William, web designer e creative developer.",
  alternates: { canonical: "/chi-siamo" },
};

export default function AboutPage() {
  const { about } = site;
  const m = about.method;
  return (
    <>
      <TeamIntro />
      {about.people.map((p, i) => (
        <PersonScroll key={p.id} person={p} index={i} />
      ))}
      <Section id="come-lavoriamo" labelledBy="metodo-title">
        <PerspectiveBg variant="ceiling" />
        <TechBackdrop tone="gold" rich />
        <SectionHeading id="metodo-title" overline={m.overline} title={m.title} line={m.line} align="center" />
        <Reveal y={16} blur={0} className="mt-12">
          <StepRail steps={m.steps.map((s) => ({ icon: s.icon, title: s.title, get: s.text }))} />
        </Reveal>
      </Section>
      <CtaBand content={site.cta.generic} />
      <ContactLinks />
    </>
  );
}
