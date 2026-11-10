import type { Metadata } from "next";
import { LegalPage } from "@/components/sections/LegalPage";
import { privacy } from "@/content/legal";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Come Triskell Agency tratta i dati personali di chi visita il sito e ci contatta.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return <LegalPage doc={privacy} />;
}
