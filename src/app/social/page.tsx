import type { Metadata } from "next";
import { BaseConsigliata } from "@/components/sections/BaseConsigliata";
import { CtaBand } from "@/components/sections/CtaBand";
import { IncludesGroups } from "@/components/sections/IncludesGroups";
import { MethodStack } from "@/components/sections/MethodStack";
import { PageHero } from "@/components/sections/PageHero";
import { RecordingOptions } from "@/components/sections/RecordingOptions";
import { Rodaggio } from "@/components/sections/Rodaggio";
import { SocialFinale } from "@/components/sections/SocialFinale";
import { SocialPipeline } from "@/components/sections/SocialPipeline";
import { SupportBand } from "@/components/sections/SupportBand";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Section, SectionHeading } from "@/components/ui/Section";
import { TechBackdrop } from "@/components/ui/TechBackdrop";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Gestione social media",
  description: "Tu registri, al resto pensiamo noi: call iniziali, script pronti, riprese sul posto o in autonomia, editing, pubblicazione e report. Base consigliata: 12 contenuti al mese.",
  alternates: { canonical: "/social" },
};

export default function SocialPage() {
  const s = site.social;
  const m = site.metodo;
  return (
    <>
      <PageHero overline={s.overline} title={s.title} line={s.line} crumbs={[{ label: "Social media" }]} aside={<SocialPipeline />} pulseGold>
        <Button href="/contatti" size="lg" icon="calendar" iconPosition="start" pulse>
          Prenota la call gratuita
        </Button>
        <Button href="#come-lavoriamo" variant="secondary" size="lg" icon="arrow-down">
          Come lavoriamo
        </Button>
        <ul className="flex w-full flex-wrap gap-x-5 gap-y-2 pt-2">
          {s.heroPoints.map((p) => (
            <li key={p} className="inline-flex items-center gap-2 text-[0.9375rem] font-medium text-fg">
              <Icon name="check" className="h-4 w-4 text-gold-300" strokeWidth={2.6} />
              {p}
            </li>
          ))}
        </ul>
      </PageHero>

      <Section id="come-lavoriamo" labelledBy="come-title">
        <TechBackdrop tone="gold" rich />
        <SectionHeading id="come-title" overline="Come lavoriamo" title={s.processTitle} line={s.processLine} align="center" />
        <div className="mt-12 sm:mt-16">
          <MethodStack steps={s.steps} getLabel={s.getLabel} />
        </div>
      </Section>

      <RecordingOptions />

      <Section id="base-social" labelledBy="base-social-title">
        <TechBackdrop tone="gold" rich />
        <SectionHeading id="base-social-title" overline={m.base.overline} title="12 contenuti al mese: [3 a settimana]" line="Ogni collaborazione è su misura, ma questa è la base che consigliamo sempre: abbastanza per tenere il profilo vivo e dare forza alle campagne." />
        <div className="mt-10">
          <BaseConsigliata />
        </div>
      </Section>

      <IncludesGroups />

      <Section id="rodaggio-social" labelledBy="rodaggio-social-title">
        <TechBackdrop tone="azure" rich />
        <SectionHeading id="rodaggio-social-title" overline={m.rodaggio.overline} title={m.rodaggio.title} line={m.rodaggio.line} />
        <div className="mt-10 space-y-5">
          <Rodaggio />
          <SupportBand />
        </div>
      </Section>

      <SocialFinale />
      <CtaBand content={site.cta.agency} />
    </>
  );
}
