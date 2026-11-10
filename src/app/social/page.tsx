import type { Metadata } from "next";
import { Compare } from "@/components/sections/Compare";
import { CtaBand } from "@/components/sections/CtaBand";
import { IncludesGroups } from "@/components/sections/IncludesGroups";
import { PageHero } from "@/components/sections/PageHero";
import { ProfileExamples } from "@/components/sections/ProfileExamples";
import { PhoneFan } from "@/components/sections/PhoneFan";
import { LivePhone } from "@/components/sections/LivePhone";
import { PerspectiveBg } from "@/components/ui/PerspectiveBg";
import { RecordingOptions } from "@/components/sections/RecordingOptions";
import { Rodaggio } from "@/components/sections/Rodaggio";
import { SocialFinale } from "@/components/sections/SocialFinale";
import { SocialPillars } from "@/components/sections/SocialPillars";
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
      <PageHero overline={s.overline} title={s.title} line={s.line} crumbs={[{ label: "Social media" }]} aside={<PhoneFan />} alignTop backdrop={<div aria-hidden="true" className="tiles3d absolute inset-0 -z-10"><span className="tiles3d-plane" /></div>}>
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

      <SocialPillars />

      <Section id="crescita" labelledBy="crescita-title" className="overflow-hidden">
        <PerspectiveBg variant="floor" />
        <div className="grid items-center gap-x-12 gap-y-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
          <div>
            <SectionHeading id="crescita-title" overline="Il risultato" title="Un profilo che [cresce ogni giorno]" line="Contenuti costanti e campagne attive: follower, messaggi e richieste arrivano tutti i giorni." />
            <Reveal y={12} blur={0} delay={0.2} className="mt-7">
              <Button href="/contatti" size="lg" icon="calendar" iconPosition="start" pulse>
                Voglio far crescere il mio profilo
              </Button>
            </Reveal>
          </div>
          <LivePhone profile="vertis" salesLabel="Prove fissate" />
        </div>
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


      <IncludesGroups />

      <Section id="vantaggio" labelledBy="vantaggio-title" className="sq-bg">
        <PerspectiveBg variant="wall" />
        <SectionHeading id="vantaggio-title" overline={s.compare.overline} title={s.compare.title} line={s.compare.line} align="center" />
        <div className="mt-9">
          <Compare them={s.compare.them} us={s.compare.us} rows={s.compare.rows} />
        </div>
      </Section>

      <Section id="rodaggio-social" labelledBy="rodaggio-social-title" className="py-[clamp(2.5rem,1.6rem+2.6vw,4rem)]">
        <SectionHeading id="rodaggio-social-title" overline={m.rodaggio.overline} title={m.rodaggio.title} line="Il tempo per creare la struttura, metterla in moto e vedere i risultati." />
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
