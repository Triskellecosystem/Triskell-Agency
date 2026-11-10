import Image from "next/image";
import { site } from "@/content/site";
import { Icon } from "@/components/ui/Icon";
import { Section, SectionHeading } from "@/components/ui/Section";
import { LoopVideo } from "@/components/ui/LoopVideo";
import { SocialIcon } from "@/components/ui/SocialIcon";
import { TechBackdrop } from "@/components/ui/TechBackdrop";
import { CountUp } from "@/components/motion/CountUp";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";

/**
 * "Seguici", in versione compatta e sottile: una fascia con quante persone ci seguono già, tre schede piccole con
 * anteprima (Instagram con profilo e feed in un telefono, TikTok, canale YouTube) e due righe sottili per WhatsApp ed email.
 */
export function ContactLinks() {
  const { footer, brand } = site;
  const f = footer.follow;
  const yt = footer.social.find((s) => s.id === "youtube")!;
  const ig = footer.social.find((s) => s.id === "instagram")!;
  const tt = footer.social.find((s) => s.id === "tiktok")!;
  const wa = footer.social.find((s) => s.id === "whatsapp")!;
  const ext = { target: "_blank", rel: "noopener noreferrer" } as const;
  const card = "group/c relative flex h-full flex-col overflow-hidden rounded-2xl border p-4 max-md:items-center max-md:p-3 max-md:text-center transition-[border-color,box-shadow] duration-[var(--dur-base)] ease-out-expo";
  const head = "flex items-center gap-2.5 max-md:flex-col max-md:gap-1.5";
  const cta = "mt-3 inline-flex w-fit items-center gap-1.5 text-[0.8125rem] font-semibold max-md:mt-2 max-md:text-[0.75rem]";

  return (
    <Section id="seguici" labelledBy="seguici-title" className="pt-[clamp(2rem,4vw,3.5rem)]">
      <TechBackdrop tone="mixed" rich />
      <SectionHeading id="seguici-title" overline={f.overline} title={f.title} line={f.line} align="center" />

      {/* In evidenza: quante persone ci seguono già (sottile, su una riga) */}
      <Reveal y={18} blur={0} className="mx-auto mt-6 max-w-4xl">
        <div className="proof-card relative overflow-hidden rounded-2xl border border-gold-300/50 bg-[linear-gradient(135deg,#2b2410,#0a1626_55%,#0b2a46)] px-5 py-4 text-center">
          <p className="relative flex flex-wrap items-baseline justify-center gap-x-3 gap-y-0.5 font-display font-bold leading-none tracking-[-0.03em]">
            <span className="text-[1rem] text-fg-2">{f.proof.lead}</span>
            <CountUp value={f.proof.value} suffix={f.proof.suffix} className="text-gold gold-breathe text-[clamp(1.625rem,1.4rem+1.2vw,2.25rem)]" />
            <span className="text-[1rem] text-fg">{f.proof.text}</span>
          </p>
          <ul className="relative mt-3 flex flex-wrap items-center justify-center gap-x-5 gap-y-1 text-[0.8125rem] text-fg-2">
            {f.proof.chips.map((c) => (
              <li key={c.label}>
                <strong className="font-display font-bold text-gold-200">{c.value}</strong> {c.label}
              </li>
            ))}
          </ul>
        </div>
      </Reveal>

      <RevealGroup className="mx-auto mt-3 grid max-w-4xl gap-3 max-md:grid-cols-3 max-md:gap-2 md:grid-cols-3" stagger={0.1} alternate>
        {/* Instagram */}
        <RevealItem y={22}>
          <a href={ig.href} {...ext} className={`${card} border-white/15 bg-[linear-gradient(150deg,#3b1a5f,#6a1b5e_50%,#8f2b5b)] hover:shadow-[0_0_36px_-12px_rgb(214_62_130/0.7)]`}>
            <div className={head}>
              <span className="grid h-9 w-9 place-items-center rounded-xl border border-white/30 bg-white/10 text-white">
                <SocialIcon id="instagram" className="h-[1.125rem] w-[1.125rem]" />
              </span>
              <div className="leading-tight">
                <p className="font-display text-[1rem] font-bold text-white max-md:text-[0.875rem]">{f.instagram.title}</p>
                <p className="text-[0.75rem] text-white/80 max-md:hidden">{f.instagram.handle}</p>
              </div>
            </div>
            <div className="relative mt-4 flex h-48 max-md:hidden items-center justify-center overflow-hidden" aria-hidden="true">
              <div className="relative w-[62%] -rotate-3 overflow-hidden rounded-xl border border-white/20 bg-white shadow-[0_12px_28px_-10px_rgb(0_0_0/0.7)]">
                <Image src="/social/instagram-profile.webp" alt="" width={520} height={500} sizes="14rem" className="h-auto w-full" />
              </div>
              <div className="relative -ml-14 w-[38%] rotate-3 overflow-hidden rounded-[1.25rem] border-4 border-[#14101c] bg-black shadow-[0_14px_30px_-10px_rgb(0_0_0/0.8)]">
                <LoopVideo className="block aspect-[400/766] w-full object-cover" src="/social/instagram-feed.mp4" poster="/social/instagram-profile.webp" />
              </div>
            </div>
            <p className="mt-3 text-[0.8125rem] text-white/85 max-md:hidden">
              <strong className="font-display text-[0.9375rem] text-white">{f.instagram.stats[0]?.v}</strong> {f.instagram.stats[0]?.l} · {f.instagram.stats[1]?.v} {f.instagram.stats[1]?.l}
            </p>
            <p className="mt-2 font-display text-[1.375rem] font-bold leading-none text-white md:hidden">15,6K<span className="mt-1 block text-[0.6875rem] font-medium text-white/80">follower</span></p>
            <span className={`${cta} text-white max-md:hidden`}>
              {f.instagram.cta}
              <Icon name="arrow-up-right" className="h-3.5 w-3.5" />
            </span>
          </a>
        </RevealItem>

        {/* TikTok */}
        <RevealItem y={22}>
          <a href={tt.href} {...ext} className={`${card} border-white/15 bg-[linear-gradient(150deg,#06121f,#0a1626_55%,#12202f)] hover:border-[#25f4ee]/60 hover:shadow-[0_0_36px_-14px_rgb(37_244_238/0.5)]`}>
            <div className={head}>
              <span className="grid h-9 w-9 place-items-center rounded-xl border border-white/25 bg-black text-white shadow-[-1.5px_-1.5px_0_#25f4ee,1.5px_1.5px_0_#fe2c55]">
                <SocialIcon id="tiktok" className="h-[1.125rem] w-[1.125rem]" />
              </span>
              <div className="leading-tight">
                <p className="font-display text-[1rem] font-bold text-fg max-md:text-[0.875rem]">{f.tiktok.title}</p>
                <p className="text-[0.75rem] text-fg-2 max-md:hidden">{f.tiktok.handle}</p>
              </div>
            </div>
            <div className="relative mt-4 h-48 max-md:hidden overflow-hidden rounded-xl border border-white/10 bg-white">
              <Image src="/social/tiktok-profile.webp" alt="Profilo TikTok di Triskell Ecosystem: 2460 follower e 9916 mi piace" width={520} height={500} sizes="(min-width: 768px) 24rem, 90vw" className="h-auto w-full" />
            </div>
            <p className="mt-3 text-[0.8125rem] text-fg-2 max-md:hidden">
              <strong className="font-display text-[0.9375rem] text-fg">{f.tiktok.stats[0]?.v}</strong> {f.tiktok.stats[0]?.l} · <strong className="font-display text-fg">{f.tiktok.stats[1]?.v}</strong> {f.tiktok.stats[1]?.l}
            </p>
            <p className="mt-0.5 inline-flex items-center gap-1.5 text-[0.75rem] text-fg-3 max-md:hidden">
              <Icon name="play" className="h-3 w-3 text-[#fe2c55]" fill="currentColor" />
              {f.tiktok.top}
            </p>
            <p className="mt-2 font-display text-[1.375rem] font-bold leading-none text-fg md:hidden">2.460<span className="mt-1 block text-[0.6875rem] font-medium text-fg-2">follower</span></p>
            <span className={`${cta} text-[#ff6b87] max-md:hidden`}>
              {f.tiktok.cta}
              <Icon name="arrow-up-right" className="h-3.5 w-3.5" />
            </span>
          </a>
        </RevealItem>

        {/* YouTube */}
        <RevealItem y={22}>
          <a href={`${yt.href}?sub_confirmation=1`} {...ext} className={`${card} border-[#e5252a]/40 bg-[linear-gradient(150deg,#2a0c12,#0a1626_65%)] hover:border-[#ff6b63] hover:shadow-[0_0_36px_-14px_rgb(229_37_42/0.7)]`}>
            <div className={head}>
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-[#e5252a] text-white">
                <SocialIcon id="youtube" className="h-[1.125rem] w-[1.125rem]" />
              </span>
              <div className="leading-tight">
                <p className="font-display text-[1rem] font-bold text-fg max-md:text-[0.875rem]">YouTube</p>
                <p className="text-[0.75rem] text-fg-2 max-md:hidden">{f.youtube.subs}</p>
              </div>
            </div>
            <div className="relative mt-4 h-48 max-md:hidden overflow-hidden rounded-xl border border-white/15 bg-white">
              <Image src="/social/youtube-channel.webp" alt="Anteprima del canale YouTube Triskell Ecosystem: 1K iscritti e 212 video" fill sizes="(min-width: 768px) 24rem, 90vw" className="object-cover object-left-top transition-transform duration-[900ms] ease-out-expo group-hover/c:scale-[1.04]" />
            </div>
            <p className="mt-3 text-[0.8125rem] text-fg-2 max-md:hidden">{f.youtube.text}</p>
            <p className="mt-2 font-display text-[1.375rem] font-bold leading-none text-fg md:hidden">1K<span className="mt-1 block text-[0.6875rem] font-medium text-fg-2">iscritti</span></p>
            <span className={`${cta} text-gold-200 max-md:hidden`}>
              {f.youtube.cta}
              <Icon name="arrow-up-right" className="h-3.5 w-3.5" />
            </span>
          </a>
        </RevealItem>
      </RevealGroup>

      {/* WhatsApp ed email: due righe sottili */}
      <RevealGroup className="mx-auto mt-3 grid max-w-4xl gap-3 sm:grid-cols-2" stagger={0.1} alternate>
        <RevealItem y={18}>
          <a href={wa.href} {...ext} className="group/wa flex items-center gap-3 rounded-2xl border border-[#25d366]/35 bg-[linear-gradient(150deg,#06301f,#0a1626_70%)] px-4 py-3 transition-[border-color,box-shadow] duration-[var(--dur-base)] ease-out-expo hover:border-[#25d366] hover:shadow-[0_0_30px_-14px_rgb(37_211_102/0.6)]">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[#25d366] text-[#06301f]">
              <SocialIcon id="whatsapp" className="h-[1.125rem] w-[1.125rem]" />
            </span>
            <p className="min-w-0 leading-tight">
              <span className="block font-display text-[0.9375rem] font-bold text-fg">{f.whatsapp.title} · {brand.phone}</span>
              <span className="text-[0.75rem] text-fg-2">{f.whatsapp.text}</span>
            </p>
            <Icon name="arrow-up-right" className="ml-auto h-4 w-4 shrink-0 text-[#7dffb0]" />
          </a>
        </RevealItem>
        <RevealItem y={18}>
          <a href={`mailto:${brand.email}`} className="group/em flex items-center gap-3 rounded-2xl border border-gold-400/35 bg-[linear-gradient(150deg,#2b2410,#0a1626_70%)] px-4 py-3 transition-[border-color,box-shadow] duration-[var(--dur-base)] ease-out-expo hover:border-gold-300 hover:shadow-glow-gold">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-gold-400/50 bg-gold-300/10 text-gold-300">
              <Icon name="send" className="h-4 w-4" strokeWidth={1.7} />
            </span>
            <p className="min-w-0 leading-tight">
              <span className="block font-display text-[0.9375rem] font-bold text-fg">{f.email.title}</span>
              <span className="break-all text-[0.75rem] text-gold-200">{brand.email}</span>
            </p>
            <Icon name="arrow-up-right" className="ml-auto h-4 w-4 shrink-0 text-gold-300" />
          </a>
        </RevealItem>
      </RevealGroup>
    </Section>
  );
}
