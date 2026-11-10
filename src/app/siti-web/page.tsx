import type { Metadata } from "next";
import { Stage3D } from "@/components/ui/Stage3D";
import { CtaBand } from "@/components/sections/CtaBand";
import { PageHero } from "@/components/sections/PageHero";
import { SitesRing } from "@/components/sections/SitesRing";
import { SiteIncludes } from "@/components/sections/SiteIncludes";
import { StepRail } from "@/components/sections/StepRail";
import { SitesWall } from "@/components/sections/WebsitesTeaser";
import { Button } from "@/components/ui/Button";
import { Section, SectionHeading } from "@/components/ui/Section";
import { TechBackdrop } from "@/components/ui/TechBackdrop";
import { Reveal } from "@/components/motion/Reveal";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Siti web",
  description: "Come creiamo il tuo sito: call iniziale, stile scelto insieme, struttura e testi, prima versione, revisioni, pubblicazione e assistenza.",
  alternates: { canonical: "/siti-web" },
};

export default function SitesPage() {
  const p = site.sitiProcess;
  return (
    <>
      <PageHero overline={p.overline} title={p.title} line={p.line} crumbs={[{ label: "Siti web" }]}>
        <Button href="/contatti" size="md" icon="calendar" iconPosition="start" pulse>
          Voglio il mio sito
        </Button>
        <Button href="#portfolio" variant="secondary" size="md" icon="arrow-down">
          Tutti i siti
        </Button>
      </PageHero>

      <div className="container-x -mt-4">
        <Reveal y={20} blur={0}>
          <SitesWall className="h-[24rem] sm:h-[32rem] lg:h-[38rem]" />
        </Reveal>
      </div>

      <Section id="percorso" labelledBy="percorso-title">
        <Stage3D kind="horizon" />
        <TechBackdrop tone="gold" rich />
        <SectionHeading id="percorso-title" overline="Come lo creiamo" title={p.processTitle} line={p.processLine} align="center" />
        <Reveal y={16} blur={0} className="mt-12">
          <StepRail steps={p.steps} />
        </Reveal>
      </Section>

      <SiteIncludes />

      <Section id="portfolio" labelledBy="portfolio-title" className="overflow-hidden">
        <Stage3D kind="rings" tone="azure" />
        <SectionHeading id="portfolio-title" overline="Portfolio" title="Tutti i siti che [abbiamo creato]" line="Ristoranti, ospitalità, brand, software: ognuno su misura." align="center" />
        <Reveal y={20} blur={0} className="mt-8">
          <SitesRing />
        </Reveal>
      </Section>

      <CtaBand content={site.cta.sites} />
    </>
  );
}
