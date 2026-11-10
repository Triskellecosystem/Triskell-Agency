"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import { useState } from "react";
import { site, type CaseStudy } from "@/content/site";
import { Icon } from "@/components/ui/Icon";
import { NextCaseCard } from "./CaseCard";

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
      <ul className="cg grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((c, i) => (
          <li key={c.id} className="cg-item" style={{ "--i": i } as React.CSSProperties}>
            <button
              type="button"
              onClick={() => setOpen(c)}
              aria-haspopup="dialog"
              className="group/cg flex h-full w-full flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-[linear-gradient(170deg,var(--color-surface-2),var(--color-night-raised))] text-left transition-[border-color,transform,box-shadow] duration-[var(--dur-base)] ease-out-expo hover:-translate-y-1 hover:border-gold-300/60 hover:shadow-[0_0_36px_-12px_rgb(247_200_92/0.5)]"
            >
              <span className="relative block h-28 overflow-hidden sm:h-36">
                <Image src={c.image} alt="" fill sizes="(min-width: 768px) 18rem, 46vw" className="object-cover transition-transform duration-700 ease-out-expo group-hover/cg:scale-110" />
                <span className="absolute inset-0 bg-gradient-to-t from-night via-night/30 to-transparent" />
                <span className="absolute bottom-2 left-2.5 rounded-full bg-night/70 px-2 py-0.5 text-[0.5625rem] font-semibold uppercase tracking-wider text-gold-200 backdrop-blur">{c.tag}</span>
              </span>
              <span className="flex flex-1 flex-col p-3 sm:p-3.5">
                <span className="truncate font-display text-[1.0625rem] font-semibold text-fg">{c.client}</span>
                <span className="truncate text-[0.6875rem] text-fg-3">
                  {c.sector} · {c.place}
                </span>
                <span className="mt-3 grid grid-cols-2 gap-2 border-t border-white/[0.07] pt-2.5">
                  {c.stats.map((st, k) => (
                    <span key={st.label} className="min-w-0">
                      <span className={`cg-num block truncate font-display text-[1.25rem] font-bold leading-none tracking-[-0.02em] sm:text-[1.5rem] ${k === 0 ? "text-gold" : "text-azure-300"}`} style={{ "--d": `${i * 0.12 + k * 0.08}s` } as React.CSSProperties}>{st.value}</span>
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
          <NextCaseCard compact />
        </li>
      </ul>
      {open && <CaseModal item={open} onClose={() => setOpen(null)} />}
    </>
  );
}
