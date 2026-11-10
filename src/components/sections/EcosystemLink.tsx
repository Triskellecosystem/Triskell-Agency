import Link from "next/link";
import { Stage3D } from "@/components/ui/Stage3D";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";
import { LogoMark } from "@/components/brand/LogoMark";
import { LogoTilt } from "@/components/brand/LogoTilt";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Section, SectionHeading } from "@/components/ui/Section";
import { TechBackdrop } from "@/components/ui/TechBackdrop";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";

/**
 * L'infrastruttura dietro l'agenzia: il simbolo Triskell al centro con anelli che pulsano e tre rami collegati
 * (Agency "sei qui", Academy, contenuti e community), più il pulsante verso il sito Triskell Ecosystem.
 */
export function EcosystemLink() {
  const e = site.ecosystem;
  const ext = (href: string) => (href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {});
  return (
    <Section id="ecosistema" labelledBy="eco-title" className="overflow-hidden">
        <Stage3D />
      <TechBackdrop tone="mixed" cursor rich />
      <SectionHeading id="eco-title" overline={e.overline} title={e.title} line={e.line} align="center" />

      <div className="relative mx-auto mt-10 max-w-4xl">
        <Reveal from="scale" blur={0} className="relative mx-auto grid w-fit place-items-center">
          <span aria-hidden="true" className="eco-ring" />
          <span aria-hidden="true" className="eco-ring eco-ring--b" />
          <LogoTilt className="relative" max={14}>
            <LogoMark size={104} sizes="104px" className="drop-shadow-[0_16px_40px_rgb(0_0_0/0.6)]" />
          </LogoTilt>
          <p className="mt-3 text-center font-display text-[0.8125rem] font-bold tracking-[0.22em] text-fg">{e.nodeLabel.toUpperCase()}</p>
        </Reveal>

        <span aria-hidden="true" className="grow-x mx-auto mt-6 hidden h-[3px] w-[70%] bg-gradient-to-r from-gold-300/0 via-gold-300/80 to-gold-300/0 md:block" />

        <RevealGroup className="mt-6 grid gap-4 md:grid-cols-3" stagger={0.12} alternate>
          {e.branches.map((b) => (
            <RevealItem key={b.name} y={24} className="h-full">
              <Link
                href={b.href}
                {...ext(b.href)}
                className={cn(
                  "group/eco relative flex h-full flex-col rounded-2xl border p-5 transition-[border-color,box-shadow,transform] duration-[var(--dur-base)] ease-out-expo hover:-translate-y-1",
                  b.here ? "border-gold-300/70 bg-[linear-gradient(160deg,var(--color-cobalt-600),var(--color-surface-2))] shadow-[0_0_40px_-14px_rgb(247_200_92/0.6)]" : "border-line bg-[linear-gradient(160deg,var(--color-surface-2),var(--color-surface))] hover:border-azure-300/60",
                )}
              >
                {b.here && <span className="absolute -top-3 left-6 rounded-full bg-[image:var(--gradient-gold-btn)] px-3 py-1 text-[0.6875rem] font-bold uppercase tracking-wider text-night">{e.here}</span>}
                <span className={cn("grid h-10 w-10 place-items-center rounded-xl border", b.here ? "border-gold-300/60 text-gold-300" : "border-azure-300/50 text-azure-300")}>
                  <Icon name={b.icon} className="h-5 w-5" strokeWidth={1.7} />
                </span>
                <h3 className="mt-3 flex items-center gap-2 font-display text-[1.0625rem] font-bold text-fg">
                  {b.name}
                  {!b.here && <Icon name="arrow-up-right" className="h-4 w-4 text-fg-3 transition-transform duration-[var(--dur-base)] group-hover/eco:-translate-y-0.5 group-hover/eco:translate-x-0.5 group-hover/eco:text-gold-300" />}
                </h3>
                <p className="mt-1 text-[0.8125rem] leading-snug text-fg-2">{b.text}</p>
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal className="mt-10 flex justify-center" y={14} blur={0}>
          <Button href={e.cta.href} size="lg" icon="arrow-up-right" target="_blank" rel="noopener noreferrer" pulse>
            {e.cta.label}
          </Button>
        </Reveal>
      </div>
    </Section>
  );
}
