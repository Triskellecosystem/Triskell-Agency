import type { Metadata } from "next";
import { CtaBand } from "@/components/sections/CtaBand";
import { LaptopShowcase } from "@/components/sections/LaptopShowcase";
import { PageHero } from "@/components/sections/PageHero";
import { SiteCard } from "@/components/sections/SiteCard";
import { Section } from "@/components/ui/Section";
import { TechBackdrop } from "@/components/ui/TechBackdrop";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Portfolio siti",
  description: "I siti web che creiamo: ristorazione, ospitalità, brand e software. Clicca per visitarli.",
  alternates: { canonical: "/siti-web/portfolio" },
};

export default function WebsitesPage() {
  const { sitiWeb: p } = site;
  return (
    <>
      <PageHero overline={p.overline} title={p.title} line={p.line} crumbs={[{ label: "Siti web", href: "/siti-web" }, { label: "Portfolio" }]} aside={<LaptopShowcase />} asideClassName="lg:-mr-6" />
      <Section id="siti" labelledBy="siti-title" className="pt-[clamp(1rem,2vw,2rem)]">
        <TechBackdrop tone="azure" cursor rich />
        <h2 id="siti-title" className="sr-only">
          {p.title.replace(/[[\]]/g, "")}
        </h2>
        <RevealGroup className="grid gap-5 max-md:grid-cols-2 max-md:gap-3 md:grid-cols-2 lg:grid-cols-3" stagger={0.08} alternate>
          {p.items.map((item, i) => (
            <RevealItem key={item.id} y={28} className="h-full">
              <SiteCard item={item} priority={i < 3} />
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>
      <CtaBand content={site.cta.sites} />
    </>
  );
}
