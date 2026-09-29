import WarehousingClient from "./WarehousingClient.jsx";

export const metadata = {
  title: "Warehousing | 2A Pharma",
  description: "Modern warehousing operations, procedures and services offered by 2A Pharma.",
  alternates: { canonical: "https://2a-pharma.al/warehousing/" },
};

export default function WarehousingPage() {
  return <WarehousingClient />;
}