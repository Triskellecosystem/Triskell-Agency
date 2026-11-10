import { site } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { Icon, type IconName } from "@/components/ui/Icon";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import Image from "next/image";
import { cn } from "@/lib/cn";

const points = [
  { icon: "zap", text: "Veloci e perfetti sul telefono" },
  { icon: "target", text: "Costruiti per trasformare visite in contatti" },
  { icon: "messages", text: "Form, WhatsApp e tracciamento collegati" },
] as const;

/**
 * Muro di siti: le schermate vere in tre colonne che scorrono in verticale a velocità diverse (in versi opposti),
 * su un piano inclinato in 3D. Solo transform; con reduced motion resta fermo.
 */
export function SitesWall({ className }: { className?: string }) {
  const items = site.sitiWeb.items.filter((i) => !i.demo);
  const cols = [0, 1, 2, 3].map((c) => items.filter((_, i) => i % 4 === c));
  return (
    <div aria-hidden="true" className={cn("sw relative overflow-hidden rounded-[1.5rem]", className ?? "h-[26rem] sm:h-[34rem] lg:h-[40rem]")}>
      <div className="sw-plane absolute left-1/2 top-1/2 grid w-[118%] grid-cols-4 gap-4 max-md:w-[190%]">
        {cols.map((col, c) => (
          <div key={c} className={`sw-col sw-col--${c % 3} flex flex-col gap-4`}>
            {[...col, ...col, ...col, ...col].map((it, k) => (
              <div key={`${it.id}-${k}`} className="overflow-hidden rounded-xl border border-white/10 bg-night shadow-[0_20px_40px_-20px_rgb(0_0_0/0.9)]">
                <div className="flex items-center gap-1 border-b border-white/10 bg-surface-2 px-2 py-1.5">
                  <i className="h-1.5 w-1.5 rounded-full bg-ember-400/80" />
                  <i className="h-1.5 w-1.5 rounded-full bg-gold-300/80" />
                  <i className="h-1.5 w-1.5 rounded-full bg-lime-300/80" />
                  <span className="ml-1.5 truncate text-[0.5625rem] text-fg-3">{it.domain}</span>
                </div>
                <div className="relative aspect-[16/10]">
                  <Image src={it.image} alt="" fill sizes="22rem" className="object-cover object-top" />
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(85%_75%_at_50%_50%,transparent_55%,var(--color-night)_100%)]" />
      {[
        { icon: "zap", t: "98/100", s: "velocità", c: "left-[6%] top-[14%]" },
        { icon: "smartphone", t: "Mobile", s: "perfetto sul telefono", c: "right-[7%] top-[22%]" },
        { icon: "messages", t: "+ contatti", s: "form e WhatsApp", c: "left-[12%] bottom-[16%]" },
        { icon: "search", t: "SEO", s: "pronto per Google", c: "right-[12%] bottom-[12%]" },
      ].map((b, i) => (
        <div key={b.t} className={`sw-badge absolute z-10 flex items-center gap-2 rounded-xl border border-gold-300/40 bg-[rgb(5_20_34/0.85)] py-1.5 pl-1.5 pr-3 shadow-[0_14px_30px_-12px_rgb(0_0_0/0.9)] backdrop-blur-md max-sm:hidden ${b.c}`} style={{ animationDelay: `${i * -1.3}s` }}>
          <span className="grid h-7 w-7 place-items-center rounded-lg bg-[image:var(--gradient-gold-btn)] text-night">
            <Icon name={b.icon as IconName} className="h-3.5 w-3.5" strokeWidth={2.2} />
          </span>
          <span className="leading-tight">
            <span className="block font-display text-[0.8125rem] font-bold text-fg">{b.t}</span>
            <span className="block text-[0.625rem] text-fg-3">{b.s}</span>
          </span>
        </div>
      ))}
    </div>
  );
}

/** Siti web: titolo e pulsanti in alto, sotto il muro di siti a tutta larghezza (più grande, nessun taglio a sinistra). */
export function WebsitesTeaser() {
  const s = site.sitiWeb;
  return (
    <Section id="siti" labelledBy="siti-teaser-title" className="overflow-hidden">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <SectionHeading id="siti-teaser-title" overline="Siti web" title={s.title} line="Veloci, curati, pensati per farti contattare." />
        <Reveal y={12} blur={0}>
          <div className="flex flex-wrap gap-3">
            <Button href="/siti-web" size="md" icon="arrow-right">
              Come lo creiamo
            </Button>
            <Button href="/siti-web/portfolio" size="md" variant="secondary" icon="monitor" iconPosition="start">
              Portfolio siti
            </Button>
          </div>
        </Reveal>
      </div>
      <RevealGroup className="mt-6 flex flex-wrap gap-x-6 gap-y-2" stagger={0.08}>
        {points.map((p) => (
          <RevealItem key={p.text} y={8}>
            <p className="flex items-center gap-2 text-[0.8125rem] font-medium text-fg-2">
              <Icon name={p.icon} className="h-4 w-4 text-gold-300" strokeWidth={1.9} />
              {p.text}
            </p>
          </RevealItem>
        ))}
      </RevealGroup>
      <Reveal y={20} blur={0} className="mt-8">
        <SitesWall />
      </Reveal>
    </Section>
  );
}
