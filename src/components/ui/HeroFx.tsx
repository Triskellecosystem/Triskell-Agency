import { cn } from "@/lib/cn";

/** Onda di particelle (puntini su una superficie ondulata in prospettiva), calcolata una volta lato server. */
function dotWave(flip: boolean) {
  const out: Array<[number, number, number, number]> = [];
  for (let r = 0; r < 26; r++) {
    for (let c = 0; c < 70; c++) {
      const u = c / 69, v = r / 25;
      const x = u * 900;
      const z = 1 + v * 2.2;
      const y = 300 - 120 * Math.sin(u * Math.PI * 0.9 + 0.3) * (1 - v * 0.4) - 40 * Math.sin(u * 7 + v * 3) * (1 - v) + v * 60;
      const px = (x - 450) / z + 450, py = 120 + (y - 120) / z * 1.1;
      const a = (1 - v) * (0.25 + 0.75 * Math.sin(u * Math.PI));
      out.push([flip ? 900 - px : px, py, 2.6 / z + 0.7, a]);
    }
  }
  return out;
}
const WR = dotWave(true);

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
          <svg className="hfx-wave hfx-wave--r" viewBox="0 0 900 420" preserveAspectRatio="xMaxYMax slice">
            {WR.map(([x, y, r, a], k) => <circle key={k} cx={x.toFixed(1)} cy={y.toFixed(1)} r={r.toFixed(2)} fill={k % 41 === 0 ? `rgba(253,214,120,${(a * 0.9).toFixed(2)})` : `rgba(120,200,255,${Math.min(1, a * 1.1).toFixed(2)})`} />)}
          </svg>
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
