import { site } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Section, SectionHeading } from "@/components/ui/Section";
import { TechBackdrop } from "@/components/ui/TechBackdrop";
import { CountUp } from "@/components/motion/CountUp";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { AgentConsole } from "./AgentConsole";

/**
 * "Delega il lavoro agli agenti AI": a sinistra cosa fa l'agente (4 punti che entrano dai lati) e tre numeri,
 * a destra la console dal vivo con le attività che si completano da sole.
 */
export function AiAgents() {
  const a = site.ai;
  return (
    <Section id="ai" labelledBy="ai-title" className="overflow-hidden">
      <TechBackdrop tone="azure" cursor rich />
      <div aria-hidden="true" className="ai-aurora pointer-events-none absolute right-[-10%] top-1/2 -z-10 h-[44rem] w-[44rem] -translate-y-1/2 rounded-full" />
      <div className="grid items-center gap-x-14 gap-y-12 lg:grid-cols-12">
        <div className="min-w-0 lg:col-span-6">
          <SectionHeading id="ai-title" overline={a.overline} title={a.title} line={a.line} />
          <RevealGroup className="mt-9 grid gap-3 sm:grid-cols-2" stagger={0.1} alternate>
            {a.points.map((p) => (
              <RevealItem key={p.title} y={20} className="h-full">
                <div className="group/ai flex h-full gap-3.5 rounded-2xl border border-azure-300/25 bg-night/50 p-4 transition-[border-color,box-shadow] duration-[var(--dur-base)] hover:border-azure-300/70 hover:shadow-[0_0_36px_-12px_rgb(42_144_195/0.7)]">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-azure-300/50 bg-azure-300/10 text-azure-300 transition-transform duration-[var(--dur-base)] group-hover/ai:scale-110">
                    <Icon name={p.icon} className="h-5 w-5" strokeWidth={1.7} />
                  </span>
                  <div className="min-w-0">
                    <h3 className="font-display text-[1rem] font-bold leading-tight text-fg">{p.title}</h3>
                    <p className="mt-1 text-[0.875rem] leading-snug text-fg-2">{p.text}</p>
                  </div>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>

          <Reveal y={16} blur={0} delay={0.2}>
            <dl className="mt-8 grid grid-cols-3 border-y border-line py-5">
              {a.console.stats.map((s, i) => (
                <div key={s.label} className={i > 0 ? "border-l border-line pl-4 sm:pl-6" : "pr-2"}>
                  <dd className="font-display text-[clamp(1.625rem,1.2rem+1.6vw,2.5rem)] font-bold leading-none tracking-[-0.04em]">
                    <CountUp {...s} className="text-gold" />
                  </dd>
                  <dt className="mt-1.5 text-[0.8125rem] leading-snug text-fg-2">{s.label}</dt>
                </div>
              ))}
            </dl>
            <p className="mt-4 flex items-center gap-2 text-small text-fg-3">
              <Icon name="sparkles" className="h-4 w-4 text-gold-300" />
              {a.example}
            </p>
            <div className="mt-7">
              <Button href={a.cta.href} size="lg" icon="bot" iconPosition="start" pulse>
                {a.cta.label}
              </Button>
            </div>
          </Reveal>
        </div>

        <Reveal className="min-w-0 lg:col-span-6" from="right" blur={0}>
          <div className="relative mx-auto max-w-xl">
            <span aria-hidden="true" className="btn-halo pointer-events-none absolute -inset-6 rounded-[2.5rem] bg-azure-400/20 blur-3xl" />
            <AgentConsole />
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
