import Image from "next/image";

const shots = [
  { id: "vertis", alt: "Esempio di profilo Instagram di una palestra" },
  { id: "essentia", alt: "Esempio di profilo Instagram di un centro benessere" },
  { id: "lumina", alt: "Esempio di profilo Instagram di uno studio dentistico" },
];

/** Tre profili Instagram di esempio a ventaglio (grafiche dimostrative): al centro uno, ai lati gli altri due inclinati. */
export function PhoneFan() {
  const phone = (s: (typeof shots)[number], priority = false) => (
    <div className="w-[14.5rem] overflow-hidden rounded-[1.8rem] border-[5px] border-[#1d2a3a] bg-black shadow-[0_40px_80px_-30px_rgb(0_0_0/0.9)]">
      <Image src={`/social-examples/${s.id}.webp`} alt={s.alt} width={520} height={1126} sizes="14.5rem" priority={priority} className="block h-auto w-full" />
    </div>
  );
  return (
    <div className="pf relative mx-auto h-[33rem] w-full max-w-[34rem]">
      <div className="pf-side pf-side--l absolute left-0 top-8 max-sm:hidden">{phone(shots[1]!)}</div>
      <div className="pf-side pf-side--r absolute right-0 top-8 max-sm:hidden">{phone(shots[2]!)}</div>
      <div className="absolute left-1/2 top-0 z-10 -translate-x-1/2">{phone(shots[0]!, true)}</div>
    </div>
  );
}
