import type { Metadata } from "next";
import { Contact } from "@/components/sections/Contact";
import { Faq } from "@/components/sections/Faq";
import { PageHero } from "@/components/sections/PageHero";
import { SectionBg } from "@/components/ui/SectionBg";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Contatti · Prenota ora",
  description: "Prenota una call gratuita con il team di Triskell Agency: capiamo la tua situazione e ti consigliamo la strada giusta.",
  alternates: { canonical: "/contatti" },
};

export default function ContactPage() {
  const { contatti } = site;
  return (
    <>
      <PageHero overline={contatti.overline} title={contatti.title} line={contatti.line} crumbs={[{ label: "Contatti" }]} backdrop={<SectionBg kind="isogrid" />} />
      <Contact />
      <Faq />
    </>
  );
}
