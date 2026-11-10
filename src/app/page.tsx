import { AgencyHero } from "@/components/sections/AgencyHero";
import { AiAgents } from "@/components/sections/AiAgents";
import { Contact } from "@/components/sections/Contact";
import { CtaBand } from "@/components/sections/CtaBand";
import { EcosystemLink } from "@/components/sections/EcosystemLink";
import { Faq } from "@/components/sections/Faq";
import { ForWho } from "@/components/sections/ForWho";
import { MetodoTeaser } from "@/components/sections/MetodoTeaser";
import { Results } from "@/components/sections/Results";
import { ServiceExplorer } from "@/components/sections/ServiceExplorer";
import { ServiceMarquee } from "@/components/sections/ServiceMarquee";
import { WebsitesTeaser } from "@/components/sections/WebsitesTeaser";
import { Section, SectionHeading } from "@/components/ui/Section";
import { TechBackdrop } from "@/components/ui/TechBackdrop";
import { site } from "@/content/site";

/**
 * Home di Triskell Agency, corta e ordinata:
 * apertura con dashboard → servizi in nastro → Metodo Triskell → per chi è → servizi → prenota → agenti AI →
 * clienti reali → prenota → siti → ecosistema → domande → form.
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
        <TechBackdrop tone="gold" rich />
        <SectionHeading id="servizi-title" overline={services.overline} title={services.title} line={services.line} />
        <div className="mt-8">
          <ServiceExplorer items={services.items} />
        </div>
      </Section>

      <CtaBand content={site.cta.home} />
      <AiAgents />
      <Results />
      <CtaBand content={site.cta.results} />
      <WebsitesTeaser />
      <EcosystemLink />
      <Faq />
      <Contact />
    </>
  );
}
