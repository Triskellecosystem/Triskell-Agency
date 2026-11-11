import { site } from "@/content/site";
import { cn } from "@/lib/cn";
import { Icon, type IconName } from "@/components/ui/Icon";
import { ResultCounter } from "./ResultCounter";

type Tile = { icon: IconName; name: string; points: string[]; kind: "a" | "b" | "opt" | "res"; tag?: string };

/**
 * Il Metodo Triskell come equazione grande: Social + Campagne + Sito (se serve) = Più clienti.
 * Le tessere entrano una dopo l'altra, i segni pulsano, la tessera del risultato si accende per ultima.
 */
export function MetodoEquation({ className, fly }: { className?: string; fly?: boolean }) {
  const v = site.metodo.venn;
  const tiles: Tile[] = [
    { icon: "smartphone", name: v.social.title, points: v.social.points, kind: "a" },
    { icon: "click", name: v.ads.title, points: v.ads.points, kind: "b" },
    { icon: "monitor", name: "Sito web", points: ["Veloce e chiaro", "Pensato per convertire"], kind: "opt", tag: "Se serve" },
    { icon: "trending", name: v.center, points: ["Contatti ogni mese", "Vendite che crescono"], kind: "res" },
  ];
  const ops = ["+", "+", "="];
  return (
    <div className={cn("meq grid", fly && "meq--fly", " items-stretch gap-2 lg:grid-cols-[1fr_auto_1fr_auto_0.85fr_auto_1.1fr] lg:gap-3", className)} role="group" aria-label="Social più Campagne più Sito web se serve uguale Più clienti">
      {tiles.map((t, i) => (
        <div key={t.name} className="contents">
          <div
            className={cn(
              "meq-tile relative flex flex-col rounded-[1.25rem] border p-5",
              t.kind === "a" && "gl-card",
              t.kind === "b" && "gl-card gl-card--teal",
              t.kind === "opt" && "gl-card",
              t.kind === "res" && "meq-res gl-card gl-card--gold",
            )}
            style={{ "--i": i } as React.CSSProperties}
          >
            {t.tag && <span className="absolute -top-2.5 right-4 rounded-full border border-white/20 bg-night px-2 py-0.5 text-[0.5625rem] font-bold uppercase tracking-wider text-fg-2">{t.tag}</span>}
            <span className={cn("grid h-11 w-11 place-items-center rounded-xl", t.kind === "a" && "bg-[#1a6cff] text-white shadow-[0_0_20px_rgb(26_108_255/0.6)]", t.kind === "b" && "bg-[linear-gradient(135deg,#2f7d6e,#5b6b2a)] text-gold-200", t.kind === "opt" && "bg-[#1a6cff] text-white shadow-[0_0_20px_rgb(26_108_255/0.6)]", t.kind === "res" && "bg-[image:var(--gradient-gold-btn)] text-night")}>
              <Icon name={t.icon} className="h-5 w-5" strokeWidth={2} />
            </span>
            <p className={cn("mt-4 font-display text-[clamp(1.375rem,1.1rem+1vw,1.875rem)] font-bold leading-none tracking-[-0.03em]", t.kind === "res" ? "text-gold" : "text-fg")}>{t.name}</p>
            {t.kind === "res" && (
              <>
                <svg aria-hidden="true" viewBox="0 0 120 70" className="pointer-events-none absolute right-3 top-3 h-14 w-24" fill="none">
                  <path d="M4 64 C 50 60, 80 40, 110 8" stroke="#fde08a" strokeWidth="3.5" strokeLinecap="round" />
                  <path d="M98 6 L112 6 L110 20" stroke="#fde08a" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <ResultCounter />
              </>
            )}
            <ul className="mt-3 space-y-1">
              {t.points.map((p) => (
                <li key={p} className="flex items-start gap-1.5 text-[0.8125rem] leading-snug text-fg-2">
                  <Icon name="check" className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold-300" strokeWidth={2.6} />
                  {p}
                </li>
              ))}
            </ul>
          </div>
          {i < ops.length && (
            <span aria-hidden="true" className="meq-op grid place-items-center py-1 lg:py-0" style={{ "--i": i } as React.CSSProperties}>
              <span className={cn("grid h-10 w-10 place-items-center rounded-full font-display text-[1.375rem] font-bold", ops[i] === "=" ? "bg-gold-300 text-night shadow-[0_0_24px_rgb(247_200_92/0.6)]" : "border-2 border-gold-300/70 text-gold-300")}>{ops[i]}</span>
            </span>
          )}
        </div>
      ))}
    </div>
  );
}
