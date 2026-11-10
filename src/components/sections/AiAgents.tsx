import { site } from "@/content/site";
import { Stage3D } from "@/components/ui/Stage3D";
import { Button } from "@/components/ui/Button";
import { Section, SectionHeading } from "@/components/ui/Section";
import { CountUp } from "@/components/motion/CountUp";
import { Reveal } from "@/components/motion/Reveal";
import { AiAdvantages } from "./AiAdvantages";
import { AiChat } from "./AiChat";

/**
 * Irelia, l'assistente AI: a sinistra titolo, tre numeri, le due tendine (come funziona, vantaggi) e il pulsante;
 * a destra la chat dimostrativa.
 */
export function AiAgents() {
  const a = site.ai;
  return (
    <Section id="ai" labelledBy="ai-title" className="overflow-hidden">
      <div aria-hidden="true" className="ai-bg absolute inset-0 -z-10" />
      <Stage3D kind="room" tone="azure" view="right" />
      <div className="grid items-center gap-x-14 gap-y-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
        <div className="min-w-0">
          <SectionHeading id="ai-title" overline={a.overline} title={a.title} line={a.line} />


          <Reveal y={12} blur={0} delay={0.2}>
            <dl className="mt-7 grid max-w-lg grid-cols-3 divide-x divide-white/10 border-y border-white/10 py-5">
              {a.console.stats.map((s) => (
                <div key={s.label} className="px-3 first:pl-0">
                  <dd className="font-display text-[clamp(1.875rem,1.4rem+1.6vw,2.75rem)] font-bold leading-none tracking-[-0.045em]">
                    <CountUp {...s} className="text-gold" />
                  </dd>
                  <dt className="mt-1 text-[0.6875rem] text-fg-3">{s.label}</dt>
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
