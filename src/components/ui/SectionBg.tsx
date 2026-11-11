import { PerspectiveRoom, type RoomMode } from "./PerspectiveRoom";

/**
 * Sfondo delle sezioni: sempre la stanza 3D a quadrati, con varianti diverse per ogni sezione.
 * c-* = sezioni con il testo centrato (punto di fuga al centro), gli altri = testo a sinistra (punto di fuga a destra).
 */
export type BgKind =
  | "c-hud" | "c-tunnel" | "c-rays" | "c-hex" | "c-chip" | "c-rings" | "c-iso" | "c-halftone"
  | "h-iso" | "h-hud" | "h-browser" | "h-chart"
  | "blueprint" | "glass" | "dial" | "mesh" | "circuitpro" | "isoblocks" | "h-center";

const V: Record<BgKind, { x: number; y: number; q: number; mode: RoomMode; gold?: boolean }> = {
  "c-hud": { x: 50, y: 45, q: 140, mode: "full" },
  "c-tunnel": { x: 50, y: 50, q: 110, mode: "box" },
  "c-rays": { x: 50, y: 40, q: 170, mode: "corridor", gold: true },
  "c-hex": { x: 50, y: 38, q: 130, mode: "floor" },
  "c-chip": { x: 50, y: 42, q: 160, mode: "box", gold: true },
  "c-rings": { x: 50, y: 46, q: 120, mode: "corridor" },
  "c-iso": { x: 50, y: 36, q: 190, mode: "full", gold: true },
  "c-halftone": { x: 50, y: 44, q: 100, mode: "floor", gold: true },
  "h-iso": { x: 66, y: 40, q: 150, mode: "full", gold: true },
  "h-hud": { x: 70, y: 44, q: 120, mode: "box" },
  "h-browser": { x: 60, y: 34, q: 170, mode: "corridor" },
  "h-chart": { x: 68, y: 46, q: 130, mode: "full" },
  blueprint: { x: 72, y: 44, q: 150, mode: "corridor" },
  glass: { x: 70, y: 40, q: 120, mode: "box", gold: true },
  dial: { x: 28, y: 44, q: 160, mode: "full" },
  mesh: { x: 64, y: 30, q: 140, mode: "floor", gold: true },
  circuitpro: { x: 74, y: 42, q: 110, mode: "full" },
  isoblocks: { x: 70, y: 48, q: 180, mode: "corridor", gold: true },
  "h-center": { x: 50, y: 42, q: 140, mode: "box" },
};

/** Sezioni con il testo centrato: niente stanza, ma sfumatura sola, griglia piatta che si espande dal centro o pavimento all'orizzonte. */
const CENTER: Partial<Record<BgKind, "fade" | "grid" | "horizon">> = {
  "c-hud": "grid", "c-rays": "grid", "c-chip": "grid",
  "c-tunnel": "fade", "c-rings": "fade", "c-halftone": "fade",
  "c-hex": "horizon", "c-iso": "horizon",
};
const FADE: Partial<Record<BgKind, number>> = { "c-tunnel": 3, "c-rings": 7, "c-halftone": 8 };

export function SectionBg({ kind, className, strong }: { kind: BgKind; className?: string; strong?: boolean }) {
  const c = CENTER[kind];
  if (c === "fade") return <div aria-hidden="true" className={`sfx sfx--${FADE[kind]}`}><span className="stx stx--grain" /></div>;
  if (c === "grid")
    return (
      <div aria-hidden="true" className="sfx sfx--3">
        <span className={`cgrid ${kind === "c-rays" ? "cgrid--gold" : ""}`}>
          {[0, 1, 2, 3, 4, 5, 6].map((i) => <i key={i} />)}
        </span>
      </div>
    );
  if (c === "horizon") return <PerspectiveRoom x={50} y={kind === "c-iso" ? 30 : 36} q={kind === "c-iso" ? 110 : 140} mode="floor" gold={kind === "c-hex"} className="prm--section prm--horizon" />;
  const v = V[kind];
  return <PerspectiveRoom x={v.x} y={v.y} q={v.q} mode={v.mode} gold={v.gold} strong={strong} className={className ?? "prm--section"} />;
}
