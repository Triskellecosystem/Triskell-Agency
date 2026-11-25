import { cn } from "@/lib/cn";

/**
 * Effetti delle aperture (come nei riferimenti): fondo blu acceso, pavimento a griglia luminoso con punti di luce e
 * linea d'orizzonte, onde di particelle negli angoli in basso e, se serve, un piedistallo luminoso sotto la figura.
 */
export function HeroFx({ horizon = 70, vx = 64, pedestal, waves = true, className }: { horizon?: number; vx?: number; pedestal?: { x: number; y: number; w: number }; waves?: boolean; className?: string }) {
  return (
    <div aria-hidden="true" className={cn("hfx pointer-events-none absolute inset-0 -z-10", className)} style={{ "--hz": `${horizon}%`, "--hvx": `${vx}%` } as React.CSSProperties}>
      <span className="hw-bg absolute inset-0" />
      <span className="hw-floor absolute inset-0"><i /><b /></span>
      {waves && (
        <>
          {/* Onda di particelle in basso a destra: file statico generato da scripts/fx-waves.mjs */}
          {/* eslint-disable-next-line @next/next/no-img-element -- SVG statico di sola decorazione */}
          <img src="/fx/hero-wave.svg" alt="" className="hfx-wave hfx-wave--r" decoding="async" />
        </>
      )}
      {pedestal && (
        <span className="hfx-ped" style={{ left: `${pedestal.x}%`, top: `${pedestal.y}%`, width: `${pedestal.w}rem` }}>
          <i />
          <b />
        </span>
      )}
    </div>
  );
}
