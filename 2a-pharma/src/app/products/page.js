import ProductsClient from "./ProductsClient.jsx";

export const metadata = {
  title: "Products | 2A Pharma",
  description: "Certified products for clinics and hospitals.",
  keywords: "certified products, clinics, hospitals, pharmaceutical products",
  alternates: { canonical: "https://2a-pharma.al/products/" },
};

export default function ProductsPage() {
  return <ProductsClient />;
}