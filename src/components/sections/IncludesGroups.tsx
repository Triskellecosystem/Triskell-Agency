import { site } from "@/content/site";
import { Icon } from "@/components/ui/Icon";
import { CountUp } from "@/components/motion/CountUp";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Spotlight } from "@/components/ui/Spotlight";
import { SectionBg } from "@/components/ui/SectionBg";

/** Cosa è incluso nella gestione social: sei gruppi, ventiquattro voci, con un contatore delle voci in alto. */
export function IncludesGroups() {
  const inc = site.social.includes;
  const total = inc.groups.reduce((n, g) => n + g.items.length, 0);
  return (
    <Section id="incluso" labelledBy="incluso-title" className="overflow-hidden">
      <SectionBg kind="isoblocks" />
      <div className="flex flex-wrap items-end justify-between gap-6">
        <SectionHeading id="incluso-title" overline={inc.overline} title={inc.title} line={inc.line} />
        <p className="font-display leading-none">
          <CountUp value={total} className="text-gold text-[clamp(2.5rem,2rem+2vw,3.5rem)] font-bold tracking-[-0.05em]" duration={1.6} />
          <span className="ml-2 text-[0.8125rem] font-semibold text-fg-2">attività incluse</span>
        </p>
      </div>
      <div data-inview-watch className="inc-fly-grid mt-8 grid gap-3 [perspective:1400px] sm:grid-cols-2 lg:grid-cols-3">
        {inc.groups.map((g, gi) => (
          <div key={g.title} className="inc-fly h-full" style={{ "--gi": gi } as React.CSSProperties}>
            <Spotlight className="inc-card h-full rounded-[1.125rem] border border-white/[0.08] bg-[linear-gradient(165deg,var(--color-surface-2),var(--color-night-raised))] p-4 transition-[border-color] duration-[var(--dur-base)] hover:border-gold-300/60" size={340}>
              <div className="relative z-[2]" style={{ "--gi": gi } as React.CSSProperties}>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2.5">
                    <span className="grid h-8 w-8 place-items-center rounded-lg bg-gold-300/10 text-gold-300">
                      <Icon name={g.icon} className="h-4 w-4" strokeWidth={1.9} />
                    </span>
                    <h3 className="font-display text-[1rem] font-bold tracking-tight text-fg">{g.title}</h3>
                  </span>
                  <span className="font-mono text-[0.6875rem] font-semibold text-fg-3">{String(gi + 1).padStart(2, "0")}</span>
                </div>
                <ul className="mt-3 space-y-1.5">
                  {g.items.map((it, k) => (
                    <li key={it} className="inc-li flex items-start gap-2 text-[0.8125rem] leading-snug text-fg-2" style={{ "--j": gi * 0.25 + k * 0.12 } as React.CSSProperties}>
                      <Icon name="check" className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold-300" strokeWidth={2.6} />
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            </Spotlight>
          </div>
        ))}
      </div>
    </Section>
  );
}
