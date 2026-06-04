import ProductDetailClient from "./ProductDetailClient";
import { getProducts } from "@/lib/getProducts";

export async function generateStaticParams() {
  const products = await getProducts();

  return products.map((p) => ({
    id: p.id.toString(),
  }));
}

export const metadata = {
  title: "Produkt | 2A Pharma",
  description: "Detaje të produktit mjekësor — 2A Pharma Shqipëri",
};

export default function ProductDetailPage({ params }) {
  return <ProductDetailClient id={params.id} />;
}