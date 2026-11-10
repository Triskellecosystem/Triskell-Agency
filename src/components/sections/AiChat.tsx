"use client";

import { useEffect, useRef, useState } from "react";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";
import { BeamCard } from "@/components/ui/BeamCard";
import { Icon } from "@/components/ui/Icon";

/**
 * Chat dimostrativa stile WhatsApp: arriva il contatto dalla campagna, Irelia scrive per prima (con i puntini
 * "sta scrivendo"), il cliente indica la fascia oraria, compare "Lead caldo" e poi il promemoria. Poi ricomincia.
 */
export function AiChat() {
  const c = site.ai.chat;
  const ref = useRef<HTMLDivElement>(null);
  const n = c.messages.length;
  const total = n + 4; // avviso lead + messaggi + lead caldo + promemoria + pausa
  const [step, setStep] = useState(total - 1);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let timer = 0;
    let started = false;
    const io = new IntersectionObserver(([e]) => {
      if (!e?.isIntersecting) {
        window.clearInterval(timer);
        started = false;
        return;
      }
      if (started) return;
      started = true;
      setStep(1);
      timer = window.setInterval(() => setStep((s) => (s + 1) % (total + 1)), 1700);
    }, { threshold: 0.15 });
    io.observe(el);
    return () => {
      io.disconnect();
      window.clearInterval(timer);
    };
  }, [total]);

  const shownMsgs = Math.max(0, Math.min(step - 1, n));
  const next = c.messages[shownMsgs];
  const typing = step >= 1 && shownMsgs < n && next?.from === "ai";

  return (
    <div ref={ref} aria-hidden="true" className="relative mx-auto w-full max-w-sm">
      <span className="phone-glow" />
      <BeamCard className="relative">
      <div className="relative rounded-[inherit] bg-[linear-gradient(160deg,#0d2a44,#061a2d)] p-2.5">
      {/* notifica del nuovo contatto: dentro la cornice, sopra la chat, non copre nulla */}
      <div className="mb-2.5 flex items-center">
        <div key={step === 0 ? "lead-on" : "lead"} className={cn("lead-pop flex w-full items-center gap-2.5 rounded-2xl border border-gold-300/40 bg-[rgb(13_39_61/0.9)] py-2 pl-2 pr-4", step === 0 && "lead-pop--on")}>
          <span className="grid h-8 w-8 place-items-center rounded-xl bg-[#0866ff] text-white">
            <Icon name="click" className="h-4 w-4" strokeWidth={2.2} />
          </span>
          <span className="leading-tight">
            <span className="block text-[0.8125rem] font-bold text-fg">{c.lead}</span>
            <span className="block text-[0.6875rem] text-fg-3">Irelia gli scrive subito</span>
          </span>
          <span className="ml-auto inline-flex items-center gap-1 text-[0.625rem] font-bold uppercase tracking-wider text-lime-300"><span className="agent-live h-1.5 w-1.5 rounded-full bg-lime-300" />ora</span>
        </div>
      </div>
    <div className="w-full overflow-hidden rounded-[1.1rem] border border-white/10 bg-[#0b141a]">
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
      <div className="flex h-[23rem] flex-col justify-end gap-2 overflow-hidden px-3 py-3" style={{ backgroundImage: "radial-gradient(rgb(255 255 255 / 0.035) 1px, transparent 1px)", backgroundSize: "14px 14px" }}>
        {c.messages.slice(0, shownMsgs).map((m, i) => (
          <div key={`${i}-${m.text}`} className={cn("chat-msg max-w-[84%] rounded-xl px-3 py-2 text-[0.8125rem] leading-snug text-white shadow", m.from === "user" ? "self-end rounded-tr-sm bg-[#005c4b]" : "self-start rounded-tl-sm bg-[#1f2c34]")}>
            {m.from === "ai" && <p className="mb-0.5 text-[0.625rem] font-semibold text-lime-300">Irelia</p>}
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
        {step > n && (
          <div className="chat-msg mx-auto mt-1 inline-flex items-center gap-1.5 rounded-full bg-lime-300 px-3 py-1 text-[0.6875rem] font-bold text-night">
            <Icon name="phone" className="h-3.5 w-3.5" strokeWidth={2.4} />
            {c.booked}
          </div>
        )}
        {step > n + 1 && (
          <div className="chat-msg mx-auto inline-flex items-center gap-1.5 rounded-full bg-gold-300 px-3 py-1 text-[0.6875rem] font-bold text-night">
            <Icon name="bell" className="h-3.5 w-3.5" strokeWidth={2.4} />
            {c.reminder}
          </div>
        )}
      </div>
    </div>
      </div>
      </BeamCard>
    </div>
  );
}
