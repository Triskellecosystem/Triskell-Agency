import { site } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { Section, SectionHeading } from "@/components/ui/Section";
import { TechBackdrop } from "@/components/ui/TechBackdrop";
import { Reveal } from "@/components/motion/Reveal";
import { CaseSpotlight } from "./CaseSpotlight";

/** Risultati sulla home: un cliente alla volta in vetrina, gli altri da scegliere a lato, link a tutti i risultati. */
export function Results() {
  const { results } = site;
  return (
    <Section id={results.id} labelledBy="results-title">
      <TechBackdrop tone="azure" cursor rich />
      <div className="flex flex-wrap items-end justify-between gap-6">
        <SectionHeading id="results-title" overline={results.overline} title={results.title} line={results.line} />
        <Reveal y={12} blur={0}>
          <Button href={results.all.href} size="lg" icon="arrow-right" variant="secondary">
            {results.all.label}
          </Button>
        </Reveal>
      </div>
      <Reveal y={30} blur={0} className="mt-10 sm:mt-12">
        <CaseSpotlight />
      </Reveal>
    </Section>
  );
}
