"use client";

import { useId, useRef, useState } from "react";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";
import { SocialIcon } from "@/components/ui/SocialIcon";
import { SectionBg } from "@/components/ui/SectionBg";

/**
 * FAQ: colonna centrata (non la solita coppia titolo-sx / contenuto-dx), accordion accessibile:
 * pulsanti con aria-expanded/aria-controls, regioni con aria-labelledby, frecce su/giù, Home/End.
 */
export function Faq() {
  const { faq } = site;
  const uid = useId();
  const [open, setOpen] = useState<number | null>(0);
  const buttons = useRef<Array<HTMLButtonElement | null>>([]);

  const onKey = (e: React.KeyboardEvent, i: number) => {
    const n = faq.items.length;
    const move = (to: number) => {
      e.preventDefault();
      buttons.current[(to + n) % n]?.focus();
    };
    if (e.key === "ArrowDown") move(i + 1);
    else if (e.key === "ArrowUp") move(i - 1);
    else if (e.key === "Home") move(0);
    else if (e.key === "End") move(n - 1);
  };

  return (
    <Section id={faq.id} labelledBy="faq-title">
      <SectionBg kind="bars" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-px hairline" />
      <div className="grid gap-x-16 gap-y-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
      {/* colonna sinistra ferma: titolo e un aiuto diretto */}
      <div className="lg:sticky lg:top-[calc(var(--header-h)+2rem)] lg:self-start">
        <SectionHeading id="faq-title" overline={faq.overline} title={faq.title} line={faq.line} />
        <Reveal y={16} blur={0} delay={0.2} className="mt-8">
          <a href={site.brand.whatsapp} target="_blank" rel="noopener noreferrer" className="group/wa flex items-center gap-4 rounded-2xl border border-gold-400/40 bg-[linear-gradient(135deg,#2b2410,#0a1626_70%)] p-4 transition-[border-color,box-shadow] duration-[var(--dur-base)] hover:border-gold-300 hover:shadow-[0_0_36px_-10px_rgb(247_200_92/0.55)]">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-[image:var(--gradient-gold-btn)] text-night">
              <SocialIcon id="whatsapp" className="h-6 w-6" />
            </span>
            <span className="min-w-0">
              <span className="block font-display text-[1.0625rem] font-bold text-fg">Hai un&apos;altra domanda?</span>
              <span className="block text-small text-fg-2">Scrivici su WhatsApp, ti risponde una persona.</span>
            </span>
            <Icon name="arrow-up-right" className="ml-auto h-5 w-5 shrink-0 text-gold-300 transition-transform duration-[var(--dur-base)] group-hover/wa:-translate-y-0.5 group-hover/wa:translate-x-0.5" />
          </a>
          <div className="mt-3">
            <Button href="/contatti" size="md" icon="calendar" iconPosition="start" className="w-full">
              Prenota una call gratuita
            </Button>
          </div>
        </Reveal>
      </div>

      <RevealGroup stagger={0.07}>
        {faq.items.map((item, i) => {
          const isOpen = open === i;
          const btnId = `${uid}-b${i}`;
          const panelId = `${uid}-p${i}`;
          return (
            <RevealItem key={item.q} y={20} blur={0} className="border-t border-line last:border-b">
              <h3>
                <button
                  ref={(el) => {
                    buttons.current[i] = el;
                  }}
                  id={btnId}
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpen(isOpen ? null : i)}
                  onKeyDown={(e) => onKey(e, i)}
                  className="group/q flex w-full items-center gap-4 py-4 text-left sm:py-5"
                >
                  <span className="w-8 shrink-0 font-mono text-[0.75rem] font-semibold text-gold-400">{String(i + 1).padStart(2, "0")}</span>
                  <span className={cn("flex-1 font-display text-[clamp(0.9375rem,0.9rem+0.25vw,1.0625rem)] font-semibold tracking-tight transition-colors duration-[var(--dur-base)]", isOpen ? "text-gold-200" : "text-fg group-hover/q:text-gold-200")}>
                    {item.q}
                  </span>
                  <span
                    aria-hidden="true"
                    className={cn(
                      "grid h-8 w-8 shrink-0 place-items-center rounded-full border transition-[transform,background-color,border-color,color] duration-[var(--dur-base)] ease-out-expo",
                      isOpen ? "rotate-45 border-gold-300 bg-gold-300 text-night" : "border-line-strong text-fg-2 group-hover/q:border-gold-300/70",
                    )}
                  >
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </span>
                </button>
              </h3>
              <div id={panelId} role="region" aria-labelledby={btnId} data-open={isOpen} className="acc-panel">
                <div>
                  <p className="max-w-2xl pb-5 pl-12 pr-4 text-[0.9375rem] leading-relaxed text-fg-2">{item.a}</p>
                </div>
              </div>
            </RevealItem>
          );
        })}
      </RevealGroup>
      </div>
    </Section>
  );
}
