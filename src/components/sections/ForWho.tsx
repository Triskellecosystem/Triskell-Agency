import { site } from "@/content/site";
import { Icon } from "@/components/ui/Icon";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Marquee } from "@/components/motion/Marquee";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";

/** "È per te se…": sei situazioni in cui il cliente si riconosce, che arrivano da fuori schermo; sotto, i settori che scorrono. */
export function ForWho() {
  const f = site.forWho;
  return (
    <Section id="per-chi" labelledBy="per-chi-title">
      <SectionHeading id="per-chi-title" overline={f.overline} title={f.title} line={f.line} />
      <RevealGroup className="mt-10 grid gap-4 max-md:gap-3 sm:mt-12 md:grid-cols-2 lg:grid-cols-3" stagger={0.08} alternate="far">
        {f.items.map((it, i) => (
          <RevealItem key={it.title} y={0} className="h-full">
            <div className="fw-card group/fw relative flex h-full items-start gap-4 overflow-hidden rounded-card border border-line bg-[linear-gradient(160deg,var(--color-surface-2),var(--color-surface))] p-6 transition-[border-color,box-shadow,transform] duration-[var(--dur-base)] ease-out-expo hover:-translate-y-1 hover:border-gold-300/70 hover:shadow-[0_0_40px_-12px_rgb(247_200_92/0.5)] max-md:p-4">
              <span aria-hidden="true" className="pointer-events-none absolute -right-3 -top-6 font-display text-[6rem] font-bold leading-none text-fg/[0.04] transition-colors duration-500 group-hover/fw:text-gold-300/10">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="relative grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-gold-400/45 bg-gold-300/10 text-gold-300 transition-transform duration-[var(--dur-base)] ease-out-expo group-hover/fw:scale-110 group-hover/fw:rotate-[-6deg] max-md:h-10 max-md:w-10">
                <Icon name={it.icon} className="h-6 w-6 max-md:h-5 max-md:w-5" strokeWidth={1.6} />
              </span>
              <div className="relative min-w-0">
                <h3 className="flex items-center gap-2 font-display text-[1.1875rem] font-bold leading-tight tracking-tight text-fg max-md:text-[1rem]">
                  <Icon name="check" className="h-4 w-4 shrink-0 text-gold-300" strokeWidth={2.6} />
                  {it.title}
                </h3>
                <p className="mt-1.5 text-[0.9375rem] leading-snug text-fg-2">{it.text}</p>
              </div>
            </div>
          </RevealItem>
        ))}
      </RevealGroup>

      <div className="mt-10 sm:mt-12">
        <p className="mb-4 text-center text-overline font-semibold uppercase tracking-[var(--text-overline--letter-spacing)] text-fg-3">{f.sectorsLabel}</p>
        <Marquee items={f.sectors} label={f.sectorsLabel} />
      </div>
    </Section>
  );
}
