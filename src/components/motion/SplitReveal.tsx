import type { CSSProperties } from "react";

interface SplitRevealProps {
  /** Testo del titolo. Le parti tra [parentesi quadre] diventano oro. */
  text: string;
  as?: "h1" | "h2" | "h3";
  className?: string;
  id?: string;
  delay?: number;
}

interface Word {
  text: string;
  gold: boolean;
}

function parse(text: string): Word[] {
  const out: Word[] = [];
  const re = /\[([^\]]+)\]|([^[\]\s]+)/g;
  let m: RegExpExecArray | null;
  let prevEnd = -1;
  while ((m = re.exec(text))) {
    const glued = m.index === prevEnd && out.length > 0;
    prevEnd = m.index + m[0].length;
    if (m[1]) {
      m[1].split(/\s+/).forEach((w, i) => {
        if (i === 0 && glued) out[out.length - 1]!.text += w;
        else out.push({ text: w, gold: true });
      });
    } else if (m[2]) {
      // punteggiatura attaccata a una parte in [oro]: resta nello stesso span
      if (glued) out[out.length - 1]!.text += m[2];
      else out.push({ text: m[2], gold: false });
    }
  }
  return out;
}

/** Titolo con reveal a maschera per parola (server component, CSS). Parti in [oro] evidenziate. */
export function SplitReveal({ text, as: Tag = "h2", className, id, delay = 0 }: SplitRevealProps) {
  const words = parse(text);
  const style = { "--split-delay": `${delay}s` } as CSSProperties;
  return (
    <Tag id={id} className={className} data-reveal-split="" style={style}>
      {words.map((w, i) => (
        <span key={`${w.text}-${i}`}>
          <span className="split-mask">
            <span className={w.gold ? "split-word text-gold" : "split-word"} style={{ "--i": i } as CSSProperties}>
              {w.text}
            </span>
          </span>
          {i < words.length - 1 ? " " : null}
        </span>
      ))}
    </Tag>
  );
}
