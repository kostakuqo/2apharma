import PharmacovigilanceClient from "./PharmacovigilanceClient.jsx";

export const metadata = {
  title: "Pharmacovigilance | 2A Pharma",
  description: "Product safety management via collection, detection, assessment, monitoring, reporting and prevention.",
  alternates: { canonical: "https://2a-pharma.al/pharmacovigilance/" },
};

export default function PharmacovigilancePage() {
  return <PharmacovigilanceClient />;
}