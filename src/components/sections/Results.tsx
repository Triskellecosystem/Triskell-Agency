import { site } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { Section, SectionHeading } from "@/components/ui/Section";
import { TechBackdrop } from "@/components/ui/TechBackdrop";
import { Reveal } from "@/components/motion/Reveal";
import { CaseGrid } from "./CaseGrid";

/** Clienti reali, numeri reali: tutti i casi in una griglia compatta, con il link a tutti i risultati. */
export function Results() {
  const { results } = site;
  return (
    <Section id={results.id} labelledBy="results-title">
      <TechBackdrop tone="azure" cursor rich />
      <div className="flex flex-wrap items-end justify-between gap-5">
        <SectionHeading id="results-title" overline={results.overline} title={results.title} line={results.line} />
        <Reveal y={12} blur={0}>
          <Button href={results.all.href} size="md" icon="arrow-right" variant="secondary">
            {results.all.label}
          </Button>
        </Reveal>
      </div>
      <Reveal y={24} blur={0} className="mt-9">
        <CaseGrid />
      </Reveal>
    </Section>
  );
}
