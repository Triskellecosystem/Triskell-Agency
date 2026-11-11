import type { Metadata } from "next";
import { CtaBand } from "@/components/sections/CtaBand";
import { NumbersWall } from "@/components/sections/NumbersWall";
import { PageHero } from "@/components/sections/PageHero";
import { ClientVideo } from "@/components/sections/ClientVideo";
import { CaseCard, NextCaseCard } from "@/components/sections/CaseCard";
import { Section } from "@/components/ui/Section";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { site } from "@/content/site";
import { SectionBg } from "@/components/ui/SectionBg";
import { PerspectiveRoom } from "@/components/ui/PerspectiveRoom";

export const metadata: Metadata = {
  title: "Risultati",
  description: "Clienti reali, numeri reali: lead, prenotazioni e fatturato ottenuti con Triskell Agency.",
  alternates: { canonical: "/risultati" },
};

export default function PortfolioPage() {
  const { portfolio, results } = site;
  return (
    <>
      <PageHero overline={portfolio.overline} title={portfolio.title} line={portfolio.line} crumbs={[{ label: "Risultati" }]} aside={<ClientVideo />} backdrop={<PerspectiveRoom x={66} y={40} />} />
      <div className="container-x"><span aria-hidden="true" className="sec-line block h-px" /></div>
      <NumbersWall />
      <Section id="progetti" labelledBy="progetti-title" className="pt-[clamp(1rem,2vw,2rem)]">
        <SectionBg kind="isogrid" />
        <h2 id="progetti-title" className="sr-only">
          {portfolio.title.replace(/[[\]]/g, "")}
        </h2>
        <RevealGroup className="grid gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" stagger={0.1}>
          {results.items.map((item, i) => (
            // la prima riga non usa il reveal (parte opaca): così la foto è subito il candidato LCP
            i < 4 ? (
              <div key={item.id} className="h-full">
                <CaseCard item={item} priority />
              </div>
            ) : (
              <RevealItem key={item.id} y={30} className="h-full">
                <CaseCard item={item} />
              </RevealItem>
            )
          ))}
          <RevealItem y={30} className="h-full lg:col-span-2 xl:col-span-1">
            <NextCaseCard />
          </RevealItem>
        </RevealGroup>
      </Section>
      <CtaBand content={site.cta.results} />
    </>
  );
}
