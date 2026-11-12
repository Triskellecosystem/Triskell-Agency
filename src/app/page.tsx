import { AgencyHero } from "@/components/sections/AgencyHero";
import { AiAgents } from "@/components/sections/AiAgents";
import { Reviews } from "@/components/sections/Reviews";
import { Contact } from "@/components/sections/Contact";
import { CtaBand } from "@/components/sections/CtaBand";
import { EcosystemLink } from "@/components/sections/EcosystemLink";
import { ForWho } from "@/components/sections/ForWho";
import { MetodoTeaser } from "@/components/sections/MetodoTeaser";
import { Results } from "@/components/sections/Results";
import { ServicesBento } from "@/components/sections/ServicesBento";
import { ServiceMarquee } from "@/components/sections/ServiceMarquee";
import { WebsitesTeaser } from "@/components/sections/WebsitesTeaser";
import { Section, SectionHeading } from "@/components/ui/Section";
import { site } from "@/content/site";
import { SectionGlow } from "@/components/ui/SectionGlow";

/**
 * Home di Triskell Agency, corta e ordinata:
 * apertura → servizi in nastro → Metodo Triskell → per chi è → servizi → prenota → agenti AI →
 * clienti reali → prenota → siti → ecosistema → form.
 */
export default function HomePage() {
  const { services } = site;
  return (
    <>
      <AgencyHero />
      <ServiceMarquee />
      <MetodoTeaser />
      <ForWho />

      <Section id="servizi" labelledBy="servizi-title">

        <SectionGlow />
        <span aria-hidden="true" className="sec-line absolute inset-x-0 top-0 h-px" />
        <SectionHeading id="servizi-title" overline={services.overline} title={services.title} line={services.line} className="gl-accent" />
        <div className="mt-8">
          <ServicesBento items={services.items} />
        </div>
      </Section>

      <CtaBand content={site.cta.home} glow />
      <AiAgents />
      <Results />
      <CtaBand content={site.cta.results} glow />
      <WebsitesTeaser />
      <EcosystemLink />
      <Reviews />
      <Contact />
    </>
  );
}
