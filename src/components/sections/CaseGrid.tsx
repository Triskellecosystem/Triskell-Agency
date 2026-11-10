"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useState } from "react";
import { site, type CaseStudy } from "@/content/site";
import { Icon } from "@/components/ui/Icon";

const CaseModal = dynamic(() => import("./CaseModal").then((m) => m.CaseModal), { ssr: false });

/**
 * Clienti reali, tutti sulla stessa linea: tessere compatte con foto, cliente, due numeri e un clic per la scheda
 * completa. L'ultima tessera invita a diventare il prossimo caso. 4 colonne su computer, 2 sul telefono.
 */
export function CaseGrid({ limit }: { limit?: number }) {
  const items = limit ? site.results.items.slice(0, limit) : site.results.items;
  const [open, setOpen] = useState<CaseStudy | null>(null);
  return (
    <>
      <ul className="cg grid gap-3 max-md:grid-cols-2 md:grid-cols-4">
        {items.map((c, i) => (
          <li key={c.id} className="cg-item" style={{ "--i": i } as React.CSSProperties}>
            <button
              type="button"
              onClick={() => setOpen(c)}
              aria-haspopup="dialog"
              className="group/cg flex h-full w-full flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-[linear-gradient(170deg,var(--color-surface-2),var(--color-night-raised))] text-left transition-[border-color,transform,box-shadow] duration-[var(--dur-base)] ease-out-expo hover:-translate-y-1 hover:border-gold-300/60 hover:shadow-[0_0_36px_-12px_rgb(247_200_92/0.5)]"
            >
              <span className="relative block h-24 overflow-hidden sm:h-28">
                <Image src={c.image} alt="" fill sizes="(min-width: 768px) 18rem, 46vw" className="object-cover transition-transform duration-700 ease-out-expo group-hover/cg:scale-110" />
                <span className="absolute inset-0 bg-gradient-to-t from-night via-night/30 to-transparent" />
                <span className="absolute bottom-2 left-2.5 rounded-full bg-night/70 px-2 py-0.5 text-[0.5625rem] font-semibold uppercase tracking-wider text-gold-200 backdrop-blur">{c.tag}</span>
              </span>
              <span className="flex flex-1 flex-col p-3 sm:p-3.5">
                <span className="truncate font-display text-[0.9375rem] font-semibold text-fg">{c.client}</span>
                <span className="truncate text-[0.6875rem] text-fg-3">
                  {c.sector} · {c.place}
                </span>
                <span className="mt-3 grid grid-cols-2 gap-2 border-t border-white/[0.07] pt-2.5">
                  {c.stats.map((st, k) => (
                    <span key={st.label} className="min-w-0">
                      <span className={`block truncate font-display text-[1.0625rem] font-bold leading-none tracking-[-0.02em] sm:text-[1.25rem] ${k === 0 ? "text-gold" : "text-azure-300"}`}>{st.value}</span>
                      <span className="mt-1 block truncate text-[0.5625rem] font-semibold uppercase tracking-wider text-fg-3">{st.label}</span>
                    </span>
                  ))}
                </span>
                <span className="mt-auto flex items-center gap-1 pt-3 text-[0.75rem] font-semibold text-gold-300">
                  Case study
                  <Icon name="arrow-right" className="h-3.5 w-3.5 transition-transform group-hover/cg:translate-x-1" />
                </span>
              </span>
            </button>
          </li>
        ))}
        <li className="cg-item" style={{ "--i": items.length } as React.CSSProperties}>
          <Link href="/contatti" className="cg-next group/nx relative block h-full min-h-[14rem] overflow-hidden rounded-2xl p-[1.5px]">
            <span aria-hidden="true" className="cg-next-ring absolute inset-0 rounded-[inherit]" />
            <span className="relative flex h-full flex-col justify-between overflow-hidden rounded-[calc(1rem-1.5px)] bg-[radial-gradient(120%_90%_at_100%_0%,#5a440c,#1a1405_55%,var(--color-night))] p-4">
              <span aria-hidden="true" className="pointer-events-none absolute -right-6 -top-8 font-display text-[7rem] font-bold leading-none text-gold-300/10">8</span>
              <span className="relative">
                <span className="text-[0.625rem] font-bold uppercase tracking-[0.18em] text-gold-300">Prossimo caso studio</span>
                <span className="mt-2 block font-display text-[1.25rem] font-bold leading-[1.1] tracking-[-0.02em] text-fg">
                  La tua attività,
                  <br />
                  <span className="text-gold">qui tra 6 mesi.</span>
                </span>
              </span>
              <span className="relative">
                <span className="block text-[0.75rem] leading-snug text-fg-2">Contatti, prenotazioni e fatturato: partiamo da una call gratuita.</span>
                <span className="cta-btn mt-3 inline-flex items-center gap-1.5 rounded-full bg-[image:var(--gradient-gold-btn)] py-2 pl-3.5 pr-2 text-[0.8125rem] font-bold text-night">
                  Voglio essere il prossimo
                  <span className="grid h-6 w-6 place-items-center rounded-full bg-night text-gold-300">
                    <Icon name="arrow-right" className="h-3.5 w-3.5 transition-transform group-hover/nx:translate-x-0.5" />
                  </span>
                </span>
              </span>
            </span>
          </Link>
        </li>
      </ul>
      {open && <CaseModal item={open} onClose={() => setOpen(null)} />}
    </>
  );
}
