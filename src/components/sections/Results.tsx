import { site } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Section, SectionHeading } from "@/components/ui/Section";
import { TechBackdrop } from "@/components/ui/TechBackdrop";
import { CountUp } from "@/components/motion/CountUp";
import { Reveal } from "@/components/motion/Reveal";
import { CaseGrid } from "./CaseGrid";

/** Clienti reali, numeri reali: tutti i casi in una griglia compatta, con il link a tutti i risultati. */
export function Results() {
  const { results } = site;
  return (
    <Section id={results.id} labelledBy="results-title">
      <TechBackdrop tone="azure" cursor rich />
      <div aria-hidden="true" className="res-hands pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <Icon name="handshake-2" className="res-hands-ico absolute right-[34%] top-[18rem] h-[16rem] w-[16rem] -translate-y-1/2 translate-x-1/2" strokeWidth={0.5} />
        <span className="absolute right-[34%] top-[18rem] h-[16rem] w-[30rem] -translate-y-1/2 translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(247_200_92/0.12),transparent)]" />
      </div>
      <div className="flex flex-wrap items-end justify-between gap-5">
        <SectionHeading id="results-title" overline={results.overline} title={results.title} line={results.line} />
        <Reveal y={12} blur={0}>
          <Button href={results.all.href} size="md" icon="arrow-right" variant="secondary">
            {results.all.label}
          </Button>
        </Reveal>
      </div>
      <Reveal y={16} blur={0} className="mt-8">
        <dl className="res-counters grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.06] md:grid-cols-4">
          {results.counters.map((c) => (
            <div key={c.label} className="res-cell relative overflow-hidden bg-[rgb(6_20_34/0.95)] px-4 py-5" style={{ "--i": results.counters.indexOf(c) } as React.CSSProperties}>
              <span aria-hidden="true" className="res-burst" />
              <dd className="res-num relative font-display text-[clamp(1.75rem,1.3rem+1.6vw,2.75rem)] font-bold leading-none tracking-[-0.04em]">
                <CountUp {...c} className="text-gold" duration={2.4} />
              </dd>
              <dt className="mt-1.5 text-[0.6875rem] font-medium text-fg-3">{c.label}</dt>
              <span aria-hidden="true" className="res-bar absolute inset-x-4 bottom-0 h-[2px] origin-left bg-gradient-to-r from-gold-400 to-azure-300" />
            </div>
          ))}
        </dl>
      </Reveal>
      <Reveal y={24} blur={0} className="mt-4">
        <CaseGrid />
      </Reveal>
    </Section>
  );
}
