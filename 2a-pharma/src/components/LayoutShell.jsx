"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function LayoutShell({ children }) {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith("/admin") || pathname.startsWith("/login");

  return (
    <>
      {!isAdminRoute && <Navbar />}
      <main style={{ flex: 1 }}>
        {children}
      </main>
      {!isAdminRoute && <Footer />}
      {!isAdminRoute && <WhatsAppButton />}
    </>
  );
}