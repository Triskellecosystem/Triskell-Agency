import type { Metadata } from "next";
import { CtaBand } from "@/components/sections/CtaBand";
import { PageHero } from "@/components/sections/PageHero";
import { SitePath } from "@/components/sections/SitePath";
import { SitesHeroStack } from "@/components/sections/SitesHeroStack";
import { HeroFx } from "@/components/ui/HeroFx";
import { LightRays } from "@/components/ui/LightRays";
import { Icon } from "@/components/ui/Icon";
import { SitesHelix } from "@/components/sections/SitesHelix";
import { Button } from "@/components/ui/Button";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { site } from "@/content/site";
import { SectionBg } from "@/components/ui/SectionBg";

export const metadata: Metadata = {
  title: "Siti web",
  description: "Come creiamo il tuo sito e tutti i siti che abbiamo realizzato: call iniziale, stile scelto insieme, struttura e testi, prima versione, revisioni, pubblicazione e assistenza.",
  alternates: { canonical: "/siti-web" },
};

export default function SitesPage() {
  const p = site.sitiProcess;
  return (
    <>
      <PageHero overline={p.overline} title={p.title} line={p.line} crumbs={[{ label: "Siti web" }]} aside={<SitesHeroStack />} backdrop={<><HeroFx horizon={78} vx={70} /><LightRays x={72} y={46} size={50} /></>}>
        <Button href="/contatti" size="md" icon="calendar" iconPosition="start" pulse>
          Voglio il mio sito
        </Button>
        <Button href="#portfolio" variant="secondary" size="md" icon="arrow-down">
          Tutti i siti
        </Button>
      </PageHero>

      <div className="container-x">
        <ul className="hero-feats grid gap-4 py-6 sm:grid-cols-3">
          {([["monitor", "Design su misura"], ["layers", "Revisioni incluse"], ["rocket", "Online e pronto a convertire"]] as const).map(([ic, l]) => (
            <li key={l} className="flex items-center justify-center gap-3 font-display text-[1.0625rem] font-semibold text-fg">
              <Icon name={ic} className="h-6 w-6 text-gold-300" strokeWidth={1.7} />
              {l}
            </li>
          ))}
        </ul>
      </div>


      <Section id="percorso" labelledBy="percorso-title">
        <SectionBg kind="c-hud" />

        <SectionHeading id="percorso-title" overline="Come lo creiamo" title={p.processTitle} line={p.processLine} align="center" />
        <Reveal y={16} blur={0} className="mt-10">
          <SitePath />
        </Reveal>
      </Section>

      <section id="portfolio" aria-labelledby="portfolio-title" className="hx-section relative isolate pt-[clamp(3rem,6vw,5rem)]">
        <span aria-hidden="true" className="pf-sep pointer-events-none absolute inset-x-0 top-0"><i /></span>
        <span aria-hidden="true" className="pf-head pointer-events-none absolute inset-x-0 top-0 -z-10 h-[32rem]" />
        <div className="container-x">
          <SectionHeading id="portfolio-title" overline="Portfolio" title="Tutti i siti che [abbiamo creato]" line="Ristoranti, ospitalità, brand, software: ognuno su misura." align="center" />
        </div>
        <div className="mt-8 pb-[clamp(2rem,4vw,3.5rem)]">
          <SitesHelix />
        </div>
      </section>

      <CtaBand content={site.cta.sites} />
    </>
  );
}
