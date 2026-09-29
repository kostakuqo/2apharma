import ServicesClient from "./ServicesClient.jsx";

export const metadata = {
  title: "Services | 2A Pharma",
  description: "2A Pharma's services — medicine distribution, regulatory support, marketing & sales, warehousing and pharmacovigilance in Albania.",
  keywords: "services, medicine distribution, pharmaceutical warehousing, pharmacovigilance",
  alternates: { canonical: "https://2a-pharma.al/services/" },
};

export default function ServicesPage() {
  return <ServicesClient />;
}