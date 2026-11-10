import type { Metadata } from "next";
import { BaseConsigliata } from "@/components/sections/BaseConsigliata";
import { CtaBand } from "@/components/sections/CtaBand";
import { IncludesGroups } from "@/components/sections/IncludesGroups";
import { PageHero } from "@/components/sections/PageHero";
import { PhoneFan } from "@/components/sections/PhoneFan";
import { RecordingOptions } from "@/components/sections/RecordingOptions";
import { Rodaggio } from "@/components/sections/Rodaggio";
import { SocialFinale } from "@/components/sections/SocialFinale";
import { StepRail } from "@/components/sections/StepRail";
import { SupportBand } from "@/components/sections/SupportBand";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Section, SectionHeading } from "@/components/ui/Section";
import { TechBackdrop } from "@/components/ui/TechBackdrop";
import { Reveal } from "@/components/motion/Reveal";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Gestione social media",
  description: "Più visibilità al tuo profilo con il minimo impegno: call iniziali, script pronti, riprese sul posto o in autonomia, editing, pubblicazione e report. Base consigliata: 12 contenuti al mese.",
  alternates: { canonical: "/social" },
};

export default function SocialPage() {
  const s = site.social;
  const m = site.metodo;
  return (
    <>
      <PageHero overline={s.overline} title={s.title} line={s.line} crumbs={[{ label: "Social media" }]} aside={<PhoneFan />} alignTop>
        <Button href="/contatti" size="md" icon="calendar" iconPosition="start" pulse>
          Prenota la call gratuita
        </Button>
        <Button href="#come-lavoriamo" variant="secondary" size="md" icon="arrow-down">
          Come lavoriamo
        </Button>
        <ul className="flex w-full flex-wrap gap-x-5 gap-y-1.5 pt-1">
          {s.heroPoints.map((p) => (
            <li key={p} className="inline-flex items-center gap-1.5 text-[0.8125rem] font-medium text-fg-2">
              <Icon name="check" className="h-3.5 w-3.5 text-gold-300" strokeWidth={2.6} />
              {p}
            </li>
          ))}
        </ul>
      </PageHero>

      <Section id="come-lavoriamo" labelledBy="come-title">
        <TechBackdrop tone="gold" rich />
        <SectionHeading id="come-title" overline="Il processo" title={s.processTitle} line={s.processLine} align="center" />
        <Reveal y={16} blur={0} className="mt-12">
          <StepRail steps={s.steps} />
        </Reveal>
      </Section>

      <RecordingOptions />

      <Section id="base-social" labelledBy="base-social-title" className="py-[clamp(2.5rem,1.6rem+2.6vw,4rem)]">
        <SectionHeading id="base-social-title" overline={m.base.overline} title="La base [consigliata]" line="Ogni collaborazione è su misura. Questa è la base da cui partire." />
        <div className="mt-8">
          <BaseConsigliata />
        </div>
      </Section>

      <IncludesGroups />

      <Section id="rodaggio-social" labelledBy="rodaggio-social-title" className="py-[clamp(2.5rem,1.6rem+2.6vw,4rem)]">
        <SectionHeading id="rodaggio-social-title" overline={m.rodaggio.overline} title={m.rodaggio.title} line="Struttura, messa in moto, risultati: servono almeno 6 mesi." />
        <div className="mt-8 space-y-4">
          <Rodaggio />
          <SupportBand />
        </div>
      </Section>

      <SocialFinale />
      <CtaBand content={site.cta.agency} />
    </>
  );
}
