import type { ReactNode } from "react";

/** Rende il testo con le parti tra [parentesi quadre] in oro. Server component, nessuna animazione. */
export function GoldText({ text, pulse }: { text: string; pulse?: boolean }): ReactNode {
  const parts = text.split(/(\[[^\]]+\])/g).filter(Boolean);
  return parts.map((part, i) =>
    part.startsWith("[") ? (
      <span key={i} className={pulse ? "text-gold gold-breathe" : "text-gold"}>
        {part.slice(1, -1)}
      </span>
    ) : (
      <span key={i}>{part}</span>
    ),
  );
}
