export const dynamic = "force-static";

import { getProductsServer } from "../lib/getProductsServer.js";

const BASE_URL = "https://kostakuqo.github.io/2apharma";

export default async function sitemap() {
  const staticPages = ["", "/about", "/products", "/partners", "/contact"].map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "weekly",
    priority: route === "" ? 1 : 0.8,
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