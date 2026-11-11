import { site } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { Section, SectionHeading } from "@/components/ui/Section";
import { CountUp } from "@/components/motion/CountUp";
import { Reveal } from "@/components/motion/Reveal";
import { AiAdvantages } from "./AiAdvantages";
import { AiChat } from "./AiChat";
import { SectionGlow } from "@/components/ui/SectionGlow";
import { Icon, type IconName } from "@/components/ui/Icon";
import { LightRays } from "@/components/ui/LightRays";

/**
 * Irelia, l'assistente AI: a sinistra titolo, tre numeri, le due tendine (come funziona, vantaggi) e il pulsante;
 * a destra la chat dimostrativa.
 */
export function AiAgents() {
  const a = site.ai;
  return (
    <Section id="ai" labelledBy="ai-title" className="overflow-hidden">
      <SectionGlow />
      <LightRays x={78} y={48} size={46} />
      <div className="grid items-center gap-x-14 gap-y-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
        <div className="min-w-0">
          <SectionHeading id="ai-title" overline={a.overline} title={a.title} line={a.line} />


          <Reveal y={12} blur={0} delay={0.2}>
            <dl className="mt-7 grid max-w-xl grid-cols-3 gap-3">
              {a.console.stats.map((s, k) => (
                <div key={s.label} className="gl-card flex flex-col rounded-2xl px-3.5 py-3.5">
                  <dd className="flex items-center gap-2 font-display text-[clamp(1.5rem,1.1rem+1.4vw,2.25rem)] font-bold leading-none tracking-[-0.045em]">
                    <Icon name={(["zap", "clock", "users"] as IconName[])[k]!} className="h-6 w-6 shrink-0 text-gold-300" strokeWidth={1.8} />
                    <CountUp {...s} className="text-gold" />
                  </dd>
                  <dt className="mt-1.5 text-[0.8125rem] text-fg-2">{s.label}</dt>
                </div>
              ))}
            </dl>
          </Reveal>
          <Reveal y={12} blur={0} delay={0.25} className="mt-6 max-w-xl">
            <AiAdvantages />
          </Reveal>
          <Reveal y={12} blur={0} delay={0.3} className="mt-6">
            <Button href={a.cta.href} size="md" icon="bot" iconPosition="start" pulse>
              {a.cta.label}
            </Button>
          </Reveal>
        </div>
        <Reveal className="min-w-0" from="right" blur={0}>
          <AiChat />
        </Reveal>
      </div>
    </Section>
  );
}
