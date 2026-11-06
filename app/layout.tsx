import type { Metadata } from "next";
import { Gloock, Instrument_Sans } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { JsonLd } from "@/components/JsonLd";
import { serviceMenu } from "@/content/services";
import { siteConfig } from "@/site.config";
import "./globals.css";

const gloock = Gloock({ variable: "--font-gloock", weight: "400", subsets: ["latin"], display: "swap" });
const instrumentSans = Instrument_Sans({ variable: "--font-instrument-sans", subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name}: book marketing and publishing for independent authors`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
};

const organization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteConfig.name,
  url: siteConfig.url,
  email: siteConfig.email,
  description: siteConfig.description,
  sameAs: Object.values(siteConfig.social),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${gloock.variable} ${instrumentSans.variable} antialiased`}>
      <body className="flex min-h-screen flex-col">
        <a
          href="#main"
          className="sr-only rounded-md bg-ink-green px-4 py-2 text-paper focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60]"
        >
          Skip to content
        </a>
        <JsonLd data={organization} />
        <Header menu={serviceMenu} />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
