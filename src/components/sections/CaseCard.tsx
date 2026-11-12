"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { site, type CaseStudy } from "@/content/site";
import { cn } from "@/lib/cn";
import { BeamCard } from "@/components/ui/BeamCard";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { CountUp } from "@/components/motion/CountUp";

const CaseModal = dynamic(() => import("./CaseModal").then((m) => m.CaseModal), { ssr: false });

/** Case study: copertina con icona e tag, due numeri grandi, una riga di sintesi. */
export function CaseCard({ item, priority = false }: { item: CaseStudy; href?: string; priority?: boolean }) {
  const [open, setOpen] = useState(false);
  return (
    <>
    <article id={item.id} className="gl-card group/case relative flex h-full scroll-mt-28 flex-col overflow-hidden rounded-[1.25rem] transition-transform duration-[var(--dur-base)] ease-out-expo hover:-translate-y-1">
      <div className="relative h-32 overflow-hidden bg-night">
        <Image
          src={item.image}
          alt={`${item.client}: immagine del progetto`}
          fill
          priority={priority}
          sizes="(min-width: 1280px) 20rem, (min-width: 640px) 45vw, 92vw"
          className="object-cover transition-transform duration-[900ms] ease-out-expo group-hover/case:scale-[1.07]"
        />
        <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-night/85 via-night/10 to-transparent" />
        <span className="absolute bottom-2.5 left-3 inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-night/75 px-2 py-0.5 text-[0.625rem] font-semibold uppercase tracking-wider text-fg backdrop-blur">
          <Icon name={item.icon} className="h-3.5 w-3.5 text-gold-300" />
          {item.tag}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <p className="truncate text-[0.6875rem] font-medium text-fg-2">
          {item.sector} · {item.place}
        </p>
        <h3 className="mt-0.5 truncate font-display text-[1.0625rem] font-semibold leading-tight tracking-tight text-fg">{item.client}</h3>

        <dl className="mt-3 grid grid-cols-2 gap-2 border-t border-white/10 pt-3">
          {item.stats.map((st) => (
            <div key={st.label}>
              <dd className="order-1 truncate font-display text-[1.25rem] font-bold leading-none tracking-[-0.03em] text-azure-300">{st.value}</dd>
              <dt className="mt-1 text-[0.5625rem] font-semibold uppercase leading-tight tracking-wider text-fg-2">{st.label}</dt>
            </div>
          ))}
        </dl>


        <button type="button" onClick={() => setOpen(true)} aria-haspopup="dialog" className="case-open mt-auto inline-flex w-fit items-center gap-1.5 pt-3 text-[0.8125rem] font-semibold text-gold-300 transition-colors hover:text-gold-100">
          {site.portfolio.open}
          <Icon name="arrow-right" className="h-4 w-4" />
        </button>
      </div>
    </article>
    {open && <CaseModal item={item} onClose={() => setOpen(false)} />}
    </>
  );
}

/** "Il prossimo potrebbe essere il tuo": la card che deve attirare subito l'occhio (bordo oro rotante, alone, pulsazione). */
export function NextCaseCard({ className, compact }: { className?: string; compact?: boolean }) {
  const n = site.portfolio.next;
  return (
    <div className={cn("next-blink relative h-full", className)}>
      <span aria-hidden="true" className="btn-halo pointer-events-none absolute -inset-3 rounded-[2rem] bg-gold-300/25 blur-2xl" />
      <BeamCard className="relative h-full">
        <div className={cn("relative flex h-full flex-col justify-between overflow-hidden rounded-[inherit] bg-[linear-gradient(160deg,var(--color-cobalt-600),var(--color-surface-2)_55%,var(--color-night-glow))]", compact ? "p-4" : "p-6 sm:p-7")}>
          <div aria-hidden="true" className="bg-grid absolute inset-0 opacity-40 [mask-image:radial-gradient(80%_70%_at_50%_30%,#000,transparent)]" />
          <div aria-hidden="true" className="pointer-events-none absolute -right-12 -top-12 h-52 w-52 rounded-full bg-[radial-gradient(circle,rgb(247_200_92/0.35),transparent_68%)]" />
          <div className="relative">
            <p className={cn("text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-gold-300", !compact && "mt-5")}>{n.overline}</p>
            <h3 className={cn("mt-2 font-display font-bold leading-[1.08] tracking-[-0.03em] text-fg", compact ? "text-[1.25rem]" : "text-[clamp(1.625rem,1.3rem+1vw,2.25rem)]")}>{n.title}</h3>

            <dl className={cn("grid grid-cols-2 gap-4 border-y border-gold-400/30", compact ? "mt-3 py-2.5" : "mt-6 py-4")}>
              {n.stats.map((st) => (
                <div key={st.label}>
                  <dd>
                    <CountUp {...st} className={cn("text-gold font-display font-bold leading-none tracking-[-0.04em]", compact ? "text-[1.5rem]" : "text-[clamp(1.75rem,1.4rem+1.2vw,2.5rem)]")} />
                  </dd>
                  <dt className="mt-1.5 text-[0.6875rem] font-semibold uppercase tracking-wider text-fg-2">{st.label}</dt>
                </div>
              ))}
            </dl>
          </div>
          <div className={cn("relative flex flex-col items-start", compact ? "mt-3 gap-2" : "mt-6 gap-3")}>
            <Button href={n.primary.href} size={compact ? "sm" : "md"} icon="arrow-right" pulse>
              {n.primary.label}
            </Button>
            <Link href={n.secondary.href} className="inline-flex items-center gap-2 text-small font-semibold text-fg transition-colors hover:text-gold-200">
              {n.secondary.label}
              <Icon name="arrow-right" className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </BeamCard>
    </div>
  );
}
