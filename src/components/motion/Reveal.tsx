import type { CSSProperties, ReactNode } from "react";

type Tag = "div" | "li" | "p" | "article" | "span";
type Vars = CSSProperties & { [key: `--${string}`]: string | number };

export type From = "up" | "left" | "right" | "scale" | "far-left" | "far-right";

interface RevealProps {
  children: ReactNode;
  className?: string;
  as?: Tag;
  /** Ritardo in secondi. */
  delay?: number;
  y?: number;
  /** Sfocatura iniziale in px (blur → nitido). 0 per disattivare. */
  blur?: number;
  /** Da dove entra: dal basso (default), da sinistra, da destra o ingrandendosi. */
  from?: From;
}

function fromVars(from: From, y: number): Vars {
  switch (from) {
    case "left":
      return { "--reveal-x": "-110px", "--reveal-y": "0px", "--reveal-r": "-1.5deg" };
    case "right":
      return { "--reveal-x": "110px", "--reveal-y": "0px", "--reveal-r": "1.5deg" };
    case "far-left":
      return { "--reveal-x": "-72vw", "--reveal-y": "0px", "--reveal-r": "-3deg", "--reveal-dur": "1.25s" };
    case "far-right":
      return { "--reveal-x": "72vw", "--reveal-y": "0px", "--reveal-r": "3deg", "--reveal-dur": "1.25s" };
    case "scale":
      return { "--reveal-y": `${y}px`, "--reveal-s": 0.86 };
    default:
      return { "--reveal-y": `${y}px` };
  }
}

/**
 * Reveal allo scroll: opacity + translate + blur → nitido.
 * Server component: l'attivazione è gestita da <RevealRoot /> (un solo IntersectionObserver).
 */
export function Reveal({ children, className, as: Tag = "div", delay = 0, y = 40, blur = 8, from = "up" }: RevealProps) {
  const style: Vars = { "--reveal-delay": `${delay}s`, "--reveal-blur": `${blur}px`, ...fromVars(from, y) };
  return (
    <Tag data-reveal="" data-far={from.startsWith("far") ? "" : undefined} className={className} style={style}>
      {children}
    </Tag>
  );
}

/** Contenitore che anima i figli `RevealItem` con stagger (indice via :nth-child, vedi globals.css). */
export function RevealGroup({
  children,
  className,
  as: Tag = "div",
  stagger = 0.09,
  alternate = false,
}: {
  children: ReactNode;
  className?: string;
  as?: Tag;
  stagger?: number;
  /** I figli entrano alternati da sinistra e da destra ("far": da fuori dallo schermo, fino al centro). */
  alternate?: boolean | "far";
}) {
  const style: Vars = { "--stagger": `${Math.round(stagger * 1000)}ms` };
  return (
    <Tag data-reveal-group="" data-alt={alternate === "far" ? "far" : alternate ? "" : undefined} className={className} style={style}>
      {children}
    </Tag>
  );
}

export function RevealItem({
  children,
  className,
  as: Tag = "div",
  y = 40,
  blur = 0,
}: {
  children: ReactNode;
  className?: string;
  as?: Tag;
  y?: number;
  blur?: number;
}) {
  const style: Vars = { "--reveal-y": `${y}px`, "--reveal-blur": `${blur}px` };
  return (
    <Tag data-reveal-item="" className={className} style={style}>
      {children}
    </Tag>
  );
}
