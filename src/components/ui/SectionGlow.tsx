import { cn } from "@/lib/cn";

/** Onda di particelle a tutta larghezza con una gobba al centro (calcolata una volta lato server). */
function wave(bump: number) {
  const out: Array<[number, number, number, number]> = [];
  for (let r = 0; r < 18; r++) {
    for (let c = 0; c < 140; c++) {
      const u = c / 139, v = r / 17;
      const z = 1 + v * 2.4;
      const yw = 150 - 70 * Math.exp(-((u - bump) ** 2) / 0.02) - 40 * Math.exp(-(u ** 2) / 0.03) - 50 * Math.exp(-((u - 1) ** 2) / 0.03) + 18 * Math.sin(u * 9 + v * 2);
      const x = 800 + (u * 1600 - 800) / (z * 0.55 + 0.45);
      const y = 40 + (yw + v * 70) / (0.6 + z * 0.4);
      const a = (1 - v) * 0.95;
      out.push([x, y, 2.2 / z + 0.5, a]);
    }
  }
  return out;
}
const W1 = wave(0.62), W2 = wave(0.38);

/**
 * Sfondo delle sezioni della Home (come nei riferimenti): blu acceso, onda di particelle luminose in basso con una
 * linea di luce sulla cresta e, se richiesto, il pavimento a griglia luminoso. Fermo, dietro al contenuto.
 */
export function SectionGlow({ floor, alt, className }: { floor?: boolean; alt?: boolean; className?: string }) {
  const pts = alt ? W2 : W1;
  return (
    <div aria-hidden="true" className={cn("sglow pointer-events-none absolute inset-0 -z-10 overflow-hidden", className)}>
      <span className="sglow-bg absolute inset-0" />
      {floor && <span className="sglow-floor absolute inset-0"><i /></span>}
      <svg className="sglow-wave" viewBox="0 0 1600 260" preserveAspectRatio="none">
        <defs>
          <linearGradient id={alt ? "sgl-b" : "sgl-a"} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#3aa4ff" stopOpacity="0.2" />
            <stop offset={alt ? "0.38" : "0.62"} stopColor="#fde08a" />
            <stop offset="1" stopColor="#3aa4ff" stopOpacity="0.4" />
          </linearGradient>
        </defs>
        {pts.map(([x, y, r, a], k) => (
          <circle key={k} cx={x.toFixed(1)} cy={y.toFixed(1)} r={r.toFixed(2)} fill={`rgba(110,190,255,${a.toFixed(2)})`} />
        ))}
        <path d={"M" + pts.slice(0, 140).map(([x, y]) => `${x.toFixed(1)} ${(y - 3).toFixed(1)}`).join(" L")} stroke={`url(#${alt ? "sgl-b" : "sgl-a"})`} strokeWidth="2.5" fill="none" />
      </svg>
    </div>
  );
}
