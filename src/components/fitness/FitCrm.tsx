"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import { Icon, type IconName } from "@/components/ui/Icon";

const COLS = [
  { id: 0, title: "Nuovi contatti", icon: "user" as IconName },
  { id: 1, title: "Prova prenotata", icon: "calendar" as IconName },
  { id: 2, title: "Iscritti", icon: "trophy" as IconName },
];
const PEOPLE = [
  { n: "Giulia R.", s: "Meta Ads · ieri", c: "#a6ff00" },
  { n: "Marco T.", s: "Instagram · oggi", c: "#ffd86b" },
  { n: "Sara B.", s: "Google · 2 g fa", c: "#7fdcff" },
  { n: "Luca P.", s: "Passaparola", c: "#ff8fb0" },
  { n: "Elena M.", s: "Meta Ads · oggi", c: "#c6a0ff" },
];
const START = [0, 0, 1, 1, 2];

/** Mini CRM animato: le schede dei contatti passano da una colonna all'altra, come succede davvero. */
export function FitCrm() {
  const [pos, setPos] = useState(START);
  const [moved, setMoved] = useState(-1);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let k = 0;
    const t = window.setInterval(() => {
      setPos((p) => {
        const q = [...p];
        if (!q.includes(0)) { const j = q.indexOf(2); if (j >= 0) { q[j] = 0; setMoved(j); return q; } }
        const cand = q.map((v, i) => (v < 2 ? i : -1)).filter((i) => i >= 0);
        if (!cand.length) return START;
        const i = cand[k++ % cand.length]!;
        q[i] = q[i]! + 1;
        setMoved(i);
        return q;
      });
    }, 1600);
    return () => window.clearInterval(t);
  }, []);
  return (
    <div className="fit-crm overflow-hidden rounded-2xl">
      <div className="flex items-center justify-between border-b border-fit-300/20 px-4 py-3">
        <span className="flex items-center gap-2 text-[0.8125rem] font-bold text-white"><Icon name="database" className="h-4 w-4 text-fit-300" strokeWidth={2.2} /> CRM · La Tua Palestra</span>
        <span className="flex items-center gap-1.5 text-[0.6875rem] font-bold uppercase tracking-wider text-fit-300"><span className="fit-blink h-1.5 w-1.5 rounded-full bg-fit-300" />Live</span>
      </div>
      <div className="grid grid-cols-3 gap-2 p-3">
        {COLS.map((col) => {
          const here = PEOPLE.map((p, i) => ({ ...p, i })).filter((p) => pos[p.i] === col.id);
          return (
            <div key={col.id} className="fit-crm-col rounded-xl p-2">
              <p className="mb-2 flex items-center justify-between gap-1 px-1 text-[0.6875rem] font-bold uppercase tracking-wider text-white/70">
                <span className="flex items-center gap-1 truncate"><Icon name={col.icon} className="h-3.5 w-3.5 shrink-0 text-fit-300" strokeWidth={2.4} />{col.title}</span>
                <span className="rounded bg-fit-300/15 px-1.5 text-fit-300">{here.length}</span>
              </p>
              <ul className="min-h-[13rem] space-y-1.5">
                {here.map((p) => (
                  <li key={p.n} className={cn("fit-crm-card rounded-lg px-2 py-2", moved === p.i && "fit-crm-card--new")}>
                    <span className="flex items-center gap-1.5">
                      <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full text-[0.625rem] font-bold text-black" style={{ background: p.c }}>{p.n[0]}</span>
                      <span className="min-w-0">
                        <span className="block truncate text-[0.75rem] font-bold text-white">{p.n}</span>
                        <span className="block truncate text-[0.625rem] text-white/55">{p.s}</span>
                      </span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}
