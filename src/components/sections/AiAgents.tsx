import { site } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Section, SectionHeading } from "@/components/ui/Section";
import { CountUp } from "@/components/motion/CountUp";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { AiAdvantages } from "./AiAdvantages";
import { AiChat } from "./AiChat";

/**
 * Irelia, l'assistente AI: a sinistra titolo, tre garanzie, il flusso in sei passi collegati e tre numeri;
 * a destra la chat dimostrativa. Sotto, la tendina con tutti i vantaggi.
 */
export function AiAgents() {
  const a = site.ai;
  return (
    <Section id="ai" labelledBy="ai-title" className="overflow-hidden">
      <div aria-hidden="true" className="ai-bg absolute inset-0 -z-10" />
      <div className="grid items-center gap-x-14 gap-y-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
        <div className="min-w-0">
          <SectionHeading id="ai-title" overline={a.overline} title={a.title} line={a.line} />
          <Reveal y={10} blur={0} delay={0.1}>
            <ul className="mt-5 flex flex-wrap gap-2">
              {a.badges.map((b) => (
                <li key={b} className="inline-flex items-center gap-1.5 rounded-full border border-lime-300/35 bg-lime-300/[0.07] px-3 py-1 text-[0.75rem] font-semibold text-lime-300">
                  <span className="agent-live h-1.5 w-1.5 rounded-full bg-lime-300" />
                  {b}
                </li>
              ))}
            </ul>
          </Reveal>

          <RevealGroup className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-3" stagger={0.12}>
            {a.steps.map((s, i) => (
              <RevealItem key={s.title} y={12} className="relative">
                <div className="ai-step flex h-full items-center gap-2.5 rounded-xl border border-azure-300/25 bg-azure-300/[0.05] p-2.5" style={{ "--i": i } as React.CSSProperties}>
                  <span className="relative grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-azure-300/15 text-azure-300">
                    <Icon name={s.icon} className="h-4 w-4" strokeWidth={2} />
                    <span className="absolute -right-1.5 -top-1.5 grid h-4 w-4 place-items-center rounded-full bg-gold-300 font-mono text-[0.5625rem] font-bold text-night">{i + 1}</span>
                  </span>
                  <span className="min-w-0 leading-tight">
                    <span className="block font-display text-[0.8125rem] font-bold text-fg">{s.title}</span>
                    <span className="block text-[0.6875rem] text-fg-3">{s.text}</span>
                  </span>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>

          <Reveal y={12} blur={0} delay={0.2}>
            <dl className="mt-6 grid max-w-md grid-cols-3 divide-x divide-white/10 border-y border-white/10 py-4">
              {a.console.stats.map((s) => (
                <div key={s.label} className="px-3 first:pl-0">
                  <dd className="font-display text-[1.5rem] font-bold leading-none tracking-[-0.04em]">
                    <CountUp {...s} className="text-gold" />
                  </dd>
                  <dt className="mt-1 text-[0.6875rem] text-fg-3">{s.label}</dt>
                </div>
              ))}
            </dl>
            <div className="mt-6">
              <Button href={a.cta.href} size="md" icon="bot" iconPosition="start" pulse>
                {a.cta.label}
              </Button>
            </div>
          </Reveal>
        </div>
        <Reveal className="min-w-0" from="right" blur={0}>
          <AiChat />
        </Reveal>
      </div>
      <Reveal y={14} blur={0} className="mt-10">
        <AiAdvantages />
      </Reveal>
    </Section>
  );
}
