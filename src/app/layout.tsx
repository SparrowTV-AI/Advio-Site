import type { Metadata, Viewport } from "next";
import "@fontsource-variable/inter";
import "@fontsource-variable/inter-tight";
import "./globals.css";
import SmoothScroll from "@/components/layout/SmoothScroll";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import { site } from "@/lib/site";
import { isProduction, siteUrl } from "@/lib/seo";


const defaultTitle = "Advio — Two sides. New possibilities.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: defaultTitle, template: "%s · Advio" },
  description: site.description,
  applicationName: "Advio",
  keywords: [
    "Advio",
    "AdGlean",
    "addressable TV advertising",
    "linear television advertising",
    "broadcasters",
    "distributors",
    "out-of-target impressions",
    "household-level targeting",
    "incremental advertising revenue",
  ],
  authors: [{ name: "Advio" }],
  creator: "Advio",
  publisher: "Advio",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "Advio",
    locale: "en_US",
    url: "/",
    title: defaultTitle,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: site.description,
  },
  robots: isProduction ? { index: true, follow: true } : { index: false, follow: false },
  category: "technology",
};

export const viewport: Viewport = {
  themeColor: "#050b16",
  colorScheme: "dark",
};

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Advio",
  alternateName: "SparrowTV",
  url: siteUrl,
  logo: `${siteUrl}/icon.png`,
  description: site.description,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />
        <SmoothScroll />
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
