import Image from "next/image";
import { Icon } from "@/components/ui/Icon";
import { FitTilt } from "./FitTilt";

const HL = [["chart", "Risultati"], ["dumbbell", "Corsi"], ["users", "Coach"], ["play", "Video"], ["calendar", "Prova"]] as const;

/** Profilo Instagram realistico di una palestra dentro un telefono 3D che segue mouse e dito. */
export function FitProfilePhone() {
  return (
    <FitTilt className="mx-auto w-full max-w-[19rem]" max={16}>
      <div className="fit-tilt-body relative">
        <span aria-hidden="true" className="fit-phone-halo" />
        <div className="fit-iphone relative rounded-[2.9rem] p-[0.55rem]">
          <span aria-hidden="true" className="fit-iphone-btn fit-iphone-btn--a" />
          <span aria-hidden="true" className="fit-iphone-btn fit-iphone-btn--b" />
          <div className="relative overflow-hidden rounded-[2.4rem] bg-black text-white">
            <span aria-hidden="true" className="absolute left-1/2 top-2 z-10 h-[1.4rem] w-[5.5rem] -translate-x-1/2 rounded-full bg-black ring-1 ring-white/10" />
            {/* barra di stato */}
            <div className="flex items-center justify-between px-6 pb-1 pt-3 text-[0.6875rem] font-semibold">
              <span>18:40</span>
              <span className="flex items-center gap-1"><span className="tracking-tighter">●●●</span><span className="rounded-[3px] bg-white px-1 text-[0.5rem] font-bold text-black">100</span></span>
            </div>
            {/* intestazione */}
            <div className="flex items-center gap-2 px-3.5 pb-2 pt-2">
              <Icon name="chevron-left" className="h-4 w-4" strokeWidth={2.4} />
              <span className="flex-1 text-center text-[0.875rem] font-bold">tua.palestra <span className="ml-0.5 inline-grid h-3.5 w-3.5 place-items-center rounded-full bg-[#3897f0] align-[-2px] text-[0.5rem]">✓</span></span>
              <Icon name="bell" className="h-4 w-4" strokeWidth={2} />
            </div>
            {/* foto profilo e numeri */}
            <div className="flex items-center gap-4 px-3.5">
              <span className="fit-story grid h-[4.4rem] w-[4.4rem] shrink-0 place-items-center rounded-full p-[2.5px]">
                <span className="relative block h-full w-full overflow-hidden rounded-full border-2 border-black bg-black">
                  <Image src="/fitness/mark.webp" alt="" fill sizes="4.4rem" loading="eager" className="object-contain p-1.5" />
                </span>
              </span>
              <div className="grid flex-1 grid-cols-3 text-center">
                {[["428", "post"], ["18,6 mila", "follower"], ["231", "seguiti"]].map(([v, l]) => (
                  <span key={l}><span className="block text-[0.875rem] font-bold">{v}</span><span className="text-[0.6875rem] text-white/80">{l}</span></span>
                ))}
              </div>
            </div>
            {/* bio */}
            <div className="mt-2.5 px-3.5 text-[0.6875rem] leading-[1.35]">
              <p className="font-bold">La Tua Palestra · Fitness Club</p>
              <p className="text-white/55">Palestra</p>
              <p>Sala pesi, corsi e personal trainer</p>
              <p>Prova gratuita di 7 giorni ↓</p>
              <p className="font-semibold text-[#e0f1ff]">tuapalestra.it/prova</p>
            </div>
            {/* pulsanti */}
            <div className="mt-2.5 grid grid-cols-[1fr_1fr_auto] gap-1.5 px-3.5">
              <span className="rounded-lg bg-[#0095f6] py-1.5 text-center text-[0.75rem] font-bold">Segui</span>
              <span className="rounded-lg bg-white/15 py-1.5 text-center text-[0.75rem] font-bold">Messaggio</span>
              <span className="grid place-items-center rounded-lg bg-white/15 px-2"><Icon name="user" className="h-3.5 w-3.5" strokeWidth={2.2} /></span>
            </div>
            {/* storie in evidenza */}
            <div className="mt-3 flex justify-between px-3.5">
              {HL.map(([ic, l], i) => (
                <span key={l} className="fit-hl flex flex-col items-center gap-1 text-[0.5625rem]" style={{ "--i": i } as React.CSSProperties}>
                  <span className="grid h-11 w-11 place-items-center rounded-full border border-white/25 bg-[#0b0f0a] p-[2px]"><span className="grid h-full w-full place-items-center rounded-full border border-fit-300/60 text-fit-300"><Icon name={ic} className="h-4 w-4" strokeWidth={2} /></span></span>
                  {l}
                </span>
              ))}
            </div>
            {/* tab */}
            <div className="mt-3 grid grid-cols-3 border-t border-white/10 text-white/50">
              <span className="grid place-items-center border-b border-white py-2 text-white"><Icon name="grid" className="h-4 w-4" strokeWidth={2} /></span>
              <span className="grid place-items-center py-2"><Icon name="film" className="h-4 w-4" strokeWidth={2} /></span>
              <span className="grid place-items-center py-2"><Icon name="user" className="h-4 w-4" strokeWidth={2} /></span>
            </div>
            {/* griglia */}
            <ul className="grid grid-cols-3 gap-[2px]">
              {[0, 4, 1, 5, 3, 8].map((i) => (
                <li key={i} className="fit-tile relative aspect-square overflow-hidden bg-[#111]" style={{ "--i": i } as React.CSSProperties}>
                  <Image src={i === 4 ? "/fitness/post-gym.webp" : `/fitness/post-${i}.webp`} alt="" fill sizes="(max-width: 640px) 30vw, 6.5rem" loading="eager" className="object-cover" />
                  {(i === 1 || i === 5 || i === 7) && <Icon name="film" className="absolute right-1 top-1 h-3 w-3 text-white drop-shadow" strokeWidth={2.4} />}
                </li>
              ))}
            </ul>
            {/* barra in basso */}
            <div className="flex items-center justify-around bg-black py-2.5 text-white">
              {(["globe", "search", "plus", "film", "user"] as const).map((ic) => <Icon key={ic} name={ic} className="h-4 w-4" strokeWidth={2} />)}
            </div>
            <span aria-hidden="true" className="fit-tilt-shine pointer-events-none absolute inset-0" />
          </div>
        </div>
      </div>
    </FitTilt>
  );
}
