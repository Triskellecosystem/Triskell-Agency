import type { Metadata } from "next";

import { BestPackage } from "@/components/sections/BestPackage";
import { Compare } from "@/components/sections/Compare";
import { Contact } from "@/components/sections/Contact";
import { MetodoEquation } from "@/components/sections/MetodoEquation";
import { LivePhone } from "@/components/sections/LivePhone";
import { Rodaggio } from "@/components/sections/Rodaggio";
import { Button } from "@/components/ui/Button";
import { Section, SectionHeading } from "@/components/ui/Section";
import { DigitalCursor } from "@/components/motion/DigitalCursor";
import { Reveal } from "@/components/motion/Reveal";
import { site } from "@/content/site";
import { SceneVideo } from "@/components/ui/SceneVideo";
import { SectionGlow } from "@/components/ui/SectionGlow";
import { LightRays } from "@/components/ui/LightRays";
import { HeroFx } from "@/components/ui/HeroFx";

export const metadata: Metadata = {
  title: "Il Metodo Triskell",
  description: "Social + campagne (+ sito, se serve) = più clienti. La base più scelta: 12 contenuti e 4–5 campagne al mese, collaborazione da minimo 6 mesi, tutto su misura.",
  alternates: { canonical: "/metodo-triskell" },
};


export default function MetodoPage() {
  const m = site.metodo;
  return (
    <>
      <section aria-labelledby="metodo-title" className="relative isolate overflow-hidden pb-[clamp(4.5rem,8vw,6.5rem)] pt-[calc(var(--header-h)+clamp(2rem,5vh,3.5rem))]">
        <HeroFx horizon={78} vx={58} />
        <LightRays x={57} y={46} size={56} />
        <DigitalCursor className="-z-10" />
        <div className="container-x grid items-center gap-x-10 gap-y-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
          <div>
            <p className="animate-[fade-in_0.8s_var(--ease-soft)_both] text-[0.6875rem] font-semibold uppercase tracking-[0.22em] text-gold-300">{m.overline}</p>
            <h1 id="metodo-title" className="hero-accent mt-2 animate-[line-up_1s_var(--ease-out-expo)_backwards] font-display text-[clamp(3rem,2rem+4vw,5.5rem)] font-bold leading-[0.92] tracking-[-0.05em] text-fg">
              Metodo <span className="text-gold">Triskell</span>
            </h1>
            <p className="mt-4 font-display text-[clamp(1.25rem,1rem+1vw,1.75rem)] font-bold tracking-[-0.02em] text-fg-2">
              Social <span className="text-gold-300">+</span> Campagne
            </p>
            <p className="mt-5 max-w-md text-[0.9375rem] leading-relaxed text-fg-2">{m.line}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/contatti" size="lg" icon="calendar" iconPosition="start" pulse>
                Prenota la call gratuita
              </Button>
              <Button href="#base" size="lg" variant="secondary" icon="arrow-down">
                La base più scelta
              </Button>
            </div>
          </div>
          <LivePhone stats salesLabel="Visite fissate" profile="lumina" className="lp-metodo" />
        </div>
      </section>

      <Section id="formula" labelledBy="formula-title" className="mt-band">

        <SectionGlow />
        <SectionHeading id="formula-title" overline="Metodo Triskell" title="Ogni parte [a supporto delle altre]" line="Un metodo integrato che unisce strategia, contenuti e tecnologia per far crescere la tua attività." className="max-w-4xl" />
        <Reveal y={10} blur={0} className="mt-10">
          <MetodoEquation fly />
        </Reveal>
      </Section>

      <Section id="registrazione" labelledBy="registrazione-title" className="overflow-hidden">

        <SectionGlow alt />
        <div className="grid items-center gap-x-12 gap-y-10 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)]">
          <div>
            <SectionHeading id="registrazione-title" overline="Le riprese" title="Se vuoi, [ti aiutiamo anche a registrare]" line="Veniamo noi sul posto, oppure ti guidiamo passo passo: script pronti, inquadrature e call per imparare." />
            <Reveal y={12} blur={0} delay={0.2} className="mt-7 flex flex-wrap gap-3">
              <Button href="/social#riprese" size="md" variant="secondary" icon="arrow-right" className="btn-glow-outline">
                Come funzionano le riprese
              </Button>
            </Reveal>
          </div>
          <Reveal y={0} blur={0} className="scv-reveal cv-glow">
            <SceneVideo src="/video/riprese-1.mp4" poster="/video/riprese-1.jpg" label="Una ripresa guidata per i contenuti social" />
          </Reveal>
        </div>
      </Section>

      <Section id="differenza" labelledBy="differenza-title">

        <SectionGlow />
        <SectionHeading id="differenza-title" overline={m.compare.overline} title={m.compare.title} line={m.compare.line} align="center" />
        <div className="mt-9">
          <Compare them={m.compare.them} us={m.compare.us} rows={m.compare.rows} />
        </div>
        <Reveal y={12} blur={0} className="mt-8 flex justify-center">
          <Button href="/contatti" size="lg" icon="calendar" iconPosition="start" pulse>
            Prenota la call gratuita
          </Button>
        </Reveal>
      </Section>

      <Section id="base" labelledBy="base-title">

        <SectionGlow floor alt />
        <SectionHeading id="base-title" overline={m.best.overline} title={m.best.title} line={m.best.line} align="center" />
        <Reveal y={20} blur={0} className="mt-9">
          <BestPackage />
        </Reveal>
      </Section>

      <Section id="rodaggio" labelledBy="rodaggio-title">

        <SectionGlow floor />
        <SectionHeading id="rodaggio-title" overline={m.rodaggio.overline} title={m.rodaggio.title} line="Il tempo per creare la struttura, metterla in moto e vedere i risultati. Con meno tempo i risultati restano troppo relativi." />
        <div className="mt-9">
          <Rodaggio />
        </div>
      </Section>

      <Contact variant="panel" />
    </>
  );
}
