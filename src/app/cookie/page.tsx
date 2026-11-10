import type { Metadata } from "next";
import { LegalPage } from "@/components/sections/LegalPage";
import { cookie } from "@/content/legal";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: "Quali cookie e strumenti di memorizzazione usa il sito di Triskell Agency.",
  alternates: { canonical: "/cookie" },
};

export default function CookiePage() {
  return <LegalPage doc={cookie} />;
}
