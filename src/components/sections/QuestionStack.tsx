"use client";

import { useEffect, useRef, useState } from "react";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";
import { Icon } from "@/components/ui/Icon";

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
            <span className="flex items-center justify-between">
              <span className={cn("grid h-10 w-10 place-items-center rounded-xl", i % 2 ? "bg-gold-300/15 text-gold-300" : "bg-azure-300/15 text-azure-300")}>
                <Icon name={it.icon} className="h-5 w-5" strokeWidth={2} />
              </span>
              <span className="font-mono text-[0.6875rem] font-bold text-fg-3">
                {String(i + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
              </span>
            </span>
            <p className="mt-4 flex flex-wrap items-end justify-between gap-3">
              <span className="font-display text-[clamp(1.375rem,1.1rem+1.2vw,2rem)] font-bold leading-[1.1] tracking-[-0.03em] text-fg">{it.title}</span>
              {d === 0 && (
                <span key={cur} className="qs-yes inline-flex items-center gap-1 rounded-full bg-lime-300 px-3 py-1 text-[0.8125rem] font-bold text-night">
                  <Icon name="check" className="h-3.5 w-3.5" strokeWidth={3} />
                  {site.forWho.answer}
                </span>
              )}
            </p>
          </div>
        );
      })}
    </div>
  );
}
