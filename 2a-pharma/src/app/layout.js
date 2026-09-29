import "./globals.css";
import { LangProvider } from "../context/LangContext.jsx";
import LayoutShell from "../components/LayoutShell.jsx";

export const metadata = {
  title: "2A Pharma",
  description: "Pharma Distribution Company",
  // ADĂUGAT (2026-09-29): favicon (iconița din tab-ul browserului și cea
  // afișată de Google în rezultatele de căutare) + imaginea care apare
  // când trimiți linkul site-ului pe WhatsApp/Discord/Facebook etc.
  // (Open Graph). Fișierele trebuie puse în `public/` (vezi mai jos).
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-icon.png",
  },
  openGraph: {
    title: "2A Pharma",
    description: "Pharma Distribution Company",
    url: "https://2a-pharma.al",
    siteName: "2A Pharma",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="al" suppressHydrationWarning>
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