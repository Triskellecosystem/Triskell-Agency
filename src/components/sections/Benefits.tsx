import { site } from "@/content/site";
import { cn } from "@/lib/cn";
import { BeamCard } from "@/components/ui/BeamCard";
import { Icon } from "@/components/ui/Icon";
import { Section, SectionHeading } from "@/components/ui/Section";
import { TechBackdrop } from "@/components/ui/TechBackdrop";
import { CountUp } from "@/components/motion/CountUp";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";

/**
 * Prima / dopo: a sinistra la situazione di oggi (spenta, voci barrate), a destra con Triskell (bordo oro rotante,
 * spunte che si accendono una dopo l'altra). Sotto, i tre vantaggi con il numero che cresce.
 */
export function Benefits() {
  const b = site.benefits;
  return (
    <Section id="vantaggi" labelledBy="vantaggi-title">
      <TechBackdrop tone="gold" rich />
      <SectionHeading id="vantaggi-title" overline={b.overline} title={b.title} line={b.line} align="center" />

      <div className="relative mx-auto mt-12 grid max-w-5xl items-stretch gap-5 sm:mt-14 md:grid-cols-2 md:gap-8">
        <span aria-hidden="true" className="ba-arrow absolute left-1/2 top-1/2 z-[3] hidden h-14 w-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-2 border-gold-300 bg-night text-gold-300 shadow-glow-gold md:grid">
          <Icon name="arrow-right" className="h-6 w-6" strokeWidth={2.2} />
        </span>

        <Reveal from="left" blur={0} className="h-full">
          <div className="h-full rounded-card border border-line bg-[linear-gradient(160deg,#0a1726,#060f19)] p-6 sm:p-8">
            <p className="inline-flex items-center gap-2 rounded-full border border-ember-400/40 bg-ember-400/10 px-3 py-1 text-[0.75rem] font-semibold uppercase tracking-wider text-ember-300">
              <Icon name="close" className="h-3.5 w-3.5" strokeWidth={2.6} />
              {b.before.label}
            </p>
            <ul className="mt-6 space-y-3.5">
              {b.before.items.map((it) => (
                <li key={it} className="flex items-start gap-3 text-[1.0625rem] leading-snug text-fg-3">
                  <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full border border-ember-400/40 text-ember-300">
                    <Icon name="close" className="h-3.5 w-3.5" strokeWidth={2.4} />
                  </span>
                  <span className="ba-strike">{it}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal from="right" blur={0} className="h-full">
          <BeamCard className="h-full">
            <div className="relative h-full overflow-hidden rounded-[inherit] bg-[linear-gradient(160deg,var(--color-cobalt-600),var(--color-surface-2)_55%,var(--color-night-glow))] p-6 sm:p-8">
              <div aria-hidden="true" className="pointer-events-none absolute -right-14 -top-14 h-56 w-56 rounded-full bg-[radial-gradient(circle,rgb(247_200_92/0.3),transparent_68%)]" />
              <p className="relative inline-flex items-center gap-2 rounded-full bg-[image:var(--gradient-gold-btn)] px-3 py-1 text-[0.75rem] font-bold uppercase tracking-wider text-night">
                <Icon name="sparkles" className="h-3.5 w-3.5" strokeWidth={2.2} />
                {b.after.label}
              </p>
              <ul className="relative mt-6 space-y-3.5">
                {b.after.items.map((it, i) => (
                  <li key={it} className="ba-good flex items-start gap-3 text-[1.0625rem] font-medium leading-snug text-fg" style={{ "--i": i } as React.CSSProperties}>
                    <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-gold-300 text-night shadow-glow-gold">
                      <Icon name="check" className="h-3.5 w-3.5" strokeWidth={3} />
                    </span>
                    {it}
                  </li>
                ))}
              </ul>
            </div>
          </BeamCard>
        </Reveal>
      </div>

      <RevealGroup className="mx-auto mt-10 grid max-w-5xl gap-4 sm:mt-12 md:grid-cols-3" stagger={0.12}>
        {b.impact.map((p) => (
          <RevealItem key={p.title} y={26} className="h-full">
            <div className={cn("group/imp flex h-full flex-col rounded-card border border-gold-400/30 bg-[linear-gradient(160deg,var(--color-surface-2),var(--color-surface))] p-6 text-center transition-[border-color,box-shadow] duration-[var(--dur-base)] hover:border-gold-300/70 hover:shadow-[0_0_40px_-12px_rgb(247_200_92/0.5)]")}>
              <span className="mx-auto grid h-12 w-12 place-items-center rounded-full border-2 border-gold-300 bg-night text-gold-300 shadow-glow-gold">
                <Icon name={p.icon} className="h-6 w-6" strokeWidth={1.7} />
              </span>
              <h3 className="mt-4 font-display text-[1.25rem] font-bold text-fg">{p.title}</h3>
              {p.stat && (
                <p className="mt-3 font-display text-[clamp(2rem,1.5rem+1.8vw,3rem)] font-bold leading-none tracking-[-0.04em]">
                  {p.stat.still ? (
                    <span className="text-gold">
                      {p.stat.prefix}
                      {p.stat.value}
                      {p.stat.suffix}
                    </span>
                  ) : (
                    <CountUp value={p.stat.value} prefix={p.stat.prefix} suffix={p.stat.suffix} className="text-gold" />
                  )}
                </p>
              )}
              {p.stat && <p className="mt-1.5 text-[0.75rem] font-semibold uppercase tracking-wider text-fg-3">{p.stat.label}</p>}
              <p className="mt-3 text-[0.9375rem] leading-snug text-fg-2">{p.text}</p>
            </div>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}
