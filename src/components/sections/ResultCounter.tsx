"use client";

import { useEffect, useRef, useState } from "react";

/** Numero di nuovi clienti che sale molto veloce (dimostrativo), dentro la tessera "Più clienti". */
export function ResultCounter() {
  const ref = useRef<HTMLParagraphElement>(null);
  const [n, setN] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let t = 0;
    const io = new IntersectionObserver(([e]) => {
      window.clearInterval(t);
      if (e?.isIntersecting) t = window.setInterval(() => setN((x) => (x >= 999 ? 120 : x + 1 + Math.floor(Math.random() * 3))), 70);
    });
    io.observe(el);
    return () => {
      io.disconnect();
      window.clearInterval(t);
    };
  }, []);
  return (
    <p ref={ref} className="mt-3 font-display text-[clamp(2.25rem,1.6rem+2vw,3.25rem)] font-bold leading-none tracking-[-0.05em] text-gold">
      +{n}
      <span className="ml-1.5 text-[0.35em] font-semibold tracking-normal text-fg-2">nuovi clienti</span>
    </p>
  );
}
