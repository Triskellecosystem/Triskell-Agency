import type { Metadata } from "next";
import { PerspectiveBg } from "@/components/ui/PerspectiveBg";
import { CtaBand } from "@/components/sections/CtaBand";
import { PageHero } from "@/components/sections/PageHero";
import { SiteCard } from "@/components/sections/SiteCard";
import { SiteIncludes } from "@/components/sections/SiteIncludes";
import { StepRail } from "@/components/sections/StepRail";
import { SitesWall } from "@/components/sections/WebsitesTeaser";
import { Button } from "@/components/ui/Button";
import { Section, SectionHeading } from "@/components/ui/Section";
import { TechBackdrop } from "@/components/ui/TechBackdrop";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Siti web",
  description: "Come creiamo il tuo sito: call iniziale, stile scelto insieme, struttura e testi, prima versione, revisioni, pubblicazione e assistenza.",
  alternates: { canonical: "/siti-web" },
};

export default function SitesPage() {
  const p = site.sitiProcess;
  const featured = site.sitiWeb.featured.flatMap((id) => site.sitiWeb.items.filter((i) => i.id === id));
  return (
    <>
      <PageHero overline={p.overline} title={p.title} line={p.line} crumbs={[{ label: "Siti web" }]}>
        <Button href="/contatti" size="md" icon="calendar" iconPosition="start" pulse>
          Voglio il mio sito
        </Button>
        <Button href={p.portfolioCta.href} variant="secondary" size="md" icon="arrow-right">
          Portfolio siti
        </Button>
      </PageHero>

      <div className="container-x -mt-4">
        <Reveal y={20} blur={0}>
          <SitesWall className="h-[24rem] sm:h-[32rem] lg:h-[38rem]" />
        </Reveal>
      </div>

      <Section id="percorso" labelledBy="percorso-title">
        <PerspectiveBg variant="floor" />
        <TechBackdrop tone="gold" rich />
        <SectionHeading id="percorso-title" overline="Come lo creiamo" title={p.processTitle} line={p.processLine} align="center" />
        <Reveal y={16} blur={0} className="mt-12">
          <StepRail steps={p.steps} />
        </Reveal>
      </Section>

      <SiteIncludes />

      <Section id="alcuni-siti" labelledBy="alcuni-siti-title">
        <div className="flex flex-wrap items-end justify-between gap-5">
          <SectionHeading id="alcuni-siti-title" overline="Portfolio" title="Alcuni siti [realizzati]" />
          <Reveal y={12} blur={0}>
            <Button href={p.portfolioCta.href} size="md" variant="secondary" icon="arrow-right">
              {p.portfolioCta.label}
            </Button>
          </Reveal>
        </div>
        <RevealGroup className="mt-8 grid gap-4 md:grid-cols-3" stagger={0.1} alternate>
          {featured.map((item) => (
            <RevealItem key={item.id} y={20} className="h-full">
              <SiteCard item={item} />
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      <CtaBand content={site.cta.sites} />
    </>
  );
}
