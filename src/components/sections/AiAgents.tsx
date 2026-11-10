import { site } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Section, SectionHeading } from "@/components/ui/Section";
import { CountUp } from "@/components/motion/CountUp";
import { Reveal } from "@/components/motion/Reveal";
import { AgentConsole } from "./AgentConsole";

/**
 * Agenti AI, compatto: titolo breve, quattro "chip" di cosa fa, tre numeri, un pulsante; a destra la console dal vivo.
 * Sfondo diverso dal resto: blu profondo con linee orizzontali che scorrono (scanline).
 */
export function AiAgents() {
  const a = site.ai;
  return (
    <Section id="ai" labelledBy="ai-title" className="ai-section overflow-hidden">
      <div aria-hidden="true" className="ai-bg absolute inset-0 -z-10" />
      <div className="grid items-center gap-x-14 gap-y-10 lg:grid-cols-2">
        <div className="min-w-0">
          <SectionHeading id="ai-title" overline={a.overline} title={a.title} line={a.line} />
          <Reveal y={14} blur={0} delay={0.1}>
            <ul className="mt-6 flex flex-wrap gap-2">
              {a.chips.map((c) => (
                <li key={c.text} className="inline-flex items-center gap-2 rounded-full border border-azure-300/30 bg-azure-300/[0.06] py-1.5 pl-1.5 pr-3 text-[0.8125rem] font-medium text-fg">
                  <span className="grid h-6 w-6 place-items-center rounded-full bg-azure-300/15 text-azure-300">
                    <Icon name={c.icon} className="h-3.5 w-3.5" strokeWidth={2} />
                  </span>
                  {c.text}
                </li>
              ))}
            </ul>
            <dl className="mt-7 grid max-w-md grid-cols-3 divide-x divide-white/10 border-y border-white/10 py-4">
              {a.console.stats.map((s) => (
                <div key={s.label} className="px-3 first:pl-0">
                  <dd className="font-display text-[1.75rem] font-bold leading-none tracking-[-0.04em]">
                    <CountUp {...s} className="text-gold" />
                  </dd>
                  <dt className="mt-1 text-[0.6875rem] text-fg-3">{s.label}</dt>
                </div>
              ))}
            </dl>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button href={a.cta.href} size="md" icon="bot" iconPosition="start">
                {a.cta.label}
              </Button>
            </div>
          </Reveal>
        </div>
        <Reveal className="min-w-0" from="right" blur={0}>
          <div className="relative mx-auto max-w-md">
            <AgentConsole />
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
