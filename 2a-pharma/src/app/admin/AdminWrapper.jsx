"use client";
import dynamic from "next/dynamic";

const AdminClient = dynamic(() => import("./AdminClient.jsx"), { ssr: false });

export default function AdminWrapper() {
  return <AdminClient />;
}