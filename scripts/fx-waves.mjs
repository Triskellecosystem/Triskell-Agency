/**
 * Genera le onde di particelle come file SVG statici in public/fx/ (prima erano migliaia di <circle> dentro l'HTML
 * di ogni pagina: così il browser le scarica una volta e le tiene in cache).
 * public/fx/loader-wave.svg è un file fisso (non generato).
 *   node scripts/fx-waves.mjs
 */
import { writeFileSync } from "node:fs";

const out = (name, svg) => {
  writeFileSync(new URL(`../public/fx/${name}`, import.meta.url), svg);
  console.log(`public/fx/${name} (${(svg.length / 1024).toFixed(1)} KB)`);
};

// Onda in basso a destra delle aperture (HeroFx)
function dotWave(flip) {
  const pts = [];
  for (let r = 0; r < 26; r++) {
    for (let c = 0; c < 70; c++) {
      const u = c / 69, v = r / 25;
      const x = u * 900;
      const z = 1 + v * 2.2;
      const y = 300 - 120 * Math.sin(u * Math.PI * 0.9 + 0.3) * (1 - v * 0.4) - 40 * Math.sin(u * 7 + v * 3) * (1 - v) + v * 60;
      const px = (x - 450) / z + 450, py = 120 + (y - 120) / z * 1.1;
      const a = (1 - v) * (0.25 + 0.75 * Math.sin(u * Math.PI));
      pts.push([flip ? 900 - px : px, py, 2.6 / z + 0.7, a]);
    }
  }
  return pts;
}
const hero = dotWave(true)
  .map(([x, y, r, a], k) => `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${r.toFixed(2)}" fill="${k % 41 === 0 ? `rgba(253,214,120,${(a * 0.9).toFixed(2)})` : `rgba(120,200,255,${Math.min(1, a * 1.1).toFixed(2)})`}"/>`)
  .join("");
out("hero-wave.svg", `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 420" preserveAspectRatio="xMaxYMax slice">${hero}</svg>\n`);

