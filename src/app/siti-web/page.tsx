import type { Metadata } from "next";
import { CtaBand } from "@/components/sections/CtaBand";
import { PageHero } from "@/components/sections/PageHero";
import { SiteProcess } from "@/components/sections/SiteProcess";
import { SitesHelix } from "@/components/sections/SitesHelix";
import { SitesWall } from "@/components/sections/WebsitesTeaser";
import { Button } from "@/components/ui/Button";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Siti web",
  description: "Come creiamo il tuo sito e tutti i siti che abbiamo realizzato: call iniziale, stile scelto insieme, struttura e testi, prima versione, revisioni, pubblicazione e assistenza.",
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
        <SectionHeading id="percorso-title" overline="Come lo creiamo" title={p.processTitle} line={p.processLine} align="center" />
        <Reveal y={16} blur={0} className="mt-10">
          <SiteProcess />
        </Reveal>
      </Section>

      <section id="portfolio" aria-labelledby="portfolio-title" className="relative isolate pt-[clamp(3rem,6vw,5rem)]">
        <div className="container-x">
          <SectionHeading id="portfolio-title" overline="Portfolio" title="Tutti i siti che [abbiamo creato]" line="Ristoranti, ospitalità, brand, software: ognuno su misura." align="center" />
        </div>
        <SitesHelix />
      </section>

      <CtaBand content={site.cta.sites} />
    </>
  );
}
