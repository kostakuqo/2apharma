import ProductDetailClient from "./ProductDetailClient";
import { getProducts } from "@/lib/getProducts";

export async function generateStaticParams() {
  try {
    const products = await getProducts();
    return products.map((p) => ({
      id: p.id.toString(),
    }));
  } catch (e) {
    console.error("generateStaticParams failed:", e);
    return [];
  }
}

export const metadata = {
  title: "Produkt | 2A Pharma",
  description: "Detaje të produktit mjekësor — 2A Pharma Shqipëri",
};

export default async function ProductDetailPage({ params }) {
  const { id } = await params;
  return <ProductDetailClient id={id} />;
}