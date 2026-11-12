/** Trischello: robottino tondo e dolce, con antenna dorata, occhi luminosi che sbattono e guance rosate. */
export function TrischelloBot({ className, wave = false }: { className?: string; wave?: boolean }) {
  return (
    <svg viewBox="0 0 120 120" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="tb-body" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#cfe3ff" />
        </linearGradient>
        <linearGradient id="tb-face" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0d2c57" />
          <stop offset="1" stopColor="#061a36" />
        </linearGradient>
        <radialGradient id="tb-gold" cx="0.35" cy="0.35" r="0.7">
          <stop offset="0" stopColor="#fff2c2" />
          <stop offset="0.5" stopColor="#f7c85c" />
          <stop offset="1" stopColor="#d18a1e" />
        </radialGradient>
      </defs>
      {/* antenna */}
      <g className="tb-antenna">
        <path d="M60 22 V10" stroke="#9cc2ef" strokeWidth="3" strokeLinecap="round" />
        <circle cx="60" cy="9" r="6" fill="url(#tb-gold)" />
        <circle cx="58" cy="7" r="1.8" fill="#fff" opacity="0.9" />
      </g>
      {/* orecchie */}
      <rect x="13" y="44" width="10" height="20" rx="5" fill="#9cc2ef" />
      <rect x="97" y="44" width="10" height="20" rx="5" fill="#9cc2ef" />
      {/* braccio che saluta */}
      <g className={wave ? "tb-wave" : undefined} style={{ transformOrigin: "98px 92px" }}>
        <path d="M98 92 Q110 84 110 72" stroke="#cfe3ff" strokeWidth="7" strokeLinecap="round" fill="none" />
        <circle cx="110" cy="70" r="5.5" fill="#fff" />
      </g>
      <path d="M22 92 Q12 98 14 108" stroke="#cfe3ff" strokeWidth="7" strokeLinecap="round" fill="none" />
      {/* corpo */}
      <rect x="32" y="84" width="56" height="30" rx="14" fill="url(#tb-body)" />
      <circle cx="60" cy="99" r="6" fill="url(#tb-gold)" />
      <path d="M60 95.5a3.5 3.5 0 1 1-3 5.2" stroke="#7a4b0c" strokeWidth="1.4" fill="none" strokeLinecap="round" />
      {/* testa */}
      <rect x="20" y="22" width="80" height="66" rx="30" fill="url(#tb-body)" />
      <rect x="28" y="32" width="64" height="46" rx="22" fill="url(#tb-face)" />
      <path d="M36 38 Q46 33 58 34" stroke="#ffffff" strokeOpacity="0.18" strokeWidth="3" strokeLinecap="round" fill="none" />
      {/* occhi */}
      <g className="tb-eyes">
        <ellipse cx="47" cy="54" rx="6.5" ry="8" fill="#7fdcff" />
        <ellipse cx="73" cy="54" rx="6.5" ry="8" fill="#7fdcff" />
        <circle cx="49" cy="51" r="2.2" fill="#fff" />
        <circle cx="75" cy="51" r="2.2" fill="#fff" />
      </g>
      {/* guance e sorriso */}
      <ellipse cx="38" cy="66" rx="5" ry="3" fill="#ff8fb0" opacity="0.55" />
      <ellipse cx="82" cy="66" rx="5" ry="3" fill="#ff8fb0" opacity="0.55" />
      <path d="M53 66 Q60 72 67 66" stroke="#7fdcff" strokeWidth="2.6" strokeLinecap="round" fill="none" />
    </svg>
  );
}
