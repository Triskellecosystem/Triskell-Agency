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
    <article id={item.id} className="group/case relative flex h-full scroll-mt-28 flex-col overflow-hidden rounded-card border border-line bg-[linear-gradient(170deg,var(--color-surface-2),var(--color-night-raised))] transition-[border-color,box-shadow] duration-[var(--dur-base)] ease-out-expo hover:border-gold-300/60 hover:shadow-[0_0_40px_-12px_rgb(247_200_92/0.45)]">
      <div className="relative h-44 overflow-hidden bg-night max-md:h-32">
        <Image
          src={item.image}
          alt={`${item.client}: immagine del progetto`}
          fill
          priority={priority}
          sizes="(min-width: 1280px) 20rem, (min-width: 640px) 45vw, 92vw"
          className="object-cover transition-transform duration-[900ms] ease-out-expo group-hover/case:scale-[1.07]"
        />
        <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-night/85 via-night/10 to-transparent" />
        <span className="absolute bottom-3 left-4 inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-night/70 px-2.5 py-1 text-[0.6875rem] font-semibold uppercase tracking-wider text-fg backdrop-blur">
          <Icon name={item.icon} className="h-3.5 w-3.5 text-gold-300" />
          {item.tag}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5 max-md:p-4">
        <p className="text-[0.75rem] font-medium text-fg-2">
          {item.sector} · {item.place}
        </p>
        <h3 className="mt-1 font-display text-[1.25rem] font-semibold leading-tight tracking-tight text-fg">{item.client}</h3>

        <dl className="mt-4 grid grid-cols-2 gap-3 border-y border-line py-4 max-md:mt-3 max-md:py-3">
          {item.stats.map((st) => (
            <div key={st.label}>
              <dd className="order-1 font-display text-[1.5rem] font-bold leading-none tracking-[-0.03em] text-azure-300">{st.value}</dd>
              <dt className="mt-1.5 text-[0.6875rem] font-semibold uppercase leading-tight tracking-wider text-fg-2">{st.label}</dt>
            </div>
          ))}
        </dl>

        <p className="mt-4 flex-1 text-[0.9375rem] leading-snug text-fg-2 max-md:hidden">{item.text}</p>

        <button type="button" onClick={() => setOpen(true)} aria-haspopup="dialog" className="case-open mt-5 max-md:mt-auto max-md:pt-3 max-md:pb-1 inline-flex w-fit items-center gap-2 text-small font-semibold text-gold-300 transition-colors hover:text-gold-100">
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
export function NextCaseCard({ className }: { className?: string }) {
  const n = site.portfolio.next;
  return (
    <div className={cn("next-blink relative h-full", className)}>
      <span aria-hidden="true" className="btn-halo pointer-events-none absolute -inset-3 rounded-[2rem] bg-gold-300/25 blur-2xl" />
      <BeamCard className="relative h-full">
        <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-[inherit] bg-[linear-gradient(160deg,var(--color-cobalt-600),var(--color-surface-2)_55%,var(--color-night-glow))] p-6 sm:p-7">
          <div aria-hidden="true" className="bg-grid absolute inset-0 opacity-40 [mask-image:radial-gradient(80%_70%_at_50%_30%,#000,transparent)]" />
          <div aria-hidden="true" className="pointer-events-none absolute -right-12 -top-12 h-52 w-52 rounded-full bg-[radial-gradient(circle,rgb(247_200_92/0.35),transparent_68%)]" />
          <div className="relative">
            <p className="mt-5 text-[0.75rem] font-semibold uppercase tracking-[0.16em] text-gold-300">{n.overline}</p>
            <h3 className="mt-2 font-display text-[clamp(1.625rem,1.3rem+1vw,2.25rem)] font-bold leading-[1.08] tracking-[-0.03em] text-fg">{n.title}</h3>

            <dl className="mt-6 grid grid-cols-2 gap-4 border-y border-gold-400/30 py-4">
              {n.stats.map((st) => (
                <div key={st.label}>
                  <dd>
                    <CountUp {...st} className="text-gold font-display text-[clamp(1.75rem,1.4rem+1.2vw,2.5rem)] font-bold leading-none tracking-[-0.04em]" />
                  </dd>
                  <dt className="mt-1.5 text-[0.6875rem] font-semibold uppercase tracking-wider text-fg-2">{st.label}</dt>
                </div>
              ))}
            </dl>
          </div>
          <div className="relative mt-6 flex flex-col items-start gap-3">
            <Button href={n.primary.href} size="md" icon="arrow-right" pulse>
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
