import QualityComplianceClient from "./QualityComplianceClient.jsx";

export const metadata = {
  title: "Quality & Compliance / GDP | 2A Pharma",
  description:
    "2A Pharma applies GDP and ISO 9001:2015 standards — quarantine & release, FEFO, traceability, CAPA, complaints, returns, product recalls and staff training.",
  alternates: {
    canonical: "https://2a-pharma.al/quality-compliance/",
  },
};

export default function QualityCompliancePage() {
  return <QualityComplianceClient />;
}