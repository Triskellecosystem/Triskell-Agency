import { cn } from "@/lib/cn";

/**
 * Sfondi tech delle sezioni: illustrazioni vettoriali ferme (in /public/bg) sopra una sfumatura.
 * c-*  = composizioni centrate che partono da dietro il centro e si espandono (per le sezioni con testo centrato)
 * h-*  = composizioni per le aperture delle pagine (sul lato destro)
 * le altre stanno sul lato libero delle sezioni con testo a sinistra.
 */
export type BgKind =
  | "c-hud" | "c-tunnel" | "c-rays" | "c-hex" | "c-chip" | "c-rings" | "c-iso" | "c-halftone"
  | "h-iso" | "h-hud" | "h-browser" | "h-chart"
  | "blueprint" | "glass" | "dial" | "mesh" | "circuitpro" | "isoblocks";

const SHADE: Record<BgKind, number> = {
  "c-hud": 3, "c-tunnel": 7, "c-rays": 3, "c-hex": 7, "c-chip": 3, "c-rings": 7, "c-iso": 4, "c-halftone": 8,
  "h-iso": 1, "h-hud": 2, "h-browser": 1, "h-chart": 2, blueprint: 1, glass: 2, dial: 1, mesh: 8, circuitpro: 2, isoblocks: 5,
};

export function SectionBg({ kind, className }: { kind: BgKind; className?: string }) {
  return (
    <div aria-hidden="true" className={cn("sfx", `sfx--${SHADE[kind]}`, className)}>
      <span className={`stx stx--art stx--${kind}`} />
    </div>
  );
}
