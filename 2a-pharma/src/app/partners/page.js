import PartnersClient from "./PartnersClient.jsx";

export const metadata = {
  title: "Partners | 2A Pharma",
  description: "2A Pharma's leading healthcare partners — hospitals, clinics and pharmacies in Albania.",
  keywords: "partners, hospitals Albania, clinics, pharmacies",
  alternates: { canonical: "https://2a-pharma.al/partners/" },
};

export default function PartnersPage() {
  return <PartnersClient />;
}