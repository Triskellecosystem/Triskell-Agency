import { site } from "@/content/site";
import { cn } from "@/lib/cn";
import { Icon, type IconName } from "@/components/ui/Icon";

type Tile = { icon: IconName; name: string; points: string[]; kind: "a" | "b" | "opt" | "res"; tag?: string };

/**
 * Il Metodo Triskell come equazione grande: Social + Campagne + Sito (se serve) = Più clienti.
 * Le tessere entrano una dopo l'altra, i segni pulsano, la tessera del risultato si accende per ultima.
 */
export function MetodoEquation({ className }: { className?: string }) {
  const v = site.metodo.venn;
  const tiles: Tile[] = [
    { icon: "smartphone", name: v.social.title, points: v.social.points, kind: "a" },
    { icon: "click", name: v.ads.title, points: v.ads.points, kind: "b" },
    { icon: "monitor", name: "Sito web", points: ["Veloce e chiaro", "Pensato per convertire"], kind: "opt", tag: "Se serve" },
    { icon: "trending", name: v.center, points: ["Contatti ogni mese", "Vendite che crescono"], kind: "res" },
  ];
  const ops = ["+", "+", "="];
  return (
    <div className={cn("meq grid items-stretch gap-2 lg:grid-cols-[1fr_auto_1fr_auto_0.85fr_auto_1.1fr] lg:gap-3", className)} role="group" aria-label="Social più Campagne più Sito web se serve uguale Più clienti">
      {tiles.map((t, i) => (
        <div key={t.name} className="contents">
          <div
            className={cn(
              "meq-tile relative flex flex-col rounded-[1.25rem] border p-5",
              t.kind === "a" && "border-azure-300/50 bg-[linear-gradient(160deg,rgb(58_164_212/0.18),rgb(5_31_54/0.6))]",
              t.kind === "b" && "border-gold-300/50 bg-[linear-gradient(160deg,rgb(247_200_92/0.16),rgb(43_36_16/0.5))]",
              t.kind === "opt" && "border-dashed border-white/25 bg-white/[0.02]",
              t.kind === "res" && "meq-res border-gold-300 bg-[linear-gradient(160deg,#4a3808,#1a1405_70%)]",
            )}
            style={{ "--i": i } as React.CSSProperties}
          >
            {t.tag && <span className="absolute -top-2.5 right-4 rounded-full border border-white/20 bg-night px-2 py-0.5 text-[0.5625rem] font-bold uppercase tracking-wider text-fg-2">{t.tag}</span>}
            <span className={cn("grid h-11 w-11 place-items-center rounded-xl", t.kind === "a" && "bg-azure-300/20 text-azure-300", t.kind === "b" && "bg-gold-300/15 text-gold-300", t.kind === "opt" && "bg-white/5 text-fg-2", t.kind === "res" && "bg-[image:var(--gradient-gold-btn)] text-night")}>
              <Icon name={t.icon} className="h-5 w-5" strokeWidth={2} />
            </span>
            <p className={cn("mt-4 font-display text-[clamp(1.375rem,1.1rem+1vw,1.875rem)] font-bold leading-none tracking-[-0.03em]", t.kind === "res" ? "text-gold" : "text-fg")}>{t.name}</p>
            <ul className="mt-3 space-y-1">
              {t.points.map((p) => (
                <li key={p} className="flex items-start gap-1.5 text-[0.8125rem] leading-snug text-fg-2">
                  <Icon name="check" className={cn("mt-0.5 h-3.5 w-3.5 shrink-0", t.kind === "a" ? "text-azure-300" : "text-gold-300")} strokeWidth={2.6} />
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
