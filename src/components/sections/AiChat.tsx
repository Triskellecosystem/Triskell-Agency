"use client";

import { useEffect, useRef, useState } from "react";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";
import { Icon } from "@/components/ui/Icon";

/**
 * Chat dimostrativa stile WhatsApp: il cliente scrive di notte, l'assistente AI risponde (con i puntini "sta
 * scrivendo"), il cliente sceglie l'orario e compare la conferma in agenda. Poi ricomincia. Gira solo se visibile.
 */
export function AiChat() {
  const c = site.ai.chat;
  const ref = useRef<HTMLDivElement>(null);
  const total = c.messages.length + 2; // messaggi + conferma + pausa
  const [step, setStep] = useState(c.messages.length + 1);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let timer = 0;
    const io = new IntersectionObserver(([e]) => {
      window.clearInterval(timer);
      if (e?.isIntersecting) {
        setStep(0);
        timer = window.setInterval(() => setStep((s) => (s + 1) % (total + 1)), 1700);
      }
    });
    io.observe(el);
    return () => {
      io.disconnect();
      window.clearInterval(timer);
    };
  }, [total]);

  const shown = c.messages.slice(0, Math.min(step, c.messages.length));
  const next = c.messages[step];
  const typing = next?.from === "ai" && step < c.messages.length;

  return (
    <div ref={ref} aria-hidden="true" className="mx-auto w-full max-w-sm overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#0b141a] shadow-[0_40px_80px_-30px_rgb(0_0_0/0.9),0_0_60px_-24px_rgb(58_164_212/0.5)]">
      <div className="flex items-center gap-2.5 bg-[#1f2c34] px-4 py-3">
        <span className="grid h-9 w-9 place-items-center rounded-full font-display text-[0.875rem] font-bold text-white" style={{ background: "linear-gradient(135deg,#f9d7c5,#c98a6b)" }}>
          A
        </span>
        <div className="leading-tight">
          <p className="text-[0.875rem] font-semibold text-white">{c.name}</p>
          <p className="flex items-center gap-1 text-[0.6875rem] text-[#8fd19e]">
            <Icon name="bot" className="h-3 w-3" strokeWidth={2.2} />
            {c.status}
          </p>
        </div>
      </div>
      <div className="flex h-[19rem] flex-col justify-end gap-2 px-3 py-3" style={{ backgroundImage: "radial-gradient(rgb(255 255 255 / 0.035) 1px, transparent 1px)", backgroundSize: "14px 14px" }}>
        {shown.map((m, i) => (
          <div key={`${i}-${m.text}`} className={cn("chat-msg max-w-[82%] rounded-xl px-3 py-2 text-[0.8125rem] leading-snug text-white shadow", m.from === "user" ? "self-end rounded-tr-sm bg-[#005c4b]" : "self-start rounded-tl-sm bg-[#1f2c34]")}>
            {m.from === "ai" && <p className="mb-0.5 text-[0.625rem] font-semibold text-gold-300">Assistente AI</p>}
            {m.text}
            <span className="ml-2 align-bottom text-[0.5625rem] text-white/50">{m.time}</span>
          </div>
        ))}
        {typing && (
          <div className="chat-msg self-start rounded-xl rounded-tl-sm bg-[#1f2c34] px-3 py-2.5">
            <span className="agent-typing flex gap-1">
              <i />
              <i />
              <i />
            </span>
          </div>
        )}
        {step > c.messages.length && (
          <div className="chat-msg mx-auto mt-1 inline-flex items-center gap-1.5 rounded-full bg-lime-300 px-3 py-1 text-[0.6875rem] font-bold text-night">
            <Icon name="calendar" className="h-3.5 w-3.5" strokeWidth={2.4} />
            {c.booked}
          </div>
        )}
      </div>
    </div>
  );
}
