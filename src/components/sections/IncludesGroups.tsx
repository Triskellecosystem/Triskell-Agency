import { site } from "@/content/site";
import { Icon } from "@/components/ui/Icon";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Spotlight } from "@/components/ui/Spotlight";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";

/** Cosa è incluso nella gestione social: sei gruppi, ventiquattro voci, con un contatore delle voci in alto. */
export function IncludesGroups() {
  const inc = site.social.includes;
  const total = inc.groups.reduce((n, g) => n + g.items.length, 0);
  return (
    <Section id="incluso" labelledBy="incluso-title">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <SectionHeading id="incluso-title" overline={inc.overline} title={inc.title} line={inc.line} />
        <p className="font-display leading-none">
          <span className="text-gold text-[clamp(3.5rem,2.5rem+4vw,6rem)] font-bold tracking-[-0.06em]">{total}</span>
          <span className="ml-2 text-[1rem] font-semibold text-fg-2">cose di cui ci occupiamo</span>
        </p>
      </div>
      <RevealGroup className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" stagger={0.08} alternate>
        {inc.groups.map((g, gi) => (
          <RevealItem key={g.title} y={24} className="h-full">
            <Spotlight className="h-full rounded-[1.5rem] border border-line bg-[linear-gradient(165deg,var(--color-surface-2),var(--color-night-raised))] p-6 transition-[border-color] duration-[var(--dur-base)] hover:border-gold-300/60" size={340}>
              <div className="relative z-[2]">
                <div className="flex items-center justify-between">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl border border-gold-400/45 bg-gold-300/10 text-gold-300">
                    <Icon name={g.icon} className="h-6 w-6" strokeWidth={1.6} />
                  </span>
                  <span className="font-mono text-[0.8125rem] font-semibold text-fg-3">{String(gi + 1).padStart(2, "0")}</span>
                </div>
                <h3 className="mt-4 font-display text-[1.375rem] font-bold tracking-tight text-fg">{g.title}</h3>
                <ul className="mt-4 space-y-2.5">
                  {g.items.map((it) => (
                    <li key={it} className="flex items-start gap-2.5 text-[0.9375rem] leading-snug text-fg-2">
                      <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-gold-300" strokeWidth={2.6} />
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            </Spotlight>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}
