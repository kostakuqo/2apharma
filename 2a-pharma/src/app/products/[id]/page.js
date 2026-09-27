// DEZACTIVAT (2026-09-27): pagina de detalii produs a fost dezactivată la
// cererea userului — orice cerere spre /products/orice-id redirectionează
// acum direct pe Home, în loc să deschidă pagina de produs.
// (generateStaticParams / generateMetadata / ProductDetailClient nu mai sunt
// folosite aici — dacă vrei să reactivezi pagina, ai nevoie de versiunea
// veche a fișierului, cu importurile getProductsServer / getProductByIdServer
// și ProductDetailClient.)
import { redirect } from "next/navigation";

export default function ProductDetailPage() {
  redirect("/");
}