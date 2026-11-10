import type { Metadata } from "next";
import { BaseConsigliata } from "@/components/sections/BaseConsigliata";
import { Compare } from "@/components/sections/Compare";
import { CtaBand } from "@/components/sections/CtaBand";
import { IncludesGroups } from "@/components/sections/IncludesGroups";
import { PageHero } from "@/components/sections/PageHero";
import { ProfileExamples } from "@/components/sections/ProfileExamples";
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
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
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

      <Section id="cosa-facciamo" labelledBy="cosa-title" className="py-[clamp(2.5rem,1.6rem+2.6vw,4rem)]">
        <SectionHeading id="cosa-title" overline="Cosa facciamo" title="Ci occupiamo [di tutto]" line="Tu ci dai poco tempo. Noi facciamo crescere il profilo." align="center" />
        <RevealGroup className="mx-auto mt-8 grid max-w-4xl grid-cols-2 gap-3 md:grid-cols-4" stagger={0.1}>
          {s.pillars.map((p, i) => (
            <RevealItem key={p.title} y={16} className="h-full">
              <div className="sp-pill group/pl flex h-full flex-col items-center rounded-2xl border border-white/[0.08] bg-white/[0.02] p-4 text-center transition-colors duration-[var(--dur-base)] hover:border-gold-300/50" style={{ "--i": i } as React.CSSProperties}>
                <span className="sp-pill-ico grid h-11 w-11 place-items-center rounded-full bg-[image:var(--gradient-gold-btn)] text-night">
                  <Icon name={p.icon} className="h-5 w-5" strokeWidth={1.9} />
                </span>
                <p className="mt-3 font-display text-[1rem] font-bold text-fg">{p.title}</p>
                <p className="mt-0.5 text-[0.75rem] leading-snug text-fg-3">{p.text}</p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      <ProfileExamples />

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

      <Section id="vantaggio" labelledBy="vantaggio-title">
        <SectionHeading id="vantaggio-title" overline={s.compare.overline} title={s.compare.title} line={s.compare.line} align="center" />
        <div className="mt-9">
          <Compare them={s.compare.them} us={s.compare.us} rows={s.compare.rows} />
        </div>
      </Section>

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
