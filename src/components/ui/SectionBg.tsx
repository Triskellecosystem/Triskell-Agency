import { cn } from "@/lib/cn";

/**
 * Sfondi delle sezioni: solo sfumature morbide, ferme, una composizione diversa per ogni sfondo. Il nome (kind) resta
 * quello già usato nelle pagine e decide quale sfumatura usare, così dentro una pagina restano tutte diverse.
 */
export type BgKind = "globe" | "terrain" | "net" | "flow" | "circuit" | "blocks" | "pixels" | "tunnel" | "matrix" | "bars" | "scan" | "isogrid" | "hud" | "none" | "hex" | "room" | "rings" | "horizon" | "rays" | "aurora" | "dots" | "grid" | "waves" | "beams" | "orbit" | "glow" | "diagonal";

const MAP: Record<BgKind, number> = {
  globe: 3, terrain: 1, net: 2, flow: 6, circuit: 5, blocks: 1, pixels: 2, tunnel: 4, matrix: 1, bars: 7, scan: 8, isogrid: 3, hud: 5, none: 0,
  hex: 6, room: 2, rings: 3, horizon: 7, rays: 8, aurora: 1, dots: 7, grid: 4, waves: 5, beams: 6, orbit: 2, glow: 7, diagonal: 8,
};

/** Dettaglio grafico leggero e fermo sopra la sfumatura, solo per alcune sezioni (alternate a quelle semplici). */
const TEX: Partial<Record<BgKind, string>> = {
  terrain: "mesh", circuit: "circuitpro", bars: "glass", globe: "dial", pixels: "blueprint", flow: "topo", beams: "isoblocks", grid: "isoblocks",
};

export function SectionBg({ kind, className }: { kind: BgKind; tone?: "mixed" | "gold" | "azure"; view?: "center" | "left" | "right" | "low"; className?: string }) {
  const v = MAP[kind];
  if (!v) return null;
  const tx = TEX[kind];
  return (
    <div aria-hidden="true" className={cn("sfx", `sfx--${v}`, className)}>
      {tx ? <span className={`stx stx--${tx}`} /> : <span className="stx stx--grain" />}
    </div>
  );
}
