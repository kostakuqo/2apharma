import "./globals.css";
import { LangProvider } from "../context/LangContext.jsx";
import LayoutShell from "../components/LayoutShell.jsx";

const SITE_URL = "https://2a-pharma.al";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "2A Pharma | Pharma Distribution Company",
    template: "%s | 2A Pharma",
  },
  description:
    "2A Pharma — pharmaceutical distribution and healthcare solutions in Albania. A trusted supplier of medicines and professional medical equipment, GDP-certified products.",
  // ADDED (2026-09-29): SEO keywords — not very impactful for modern Google
  // ranking anymore, but some smaller search engines (Bing, etc.) still use
  // them, and there's no downside to including them.
  keywords: [
    "2A Pharma",
    "pharmaceutical distribution Albania",
    "pharma distribution Albania",
    "medical equipment Albania",
    "GDP certified pharma",
    "pharmacovigilance Albania",
  ],
  authors: [{ name: "2A Pharma" }],
  // ADDED (2026-09-29): explicitly tells Google it's allowed to index the
  // site and follow all links — useful in case a "noindex" ever gets set
  // by mistake (e.g. hosting/settings change).
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  // ADDED (2026-09-29): canonical URL — prevents Google from treating
  // "2a-pharma.al" and "www.2a-pharma.al" (or trailing-slash variants) as
  // separate/duplicate pages.
  alternates: {
    canonical: SITE_URL,
  },
  // Favicon (the icon shown in the browser tab and the one displayed by
  // Google in search results) + the image shown when you share the site's
  // link on WhatsApp/Discord/Facebook etc. (Open Graph). The files must be
  // placed in `public/`.
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-icon.png",
  },
  openGraph: {
    title: "2A Pharma | Pharma Distribution Company",
    description:
      "Pharmaceutical distribution and healthcare solutions in Albania — GDP-certified products.",
    url: SITE_URL,
    siteName: "2A Pharma",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
    locale: "sq_AL",
    type: "website",
  },
  // ADDED (2026-09-29): same idea as openGraph, but for the link preview
  // specific to Twitter/X (some platforms read it separately).
  twitter: {
    card: "summary_large_image",
    title: "2A Pharma | Pharma Distribution Company",
    description:
      "Pharmaceutical distribution and healthcare solutions in Albania — GDP-certified products.",
    images: ["/og-image.jpg"],
  },
};

// ADDED (2026-09-29): the address bar color on mobile (Chrome Android)
// when visiting the site — separate export required by Next.js (no longer
// part of `metadata` in newer versions).
export const viewport = {
  themeColor: "#0F2A52",
};

// ADDED (2026-09-29): structured data (JSON-LD, schema.org) — invisible on
// the page, but read directly by Google and used for rich results (name,
// logo, address, phone shown cleanly in search) and for the Knowledge
// Panel. Update the address/phone here if they ever change.
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "2A Pharma",
  url: SITE_URL,
  logo: `${SITE_URL}/images/logo-2a-pharma.png`,
  description: "Pharma Distribution Company",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Rruga Vidhe Gjata 16",
    addressLocality: "Tiranë",
    postalCode: "1000",
    addressCountry: "AL",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+355-68-905-3241",
    contactType: "customer service",
    email: "info@2a-pharma.al",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="al" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </head>
      <body suppressHydrationWarning>
        <LangProvider>
          <LayoutShell>
            {children}
          </LayoutShell>
        </LangProvider>
      </body>
    </html>
  );
}