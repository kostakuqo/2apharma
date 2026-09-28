export const dynamic = "force-static";

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { getProductsServer } from "../lib/getProductsServer.js";

// SCHIMBAT (2026-09-28): site-ul e live pe domeniul propriu 2a-pharma.al
// (deploy pe Vercel), nu pe GitHub Pages — sitemap-ul trebuie să genereze
// linkuri către adresa reală, altfel Google indexează URL-uri greșite.
const BASE_URL = "https://2a-pharma.al";

// ADĂUGAT (2026-09-28), la cererea userului: nu mai listăm paginile statice
// manual ("", "/about", "/products", ...) — le găsim SINGURE, citind
// structura de foldere din app/ (adică din acest folder, unde stă chiar
// fișierul sitemap.js). De acum, orice pagină nouă (orice folder cu un
// page.js/page.jsx în el) intră AUTOMAT în sitemap, fără să mai trebuiască
// s-o adaugi tu manual aici.
//
// Cum funcționează: fiindcă avem "force-static", codul ăsta rulează O
// SINGURĂ DATĂ, la BUILD (npm run build), nu în browser — deci poate
// folosi `fs` (citit de fișiere) în siguranță, la fel ca orice script Node.
//
// Ce e SĂRIT automat (nu ajunge în sitemap):
//   - foldere de rută dinamică, gen "[id]" (produsele astea au deja logica
//     lor separată mai jos, prin getProductsServer — sunt tratate diferit
//     fiindcă vin din Firebase, nu sunt pagini statice fixe)
//   - "route groups" gen "(marketing)" (paranteze) — Next.js le folosește
//     doar pentru organizare, nu apar niciodată în URL
//   - foldere/fișiere tehnice: api/, orice începe cu "_"
const __dirname = path.dirname(fileURLToPath(import.meta.url));

function getStaticRoutes(dir, baseRoute = "") {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  let routes = [];

  const hasPage = entries.some(
    (e) => e.isFile() && /^page\.(js|jsx|ts|tsx)$/.test(e.name)
  );
  if (hasPage) routes.push(baseRoute === "" ? "/" : baseRoute);

  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    if (entry.name.startsWith("[")) continue; // rută dinamică ("[id]") — o tratăm separat
    if (entry.name.startsWith("(")) continue; // route group — nu apare în URL
    if (entry.name.startsWith("_")) continue; // folder tehnic (ex: _components)
    if (entry.name === "api") continue; // API routes, nu pagini

    routes = routes.concat(
      getStaticRoutes(path.join(dir, entry.name), `${baseRoute}/${entry.name}`)
    );
  }

  return routes;
}

export default async function sitemap() {
  // SCHIMBAT (2026-09-28): rutele statice vin acum din scanarea automată a
  // folderelor, nu dintr-un array scris de mână.
  const staticRoutes = getStaticRoutes(__dirname).filter(
    (route) => route !== "/products" // /products e deja acoperit mai jos, cu id-uri reale
  );
  // Ne asigurăm că "/products" (fără id) rămâne totuși în sitemap, dacă
  // folderul lui există (are page.js) — separat de produsele individuale.
  if (fs.existsSync(path.join(__dirname, "products", "page.js")) ||
      fs.existsSync(path.join(__dirname, "products", "page.jsx"))) {
    staticRoutes.push("/products");
  }

  const staticPages = staticRoutes.map((route) => ({
    url: `${BASE_URL}${route === "/" ? "" : route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "weekly",
    priority: route === "/" ? 1 : 0.8,
  }));

  let productPages = [];
  try {
    const products = await getProductsServer();
    productPages = products.map((p) => ({
      url: `${BASE_URL}/products/${p.id}`,
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