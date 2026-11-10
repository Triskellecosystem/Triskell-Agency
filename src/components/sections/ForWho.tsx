import { site } from "@/content/site";
import { Icon } from "@/components/ui/Icon";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Marquee } from "@/components/motion/Marquee";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";

/** "È per te se…": sei situazioni brevi in tessere piccole (icona + titolo), sotto i settori che scorrono. */
export function ForWho() {
  const f = site.forWho;
  return (
    <Section id="per-chi" labelledBy="per-chi-title" className="py-[clamp(2.5rem,1.6rem+2.6vw,4rem)]">
      <SectionHeading id="per-chi-title" overline={f.overline} title={f.title} align="center" />
      <RevealGroup className="mx-auto mt-8 grid max-w-5xl gap-2.5 max-md:grid-cols-2 md:grid-cols-3" stagger={0.06}>
        {f.items.map((it) => (
          <RevealItem key={it.title} y={14} className="h-full">
            <div className="group/fw flex h-full items-center gap-3 rounded-xl border border-white/[0.08] bg-white/[0.02] px-3 py-3 transition-[border-color,background-color] duration-[var(--dur-base)] hover:border-gold-300/50 hover:bg-gold-300/[0.04]">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-gold-300/10 text-gold-300 transition-transform duration-[var(--dur-base)] group-hover/fw:scale-110">
                <Icon name={it.icon} className="h-4 w-4" strokeWidth={1.9} />
              </span>
              <span className="text-[0.8125rem] font-semibold leading-snug text-fg sm:text-[0.875rem]">{it.title}</span>
            </div>
          </RevealItem>
        ))}
      </RevealGroup>
      <div className="mt-8">
        <Marquee items={f.sectors} label={f.sectorsLabel} className="fw-marquee" />
      </div>
    </Section>
  );
}
