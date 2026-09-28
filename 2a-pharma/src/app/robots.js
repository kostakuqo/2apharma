export const dynamic = "force-static";

// SCHIMBAT (2026-09-28): site-ul e live pe domeniul propriu 2a-pharma.al
// (deploy pe Vercel), nu pe GitHub Pages sub un sub-folder — deci BASE_PATH
// ("/2apharma") nu mai are sens: dădea disallow la căi greșite, care nu
// există pe site-ul real (ex: "/2apharma/admin" în loc de "/admin").
const BASE_URL = "https://2a-pharma.al";

export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        // "allow: /" — orice bot (Google, Bing etc.) poate citi tot site-ul,
        // în afară de căile explicit interzise mai jos.
        allow: "/",
        disallow: ["/admin", "/admin/", "/login", "/login/"],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}