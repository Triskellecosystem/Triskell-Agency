import { site } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import Image from "next/image";
import { cn } from "@/lib/cn";
import { SitesMarquee } from "./SitesMarquee";
import { SectionBg } from "@/components/ui/SectionBg";

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
  const items = site.sitiWeb.items;
  // tre colonne della stessa lunghezza (i siti si ripetono a rotazione), così nessuna resta vuota
  const cols = [0, 1, 2].map((c) => items.filter((_, i) => i % 3 === c));
  return (
    <div aria-hidden="true" className={cn("sw relative overflow-hidden rounded-[1.5rem]", className ?? "h-[26rem] sm:h-[34rem] lg:h-[40rem]")}>
      <div className="sw-plane absolute left-1/2 top-0 grid items-start w-[100%] grid-cols-3 gap-5 [&>*]:min-w-0 max-md:w-[170%]">
        {cols.map((col, c) => (
          <div key={c} className={`sw-col sw-col--${c % 3} flex flex-col gap-4`}>
            {[...col, ...col, ...col].map((it, k) => (
              <div key={`${it.id}-${k}`} className="overflow-hidden rounded-xl border border-white/10 bg-night shadow-[0_20px_40px_-20px_rgb(0_0_0/0.9)]">
                <div className="flex items-center gap-1 border-b border-white/10 bg-surface-2 px-2 py-1.5">
                  <i className="h-1.5 w-1.5 rounded-full bg-ember-400/80" />
                  <i className="h-1.5 w-1.5 rounded-full bg-gold-300/80" />
                  <i className="h-1.5 w-1.5 rounded-full bg-lime-300/80" />
                  <span className="ml-1.5 truncate text-[0.5625rem] text-fg-3">{it.domain}</span>
                </div>
                <div className="relative aspect-[16/10]">
                  <Image src={it.image} alt="" fill sizes="28rem" className="object-cover object-top" />
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(95%_85%_at_50%_50%,transparent_70%,rgb(1_15_28/0.7)_100%)]" />
    </div>
  );
}

/** Siti web: titolo e pulsanti in alto, sotto il muro di siti a tutta larghezza (più grande, nessun taglio a sinistra). */
export function WebsitesTeaser() {
  const s = site.sitiWeb;
  return (
    <Section id="siti" labelledBy="siti-teaser-title" className="overflow-hidden">
      <SectionBg kind="isoblocks" />
      <div className="flex flex-wrap items-end justify-between gap-6">
        <SectionHeading id="siti-teaser-title" overline="Siti web" title={s.title} line="Veloci, curati, pensati per farti contattare." />
        <Reveal y={12} blur={0}>
          <div className="flex flex-wrap gap-3">
            <Button href="/siti-web" size="md" icon="arrow-right">
              Come lo creiamo
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
        <SitesMarquee />
      </Reveal>
    </Section>
  );
}
