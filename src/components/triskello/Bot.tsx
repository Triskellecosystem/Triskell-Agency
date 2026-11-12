/** Triskello: lo stesso robottino del sito Triskell Ecosystem (testa tonda azzurra, orecchie dorate, cuore che batte). */
export function TriskelloBot({ className, talk = false }: { className?: string; talk?: boolean }) {
  return (
    <svg viewBox="0 0 120 120" aria-hidden="true" className={`triski ${talk ? "triski--talk" : ""} ${className ?? ""}`}>
      <defs>
      <linearGradient id="tr-head" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stopColor="#f7fdff" />
      <stop offset="1" stopColor="#bfe6fa" />
      </linearGradient>
      <linearGradient id="tr-gold" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stopColor="#ffe27a" />
      <stop offset="1" stopColor="#e9a920" />
      </linearGradient>
      <linearGradient id="tr-body" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stopColor="#4cb2e2" />
      <stop offset="1" stopColor="#1a74ad" />
      </linearGradient>
      <radialGradient id="tr-glow" cx="50%" cy="50%" r="50%">
      <stop offset="0" stopColor="#ffd86b" stopOpacity="0.9" />
      <stop offset="1" stopColor="#ffd86b" stopOpacity="0" />
      </radialGradient>
      </defs>
      <path d="M60 24q-1-9 2-14" fill="none" stroke="#8ccbec" strokeWidth="3" strokeLinecap="round" />
      <circle className="triski-bulb" cx="62" cy="9" r="9" fill="url(#tr-glow)" />
      <circle cx="62" cy="9" r="4.6" fill="url(#tr-gold)" />
      <path d="M38 102c0-9 8-14 22-14s22 5 22 14v6a8 8 0 0 1-8 8H46a8 8 0 0 1-8-8z" fill="url(#tr-body)" />
      <path d="M52 92q8 5 16 0" fill="none" stroke="#e6f6ff" strokeWidth="2.4" strokeLinecap="round" opacity="0.8" />
      <path className="triski-heart" d="M60 109c-5-3.6-7.6-6-7.6-8.4a3.9 3.9 0 0 1 7.6-1.2 3.9 3.9 0 0 1 7.6 1.2c0 2.4-2.6 4.8-7.6 8.4z" fill="url(#tr-gold)" />
      <circle cx="31" cy="101" r="6" fill="#e6f6ff" />
      <circle cx="89" cy="101" r="6" fill="#e6f6ff" />
      <ellipse cx="13" cy="58" rx="7" ry="13" fill="url(#tr-gold)" />
      <ellipse cx="107" cy="58" rx="7" ry="13" fill="url(#tr-gold)" />
      <rect x="15" y="24" width="90" height="70" rx="35" fill="url(#tr-head)" stroke="#6fc3ec" strokeWidth="2.5" />
      <ellipse cx="44" cy="36" rx="16" ry="4.5" fill="#fff" opacity="0.8" />
      <g className="triski-eyes">
      <ellipse cx="43" cy="57" rx="8.5" ry="10.5" fill="#12395e" />
      <ellipse cx="77" cy="57" rx="8.5" ry="10.5" fill="#12395e" />
      <circle cx="45.8" cy="52.6" r="3.4" fill="#fff" />
      <circle cx="79.8" cy="52.6" r="3.4" fill="#fff" />
      <circle cx="40.6" cy="61.6" r="1.6" fill="#fff" opacity="0.85" />
      <circle cx="74.6" cy="61.6" r="1.6" fill="#fff" opacity="0.85" />
      </g>
      <ellipse cx="28" cy="71" rx="6" ry="4" fill="#ff9fb0" opacity="0.6" />
      <ellipse cx="92" cy="71" rx="6" ry="4" fill="#ff9fb0" opacity="0.6" />
      <path className="triski-mouth" d="M52 70q8 8.5 16 0" fill="none" stroke="#12395e" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}
