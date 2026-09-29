const isGithubPages = process.env.GITHUB_PAGES === "true";

// ADĂUGAT (2026-09-29): redirect-uri 301 pentru URL-urile vechi care încă
// apar indexate în Google (unele dau 404 acum). Trebuie puse SUB condiție
// (!isGithubPages) pentru că `redirects()` NU e suportat de Next.js când
// `output: "export"` e activ (build-ul de pe GitHub Pages ar da eroare) —
// pe Vercel (unde rulează site-ul real, 2a-pharma.al) GITHUB_PAGES nu e
// setat, deci redirect-urile de mai jos se aplică normal.
//
// IMPORTANT: astea sunt doar cele 2 URL-uri trimise până acum. Pe măsură
// ce găsești alte pagini vechi indexate în Google Search Console, adaugă-le
// aici, câte un obiect nou în array-ul de mai jos.
const oldPageRedirects = !isGithubPages
  ? {
      async redirects() {
        return [
          // Vechea structură "/about-us/" (inclusiv cu ?lang=en, ?lang=it
          // etc. — query string-ul e ignorat la redirect) → pagina nouă "/about/"
          { source: "/about-us", destination: "/about", permanent: true },
          { source: "/about-us/:path*", destination: "/about", permanent: true },

          // Pagină veche de produs/categorie, fără echivalent direct azi
          // → trimisă spre catalogul curent de produse
          {
            source: "/materiale-per-nderhyrjet-orl",
            destination: "/products",
            permanent: true,
          },
          {
            source: "/materiale-per-nderhyrjet-orl/:path*",
            destination: "/products",
            permanent: true,
          },

          // Vechea denumire în shqip a catalogului "/produkte/" → "/products/"
          { source: "/produkte", destination: "/products", permanent: true },
          { source: "/produkte/:path*", destination: "/products", permanent: true },

          // Pagină de categorie WordPress ("uncategorized") fără conținut
          // real și fără echivalent pe site-ul nou → spre homepage.
          { source: "/category/:path*", destination: "/", permanent: true },
        ];
      },
    }
  : {};

const nextConfig = {
  ...(isGithubPages && { output: "export" }),
  images: { unoptimized: true },
  basePath: isGithubPages ? "/2apharma" : "",
  assetPrefix: isGithubPages ? "/2apharma/" : "",
  trailingSlash: true,
  serverExternalPackages: ["firebase-admin", "google-gax", "@google-cloud/firestore"],
  turbopack: {},
  ...oldPageRedirects,
};

export default nextConfig;
