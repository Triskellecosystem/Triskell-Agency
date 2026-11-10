"use client";

import { useEffect, useRef, useState } from "react";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";

/**
 * Domande a comparsa: una carta alla volta arriva in primo piano, le precedenti scivolano dietro (più piccole e
 * più in alto). Dopo un istante sulla carta scatta "Sì". Gira da sola quando è visibile; un clic passa alla successiva.
 */
export function QuestionStack() {
  const items = site.forWho.items;
  const ref = useRef<HTMLDivElement>(null);
  const [cur, setCur] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let timer = 0;
    const io = new IntersectionObserver(([e]) => {
      window.clearInterval(timer);
      if (e?.isIntersecting) timer = window.setInterval(() => setCur((c) => (c + 1) % items.length), 2600);
    });
    io.observe(el);
    return () => {
      io.disconnect();
      window.clearInterval(timer);
    };
  }, [items.length]);

  return (
    <div ref={ref} className="qs relative mx-auto h-[15rem] w-full max-w-xl cursor-pointer select-none sm:h-[16rem]" onClick={() => setCur((c) => (c + 1) % items.length)}>
      {items.map((it, i) => {
        const d = (cur - i + items.length) % items.length; // 0 = davanti, 1-2 = dietro, altre nascoste
        const vis = d <= 2;
        return (
          <div
            key={it.title}
            aria-hidden={d !== 0}
            className={cn(
              "qs-card absolute inset-x-0 bottom-0 flex min-h-[10rem] flex-col justify-between rounded-[1.5rem] border p-6 sm:p-7",
              d === 0 ? "border-gold-300/60 bg-[linear-gradient(150deg,#13314f,#071826_70%)] shadow-[0_30px_70px_-30px_rgb(0_0_0/0.9),0_0_50px_-20px_rgb(247_200_92/0.5)]" : "border-white/10 bg-[linear-gradient(150deg,#0d273d,#06141f)]",
            )}
            style={{
              transform: vis ? `translateY(${-d * 2.1}rem) scale(${1 - d * 0.07})` : "translateY(3rem) scale(0.9)",
              opacity: vis ? 1 - d * 0.3 : 0,
              zIndex: 10 - d,
            }}
          >
            <span className="font-mono text-[0.6875rem] font-bold text-fg-3">
              {String(i + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
            </span>
            <p className="mt-3 font-display text-[clamp(1.5rem,1.15rem+1.4vw,2.25rem)] font-bold leading-[1.1] tracking-[-0.03em] text-fg [text-wrap:balance]">{it.title}</p>
          </div>
        );
      })}
    </div>
  );
}
