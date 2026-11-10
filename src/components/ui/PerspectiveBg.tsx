import { cn } from "@/lib/cn";

type Variant = "floor" | "tiles" | "wall" | "tunnel" | "ceiling";

/**
 * Sfondi in prospettiva che si muovono piano, uno diverso per sezione:
 * floor = pavimento a griglia che scorre verso chi guarda · tiles = quadratoni in rilievo leggero ·
 * wall = parete laterale inclinata · tunnel = corridoio con le linee che fuggono al centro · ceiling = soffitto.
 */
export function PerspectiveBg({ variant, className }: { variant: Variant; className?: string }) {
  return (
    <div aria-hidden="true" className={cn("pbg pointer-events-none absolute inset-0 -z-10 overflow-hidden", `pbg--${variant}`, className)}>
      <span className="pbg-plane" />
      {variant === "tunnel" && <span className="pbg-plane pbg-plane--b" />}
    </div>
  );
}
