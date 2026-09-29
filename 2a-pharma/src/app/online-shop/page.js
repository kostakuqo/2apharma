import OnlineShopClient from "./OnlineShopClient.jsx";

export const metadata = {
  title: "Online Shop | 2A Pharma",
  description: "Explore 2A Pharma's product catalogue and order easily online.",
  alternates: { canonical: "https://2a-pharma.al/online-shop/" },
};

export default function OnlineShopPage() {
  return <OnlineShopClient />;
}