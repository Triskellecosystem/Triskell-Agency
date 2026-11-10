import type { Metadata } from "next";
import { CtaBand } from "@/components/sections/CtaBand";
import { MethodStack } from "@/components/sections/MethodStack";
import { PageHero } from "@/components/sections/PageHero";
import { SiteCard } from "@/components/sections/SiteCard";
import { SiteIncludes } from "@/components/sections/SiteIncludes";
import { SitesWall } from "@/components/sections/WebsitesTeaser";
import { Button } from "@/components/ui/Button";
import { Section, SectionHeading } from "@/components/ui/Section";
import { TechBackdrop } from "@/components/ui/TechBackdrop";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Siti web",
  description: "Come creiamo il tuo sito: call iniziale, stile scelto insieme, struttura e testi, prima versione, revisioni, pubblicazione e assistenza. Siti veloci, pensati per portarti clienti.",
  alternates: { canonical: "/siti-web" },
};

export default function SitesPage() {
  const p = site.sitiProcess;
  const featured = site.sitiWeb.featured.flatMap((id) => site.sitiWeb.items.filter((i) => i.id === id));
  return (
    <>
      <PageHero overline={p.overline} title={p.title} line={p.line} crumbs={[{ label: "Siti web" }]} aside={<SitesWall />} pulseGold>
        <Button href="/contatti" size="lg" icon="calendar" iconPosition="start" pulse>
          Voglio il mio sito
        </Button>
        <Button href={p.portfolioCta.href} variant="secondary" size="lg" icon="arrow-right">
          Portfolio siti
        </Button>
      </PageHero>

      <Section id="percorso" labelledBy="percorso-title">
        <TechBackdrop tone="gold" rich />
        <SectionHeading id="percorso-title" overline="Come lo creiamo" title={p.processTitle} line={p.processLine} align="center" />
        <div className="mt-12 sm:mt-16">
          <MethodStack steps={p.steps} getLabel={p.getLabel} />
        </div>
      </Section>

      <SiteIncludes />

      <Section id="alcuni-siti" labelledBy="alcuni-siti-title">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading id="alcuni-siti-title" overline="Portfolio" title="Alcuni siti che [abbiamo creato]" line="Clicca su un sito per visitarlo." />
          <Reveal y={12} blur={0}>
            <Button href={p.portfolioCta.href} size="lg" variant="secondary" icon="arrow-right">
              {p.portfolioCta.label}
            </Button>
          </Reveal>
        </div>
        <RevealGroup className="mt-10 grid gap-5 md:grid-cols-3" stagger={0.1} alternate>
          {featured.map((item) => (
            <RevealItem key={item.id} y={24} className="h-full">
              <SiteCard item={item} />
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      <CtaBand content={site.cta.sites} />
    </>
  );
}
