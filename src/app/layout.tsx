import type { Metadata, Viewport } from "next";
import { Inter, Sora } from "next/font/google";
import { site } from "@/content/site";
import { Providers } from "@/components/motion/Providers";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { ScrollProgress } from "@/components/motion/ScrollProgress";
import { RevealRoot } from "@/components/motion/RevealRoot";
import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";
import { MobileMotion } from "@/components/motion/MobileMotion";
import { Loader } from "@/components/brand/Loader";
import "./globals.css";

const sora = Sora({ subsets: ["latin"], variable: "--font-sora", display: "swap", weight: ["500", "600", "700", "800"] });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

const title = `${site.brand.name} — Più clienti con marketing, ADV e agenti AI`;

export const metadata: Metadata = {
  metadataBase: new URL(site.brand.url),
  title: { default: title, template: `%s · ${site.brand.name}` },
  description: site.brand.description,
  applicationName: site.brand.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: site.brand.locale,
    siteName: site.brand.name,
    title,
    description: site.brand.description,
    url: "/",
  },
  twitter: { card: "summary_large_image", title, description: site.brand.description },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#010f1c", // = token night
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.brand.name,
  url: site.brand.url,
  logo: `${site.brand.url}/brand/triskell-medallion.png`,
  description: site.brand.description,
  email: site.brand.email,
  parentOrganization: { "@type": "Organization", name: "Triskell Ecosystem", url: site.brand.ecosystemUrl },
  sameAs: site.footer.social.filter((s) => s.id !== "whatsapp").map((s) => s.href),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it" className={`${sora.variable} ${inter.variable}`} suppressHydrationWarning>
      <head>
        {/* una volta per sessione: se la schermata di caricamento è già stata vista, non compare di nuovo */}
        <script dangerouslySetInnerHTML={{ __html: `try{if(sessionStorage.getItem("tk-loaded")){document.documentElement.setAttribute("data-no-loader","")}else{document.documentElement.setAttribute("data-loading","")}}catch(e){}` }} />
      </head>
      <body>
        <Loader />
        <noscript>
          <style>{`[data-reveal],[data-reveal-item],.split-word{opacity:1!important;transform:none!important;filter:none!important}[data-count]{visibility:visible!important}`}</style>
        </noscript>
        <a
          href="#main"
          className="fixed left-4 top-4 z-[100] -translate-y-24 rounded-xl bg-gold-300 px-4 py-3 font-display font-semibold text-night transition-transform focus:translate-y-0"
        >
          {site.nav.skip}
        </a>
        <Providers>
          <SmoothScroll />
          <MobileMotion />
          <RevealRoot />
          <ScrollProgress />
          <Header />
          <main id="main" className="overflow-x-clip">{children}</main>
          <Footer />
        </Providers>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }} />
      </body>
    </html>
  );
}
