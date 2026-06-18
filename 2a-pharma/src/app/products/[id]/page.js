import ProductDetailClient from "./ProductDetailClient";
import { getProductsServer, getProductByIdServer } from "@/lib/getProductsServer";

const BASE_URL = "https://kostakuqo.github.io/2apharma";

export async function generateStaticParams() {
  try {
    const products = await getProductsServer();
    return products.map((p) => ({
      id: p.id.toString(),
    }));
  } catch (e) {
    console.error("generateStaticParams failed:", e);
    return [];
  }
}

export async function generateMetadata({ params }) {
  const { id } = await params;

  try {
    const product = await getProductByIdServer(id);

    if (!product) {
      return {
        title: "Produkt | 2A Pharma",
        description: "Detaje të produktit mjekësor — 2A Pharma Shqipëri",
      };
    }

    const title = `${product.name_al} | 2A Pharma`;
    const description =
      product.desc_al ||
      `${product.name_al} - ${product.category_al}. Pajisje mjekësore profesionale nga 2A Pharma Shqipëri.`;

    return {
      title,
      description,
      alternates: {
        canonical: `${BASE_URL}/products/${id}`,
      },
      openGraph: {
        title,
        description,
        url: `${BASE_URL}/products/${id}`,
        images: product.image_url ? [product.image_url] : undefined,
      },
    };
  } catch (e) {
    console.error("generateMetadata failed:", e);
    return {
      title: "Produkt | 2A Pharma",
      description: "Detaje të produktit mjekësor — 2A Pharma Shqipëri",
    };
  }
}

export default async function ProductDetailPage({ params }) {
  const { id } = await params;
  return <ProductDetailClient id={id} />;
}