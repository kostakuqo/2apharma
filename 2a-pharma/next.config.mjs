const isGithubPages = process.env.GITHUB_PAGES === "true";

// Redirect-uri 301 pentru URL-urile vechi care încă mund të jenë
// indexuara în Google.
// IMPORTANT: redirects() nuk mbështetet kur Next.js përdor
// output: "export" për GitHub Pages, prandaj aktivizohen vetëm
// kur nuk jemi në GitHub Pages.
//
// Në Vercel / 2a-pharma.al GITHUB_PAGES nuk është vendosur,
// kështu që këto redirect-e funksionojnë normalisht.

const oldPageRedirects = !isGithubPages
  ? {
      async redirects() {
        return [
          // ============================================================
          // ABOUT
          // ============================================================

          // URL e vjetër:
          // /about-us
          // /about-us/
          // /about-us/...
          //
          // → URL e re:
          // /about/

          {
            source: "/about-us",
            destination: "/about",
            permanent: true,
          },
          {
            source: "/about-us/:path*",
            destination: "/about",
            permanent: true,
          },

          // ============================================================
          // MATERIALE ORL
          // ============================================================

          // URL e vjetër:
          // /materiale-per-nderhyrjet-orl
          // /materiale-per-nderhyrjet-orl/
          // /materiale-per-nderhyrjet-orl/...
          //
          // → /products/

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

          // ============================================================
          // PRODUKTE
          // ============================================================

          // URL e vjetër:
          // /produkte
          // /produkte/
          // /produkte/...
          //
          // → /products/

          {
            source: "/produkte",
            destination: "/products",
            permanent: true,
          },
          {
            source: "/produkte/:path*",
            destination: "/products",
            permanent: true,
          },

          // ============================================================
          // CATEGORY
          // ============================================================

          // WordPress category URL pa përmbajtje reale
          // → homepage

          {
            source: "/category/:path*",
            destination: "/",
            permanent: true,
          },

          // ============================================================
          // KONTAKT
          // ============================================================

          // URL e vjetër:
          // https://2a-pharma.al/kontakt/
          //
          // → https://2a-pharma.al/contact/

          {
            source: "/kontakt",
            destination: "/contact",
            permanent: true,
          },
          {
            source: "/kontakt/:path*",
            destination: "/contact",
            permanent: true,
          },

          // ============================================================
          // PARTNERET
          // ============================================================

          // URL e vjetër:
          // https://2a-pharma.al/partneret/
          //
          // → https://2a-pharma.al/partners/

          {
            source: "/partneret",
            destination: "/partners",
            permanent: true,
          },
          {
            source: "/partneret/:path*",
            destination: "/partners",
            permanent: true,
          },
        ];
      },
    }
  : {};

const nextConfig = {
  ...(isGithubPages && { output: "export" }),

  images: {
    unoptimized: true,
  },

  basePath: isGithubPages ? "/2apharma" : "",
  assetPrefix: isGithubPages ? "/2apharma/" : "",

  trailingSlash: true,

  serverExternalPackages: [
    "firebase-admin",
    "google-gax",
    "@google-cloud/firestore",
  ],

  turbopack: {},

  ...oldPageRedirects,
};

export default nextConfig;