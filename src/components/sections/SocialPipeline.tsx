import { Icon, type IconName } from "@/components/ui/Icon";

const stages: Array<{ icon: IconName; label: string; detail: string }> = [
  { icon: "pen", label: "Script", detail: "Pronto da leggere" },
  { icon: "camera", label: "Riprese", detail: "3 video registrati" },
  { icon: "scissors", label: "Editing", detail: "Montaggio, sottotitoli, musica" },
  { icon: "send", label: "Pubblicazione", detail: "Programmato · mar 18:30" },
  { icon: "chart", label: "Report", detail: "+1.240 visualizzazioni" },
];

/**
 * Apertura della pagina social: un contenuto che attraversa tutte le fasi (script → riprese → editing →
 * pubblicazione → report). La fase attiva si accende a turno, con la barra che si riempie; tutto CSS, in loop.
 */
export function SocialPipeline() {
  return (
    <div aria-hidden="true" className="sp relative mx-auto w-full max-w-[26rem]">
      <span className="btn-halo pointer-events-none absolute -inset-6 rounded-[2.5rem] bg-gold-300/15 blur-3xl" />
      <div className="relative overflow-hidden rounded-[1.75rem] border border-gold-400/40 bg-[linear-gradient(165deg,#0b2236,#071423_60%)] p-5 shadow-[0_30px_80px_-30px_rgb(0_0_0/0.85)]">
        <div className="flex items-center gap-3 border-b border-line pb-4">
          <span className="relative h-12 w-12 overflow-hidden rounded-xl bg-[linear-gradient(135deg,var(--color-cobalt-500),var(--color-gold-500))]">
            <Icon name="play" className="absolute left-1/2 top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 text-white" strokeWidth={2.2} />
          </span>
          <div className="min-w-0">
            <p className="font-display text-[1rem] font-bold text-fg">Reel · «3 errori da evitare»</p>
            <p className="text-[0.75rem] text-fg-3">Contenuto 7 di 12 · questo mese</p>
          </div>
        </div>
        <ol className="mt-4 space-y-2">
          {stages.map((s, i) => (
            <li key={s.label} className="sp-row relative flex items-center gap-3 overflow-hidden rounded-2xl border border-line bg-night/40 px-3.5 py-3" style={{ "--i": i } as React.CSSProperties}>
              <span className="sp-fill absolute inset-0 origin-left bg-gold-300/[0.09]" />
              <span className="sp-ico relative grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-line-strong text-fg-2">
                <Icon name={s.icon} className="h-[1.05rem] w-[1.05rem]" strokeWidth={1.8} />
              </span>
              <span className="relative min-w-0 flex-1">
                <span className="block font-display text-[0.9375rem] font-semibold text-fg">{s.label}</span>
                <span className="block truncate text-[0.75rem] text-fg-3">{s.detail}</span>
              </span>
              <span className="sp-check relative grid h-6 w-6 shrink-0 place-items-center rounded-full bg-lime-300 text-night">
                <Icon name="check" className="h-3.5 w-3.5" strokeWidth={3} />
              </span>
            </li>
          ))}
        </ol>
        <p className="mt-4 flex items-center justify-center gap-2 rounded-xl bg-gold-300/10 py-2.5 text-[0.8125rem] font-semibold text-gold-200">
          <Icon name="sparkles" className="h-4 w-4" />
          Tu hai solo registrato. Il resto lo facciamo noi.
        </p>
      </div>
    </div>
  );
}
