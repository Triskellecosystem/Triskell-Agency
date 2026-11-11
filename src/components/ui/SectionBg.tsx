import { PerspectiveRoom, type RoomMode } from "./PerspectiveRoom";

/**
 * Sfondo delle sezioni: sempre la stanza 3D a quadrati, con varianti diverse per ogni sezione.
 * c-* = sezioni con il testo centrato (punto di fuga al centro), gli altri = testo a sinistra (punto di fuga a destra).
 */
export type BgKind =
  | "c-hud" | "c-tunnel" | "c-rays" | "c-hex" | "c-chip" | "c-rings" | "c-iso" | "c-halftone"
  | "h-iso" | "h-hud" | "h-browser" | "h-chart"
  | "blueprint" | "glass" | "dial" | "mesh" | "circuitpro" | "isoblocks";

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
};

export function SectionBg({ kind, className, strong }: { kind: BgKind; className?: string; strong?: boolean }) {
  const v = V[kind];
  return <PerspectiveRoom x={v.x} y={v.y} q={v.q} mode={v.mode} gold={v.gold} strong={strong} className={className ?? "prm--section"} />;
}
