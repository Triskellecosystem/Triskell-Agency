/**
 * Piccola immagine profilo illustrata (SVG): sfondo colorato, spalle, viso e capelli che cambiano in base all'indice.
 * Serve per i messaggi dimostrativi: sembrano persone diverse senza usare foto reali.
 */
const BG = ["#e1306c", "#3aa4d4", "#7fe0a0", "#f7c85c", "#a78bfa", "#fb923c", "#22d3ee", "#f472b6"];
const SKIN = ["#f1c7a5", "#d9a27e", "#b97a56", "#f6d6bd", "#8d5a3b", "#e8b896"];
const HAIR = ["#2b1b12", "#6b3e1f", "#d8b26a", "#111", "#8a2b1a", "#4a3a2a"];
const SHIRT = ["#0d3e66", "#111827", "#f5f5f5", "#7a1d12", "#1f6b52", "#3b0d1a"];

export function Avatar({ i, size = 28, className }: { i: number; size?: number; className?: string }) {
  const bg = BG[i % BG.length];
  const skin = SKIN[(i * 5 + 1) % SKIN.length];
  const hair = HAIR[(i * 3 + 2) % HAIR.length];
  const shirt = SHIRT[(i * 7 + 3) % SHIRT.length];
  const long = i % 2 === 0;
  return (
    <svg viewBox="0 0 40 40" width={size} height={size} aria-hidden="true" className={className} style={{ borderRadius: 9999, flexShrink: 0 }}>
      <defs>
        <clipPath id={`av-${i}`}>
          <circle cx="20" cy="20" r="20" />
        </clipPath>
      </defs>
      <g clipPath={`url(#av-${i})`}>
        <rect width="40" height="40" fill={bg} />
        {long && <path d="M9 22 Q8 8 20 7 Q32 8 31 22 L31 34 L9 34 Z" fill={hair} />}
        <path d="M5 42 Q6 29 20 28 Q34 29 35 42 Z" fill={shirt} />
        <rect x="17" y="22" width="6" height="7" rx="2" fill={skin} />
        <ellipse cx="20" cy="17.5" rx="7" ry="8" fill={skin} />
        <path d={long ? "M12.5 16 Q13 8.5 20 8.5 Q27 8.5 27.5 16 Q24 11.5 20 12 Q15.5 12 12.5 16 Z" : "M12.8 15 Q12.5 8 20 8 Q27.5 8 27.2 15 Q25 11 20 11.2 Q15 11 12.8 15 Z"} fill={hair} />
      </g>
    </svg>
  );
}
