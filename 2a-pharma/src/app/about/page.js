import AboutClient from "./AboutClient.jsx";

export const metadata = {
  title: "About Us | 2A Pharma",
  description: "A leading company in the supply and distribution of medications and pharmaceutical products in Albania. Over 10 years of experience and 500+ certified products.",
  keywords: "about 2A Pharma, pharmaceutical distribution Albania, medicine supplier",
  alternates: { canonical: "https://2a-pharma.al/about/" },
};

export default function AboutPage() {
  return <AboutClient />;
}