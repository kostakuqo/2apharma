export const dynamic = "force-static";

import { getProductsServer } from "../lib/getProductsServer.js";

const BASE_URL = "https://2a-pharma.al";

// SCHIMBAT (2026-09-28): am renunțat la scanarea automată cu `fs`
// (fs.readdirSync) — pe Vercel (serverless), citirea de foldere la runtime
// poate eșua sau se poate comporta diferit față de mediul de build, ceea
// ce a dus la eroarea "Could not fetch" în Google Search Console (Google
// nu putea încărca deloc pagina sitemap.xml). Revenim la un array simplu,
// scris de mână — mai puțin "magic", dar 100% sigur, indiferent de
// platforma de hosting.
//
// IMPORTANT: când adaugi o pagină nouă pe viitor (ca /warehousing,
// /marketing etc.), trebuie s-o adaugi și AICI manual, ca să apară în
// sitemap — spune-mi și ți-o adaug eu de fiecare dată.
const STATIC_ROUTES = [
  "",
  "/about",
  "/services",
  "/products",
  "/partners",
  "/events-news",
  "/contact",
  "/warehousing",
  "/pharmacovigilance",
  "/marketing",
  "/distribution",
  "/regulatory",
  "/online-shop",
];

// ADĂUGAT (2026-09-28): next.config.js are `trailingSlash: true` — deci
// paginile REALE ale site-ului au "/" la final (ex: /about/, nu /about).
// Sitemap-ul trebuie să dea exact aceleași URL-uri, altfel Google dă peste
// un redirect inutil de fiecare dată când accesează un link din sitemap.
function withTrailingSlash(url) {
  return url.endsWith("/") ? url : `${url}/`;
}

export default async function sitemap() {
  const staticPages = STATIC_ROUTES.map((route) => ({
    url: route === "" ? BASE_URL + "/" : withTrailingSlash(`${BASE_URL}${route}`),
    lastModified: new Date().toISOString(),
    changeFrequency: "weekly",
    priority: route === "" ? 1 : 0.8,
  }));

  let productPages = [];
  try {
    const products = await getProductsServer();
    productPages = products.map((p) => ({
      url: withTrailingSlash(`${BASE_URL}/products/${p.id}`),
      lastModified: p.updatedAt
        ? new Date(p.updatedAt.seconds ? p.updatedAt.seconds * 1000 : p.updatedAt).toISOString()
        : new Date().toISOString(),
      changeFrequency: "weekly",
      priority: 0.7,
    }));
  } catch (err) {
    console.error("sitemap: nuk arrita ti mar produktet", err);
  }

  return [...staticPages, ...productPages];
}