import { site } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Section, SectionHeading } from "@/components/ui/Section";
import { TechBackdrop } from "@/components/ui/TechBackdrop";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import Image from "next/image";

const points = [
  { icon: "zap", text: "Veloci e perfetti sul telefono" },
  { icon: "target", text: "Costruiti per trasformare visite in contatti" },
  { icon: "messages", text: "Form, WhatsApp e tracciamento collegati" },
] as const;

/**
 * Muro di siti: le schermate vere in tre colonne che scorrono in verticale a velocità diverse (in versi opposti),
 * su un piano inclinato in 3D. Solo transform; con reduced motion resta fermo.
 */
export function SitesWall() {
  const items = site.sitiWeb.items.filter((i) => !i.demo);
  const cols = [0, 1, 2].map((c) => items.filter((_, i) => i % 3 === c));
  return (
    <div aria-hidden="true" className="sw relative h-[30rem] overflow-hidden rounded-[1.75rem] sm:h-[36rem]">
      <div className="sw-plane absolute left-1/2 top-1/2 grid w-[145%] grid-cols-3 gap-4">
        {cols.map((col, c) => (
          <div key={c} className={`sw-col sw-col--${c} flex flex-col gap-4`}>
            {[...col, ...col, ...col, ...col].map((it, k) => (
              <div key={`${it.id}-${k}`} className="overflow-hidden rounded-xl border border-white/10 bg-night shadow-[0_20px_40px_-20px_rgb(0_0_0/0.9)]">
                <div className="flex items-center gap-1 border-b border-white/10 bg-surface-2 px-2 py-1.5">
                  <i className="h-1.5 w-1.5 rounded-full bg-ember-400/80" />
                  <i className="h-1.5 w-1.5 rounded-full bg-gold-300/80" />
                  <i className="h-1.5 w-1.5 rounded-full bg-lime-300/80" />
                  <span className="ml-1.5 truncate text-[0.5625rem] text-fg-3">{it.domain}</span>
                </div>
                <div className="relative aspect-[16/10]">
                  <Image src={it.image} alt="" fill sizes="16rem" className="object-cover object-top" />
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(85%_75%_at_50%_50%,transparent_55%,var(--color-night)_100%)]" />
    </div>
  );
}

/** Siti web: il muro di siti che si apre e mostra i siti veri, con tre promesse e il link alla vetrina completa. */
export function WebsitesTeaser() {
  const s = site.sitiWeb;
  return (
    <Section id="siti" labelledBy="siti-teaser-title" className="overflow-hidden">
      <TechBackdrop tone="azure" cursor />
      <div className="grid items-center gap-x-12 gap-y-12 lg:grid-cols-12">
        <div className="min-w-0 lg:col-span-5">
          <SectionHeading id="siti-teaser-title" overline={s.overline} title={s.title} line="Siti veloci e curati, costruiti per far diventare i visitatori clienti." />
          <RevealGroup className="mt-8 space-y-3" stagger={0.1} alternate>
            {points.map((p) => (
              <RevealItem key={p.text} y={10}>
                <p className="flex items-center gap-3 text-[1.0625rem] font-medium text-fg">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-gold-400/45 bg-gold-300/10 text-gold-300">
                    <Icon name={p.icon} className="h-5 w-5" strokeWidth={1.7} />
                  </span>
                  {p.text}
                </p>
              </RevealItem>
            ))}
          </RevealGroup>
          <Reveal className="mt-9" y={14} blur={0}>
            <div className="flex flex-wrap gap-3">
              <Button href="/siti-web" size="lg" icon="arrow-right">
                Come lo creiamo
              </Button>
              <Button href="/siti-web/portfolio" size="lg" variant="secondary" icon="monitor" iconPosition="start">
                Portfolio siti
              </Button>
            </div>
          </Reveal>
        </div>
        <div className="min-w-0 lg:col-span-7 lg:-mr-6">
          <SitesWall />
        </div>
      </div>
    </Section>
  );
}
