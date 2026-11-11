import type { Metadata } from "next";
import { Contact } from "@/components/sections/Contact";
import { Faq } from "@/components/sections/Faq";
import { PageHero } from "@/components/sections/PageHero";
import { site } from "@/content/site";
import { HeroFx } from "@/components/ui/HeroFx";

export const metadata: Metadata = {
  title: "Contatti · Prenota ora",
  description: "Prenota una call gratuita con il team di Triskell Agency: capiamo la tua situazione e ti consigliamo la strada giusta.",
  alternates: { canonical: "/contatti" },
};

export default function ContactPage() {
  const { contatti } = site;
  return (
    <>
      <PageHero overline={contatti.overline} title={contatti.title} line={contatti.line} crumbs={[{ label: "Contatti" }]} backdrop={<HeroFx horizon={78} vx={62} />} />
      <Contact bg="c-halftone" />
      <Faq />
    </>
  );
}
