import { site } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Section, SectionHeading } from "@/components/ui/Section";
import { CountUp } from "@/components/motion/CountUp";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { AiChat } from "./AiChat";

/**
 * Agenti AI, spiegati semplici: cosa fa in quattro passi collegati (scrive → risponde → prenota → ricorda),
 * tre numeri e il pulsante; a destra una chat dimostrativa in cui l'AI risponde di notte e prenota.
 */
export function AiAgents() {
  const a = site.ai;
  return (
    <Section id="ai" labelledBy="ai-title" className="overflow-hidden">
      <div aria-hidden="true" className="ai-bg absolute inset-0 -z-10" />
      <div className="grid items-center gap-x-14 gap-y-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
        <div className="min-w-0">
          <SectionHeading id="ai-title" overline={a.overline} title={a.title} line={a.line} />

          <RevealGroup className="ai-steps mt-7 grid grid-cols-2 gap-2 sm:grid-cols-4" stagger={0.14}>
            {a.steps.map((s, i) => (
              <RevealItem key={s.title} y={12} className="relative">
                <div className="flex h-full flex-col rounded-xl border border-azure-300/25 bg-azure-300/[0.05] p-3">
                  <span className="flex items-center justify-between">
                    <span className="grid h-8 w-8 place-items-center rounded-lg bg-azure-300/15 text-azure-300">
                      <Icon name={s.icon} className="h-4 w-4" strokeWidth={2} />
                    </span>
                    <span className="font-mono text-[0.625rem] font-bold text-fg-3">0{i + 1}</span>
                  </span>
                  <p className="mt-2.5 font-display text-[0.875rem] font-bold leading-tight text-fg">{s.title}</p>
                  <p className="mt-0.5 text-[0.6875rem] leading-snug text-fg-3">{s.text}</p>
                </div>
                {i < a.steps.length - 1 && <Icon name="chevron-right" className="ai-arrow absolute -right-2 top-1/2 z-[1] hidden h-4 w-4 -translate-y-1/2 text-gold-300 sm:block" strokeWidth={2.6} />}
              </RevealItem>
            ))}
          </RevealGroup>

          <Reveal y={12} blur={0} delay={0.2}>
            <dl className="mt-7 grid max-w-md grid-cols-3 divide-x divide-white/10 border-y border-white/10 py-4">
              {a.console.stats.map((s) => (
                <div key={s.label} className="px-3 first:pl-0">
                  <dd className="font-display text-[1.5rem] font-bold leading-none tracking-[-0.04em]">
                    <CountUp {...s} className="text-gold" />
                  </dd>
                  <dt className="mt-1 text-[0.6875rem] text-fg-3">{s.label}</dt>
                </div>
              ))}
            </dl>
            <div className="mt-7">
              <Button href={a.cta.href} size="md" icon="bot" iconPosition="start">
                {a.cta.label}
              </Button>
            </div>
          </Reveal>
        </div>
        <Reveal className="min-w-0" from="right" blur={0}>
          <AiChat />
        </Reveal>
      </div>
    </Section>
  );
}
