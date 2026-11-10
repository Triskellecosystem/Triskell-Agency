import { AgencyHero } from "@/components/sections/AgencyHero";
import { AiAgents } from "@/components/sections/AiAgents";
import { Benefits } from "@/components/sections/Benefits";
import { Contact } from "@/components/sections/Contact";
import { CtaBand } from "@/components/sections/CtaBand";
import { EcosystemLink } from "@/components/sections/EcosystemLink";
import { Faq } from "@/components/sections/Faq";
import { ForWho } from "@/components/sections/ForWho";
import { NumbersWall } from "@/components/sections/NumbersWall";
import { Results } from "@/components/sections/Results";
import { ServiceExplorer } from "@/components/sections/ServiceExplorer";
import { ServiceMarquee } from "@/components/sections/ServiceMarquee";
import { TeamTeaser } from "@/components/sections/TeamTeaser";
import { WebsitesTeaser } from "@/components/sections/WebsitesTeaser";
import { MethodStack } from "@/components/sections/MethodStack";
import { MetodoTeaser } from "@/components/sections/MetodoTeaser";
import { Section, SectionHeading } from "@/components/ui/Section";
import { SectionDivider } from "@/components/ui/SectionDivider";
import { TechBackdrop } from "@/components/ui/TechBackdrop";
import { site } from "@/content/site";

/**
 * Home di Triskell Agency, in ordine per chi arriva:
 * cosa ti offriamo (hero) → i numeri → per chi è → i servizi → agenti AI → come funziona → cosa cambia →
 * i risultati veri → i siti → chi siamo → l'ecosistema dietro → domande → prenota.
 */
export default function HomePage() {
  const { services, method } = site;
  return (
    <>
      <AgencyHero />
      <ServiceMarquee />
      <NumbersWall />
      <ForWho />
      <MetodoTeaser />
      <CtaBand content={site.cta.home} />

      <Section id="servizi" labelledBy="servizi-title">
        <TechBackdrop tone="gold" rich />
        <SectionHeading id="servizi-title" overline={services.overline} title={services.title} line={services.line} />
        <div className="mt-8 sm:mt-10">
          <ServiceExplorer items={services.items} />
        </div>
      </Section>

      <AiAgents />
      <CtaBand content={site.cta.ai} />

      <Section id="metodo" labelledBy="metodo-title">
        <TechBackdrop tone="gold" rich />
        <SectionHeading id="metodo-title" overline={method.overline} title={method.title} line={method.line} align="center" />
        <div className="mt-12 sm:mt-16">
          <MethodStack />
        </div>
      </Section>

      <Benefits />
      <Results />
      <CtaBand content={site.cta.results} />
      <WebsitesTeaser />
      <SectionDivider />
      <TeamTeaser />
      <EcosystemLink />
      <Faq />
      <Contact />
    </>
  );
}
