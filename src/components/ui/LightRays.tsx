import { cn } from "@/lib/cn";

/**
 * Effetto luce dietro le figure (come nell'apertura Social): alone azzurro e oro, ventaglio di raggi dorati sottili
 * e, se richiesto, una linea d'orizzonte luminosa. Fermo, dietro al contenuto. x / y = centro in percentuale della sezione.
 */
export function LightRays({ x = 50, y = 50, size = 54, horizon, className }: { x?: number; y?: number; size?: number; horizon?: number; className?: string }) {
  return (
    <span aria-hidden="true" className={cn("lrays pointer-events-none absolute inset-0 -z-10 overflow-hidden", className)} style={{ "--lx": `${x}%`, "--ly": `${y}%`, "--ls": `${size}rem` } as React.CSSProperties}>
      <i />
      {horizon !== undefined && <b style={{ top: `${horizon}%` }} />}
    </span>
  );
}
