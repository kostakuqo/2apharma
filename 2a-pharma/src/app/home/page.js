import HomeClient from "./home/HomeClient.jsx";

export const metadata = {
  title: "2A Pharma | Pharmaceutical Distribution Company",
  description: "Your trusted supplier of medications and pharmaceutical products. Certified products for clinics, hospitals, and pharmacies in Albania.",
  keywords: "ilace, barna, distribucion farmaceutik, pharmaceutical distribution, Albania, Shqipëri",
  alternates: { canonical: "https://2a-pharma.al/" },
};

export default function HomePage() {
  return <HomeClient />;
}