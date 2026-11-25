/**
 * I tre numeri sopra la foto: entrano scendendo a spirale e poi fluttuano. Ognuno ha una piccola grafica viva:
 * barre che crescono (lead), un anello che si riempie (prove), facce che si accumulano (contatti).
 */
export function FitHeroStats() {
  return (
    <>
      <div className="fit-chip fit-chip--1">
        <div className="fit-spiral" style={{ "--d": "0.5s", "--sx": "-1" } as React.CSSProperties}>
          <div className="fit-chip-in">
            <span className="fit-bars" aria-hidden="true">
              {[40, 62, 50, 78, 70, 100].map((h, i) => <i key={i} style={{ "--h": `${h}%`, "--i": i } as React.CSSProperties} />)}
            </span>
            <span className="fit-chip-txt"><span className="fit-num text-[1.6rem] leading-none">30–60</span><span>lead al mese</span></span>
          </div>
        </div>
      </div>
      <div className="fit-chip fit-chip--2">
        <div className="fit-spiral" style={{ "--d": "0.8s", "--sx": "1" } as React.CSSProperties}>
          <div className="fit-chip-in">
            <svg viewBox="0 0 44 44" className="fit-ring-svg" aria-hidden="true">
              <circle cx="22" cy="22" r="18" />
              <circle cx="22" cy="22" r="18" className="fit-ring-fill" />
              <text x="22" y="26.5" textAnchor="middle">33%</text>
            </svg>
            <span className="fit-chip-txt"><span className="fit-num text-[1.6rem] leading-none">~1 su 3</span><span>prenota la prova</span></span>
          </div>
        </div>
      </div>
      <div className="fit-chip fit-chip--3">
        <div className="fit-spiral" style={{ "--d": "1.1s", "--sx": "-1" } as React.CSSProperties}>
          <div className="fit-chip-in">
            <span className="fit-faces" aria-hidden="true">
              {["#a6ff00", "#ffd86b", "#7fdcff", "#ff8fb0"].map((c, i) => <i key={c} style={{ "--c": c, "--i": i } as React.CSSProperties}>{"GMSL"[i]}</i>)}
              <b>+</b>
            </span>
            <span className="fit-chip-txt"><span className="fit-num text-[1.6rem] leading-none">500+</span><span>contatti in un anno</span></span>
          </div>
        </div>
      </div>
    </>
  );
}
