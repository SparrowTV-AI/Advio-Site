import type { Metadata, Viewport } from "next";
import "@fontsource-variable/inter";
import "@fontsource-variable/inter-tight";
import "./globals.css";
import SmoothScroll from "@/components/layout/SmoothScroll";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import { site } from "@/lib/site";
import { isProduction, siteUrl } from "@/lib/seo";


const defaultTitle = "Advio — Unlock More Value From the Television You Already Deliver";

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
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f6f8fd" },
    { media: "(prefers-color-scheme: dark)", color: "#050a1f" },
  ],
  colorScheme: "dark light",
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
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
        {/* Set the theme before paint: saved choice first, then the device setting. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('advio-theme');if(t!=='light'&&t!=='dark'){t=window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark'}document.documentElement.dataset.theme=t}catch(e){}})();`,
          }}
        />
      </head>
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
