"use client";

import { useState, useEffect } from "react";
import { useLang } from "../../context/LangContext.jsx";
import { getProducts } from "../../lib/getProducts.js";
import ProductCard from "../../components/ProductCard.jsx";
import styles from "./page.module.css";

const CAT_LABELS = {
  All:         { al: "Të gjitha", en: "All",          it: "Tutti" },
  Diagnostics: { al: "Diagnostikë", en: "Diagnostics", it: "Diagnostica" },
  Respiratory: { al: "Respirator",  en: "Respiratory", it: "Respiratorio" },
  Consumables: { al: "Konsumabël",  en: "Consumables", it: "Materiali di consumo" },
  Mobility:    { al: "Lëvizshmëri", en: "Mobility",    it: "Mobilità" },
};

const CATEGORIES = ["All", "Diagnostics", "Respiratory", "Consumables", "Mobility"];

export default function ProductsClient() {
  const { lang, tx } = useLang();
  const [activeCategory, setActiveCategory] = useState("All");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const data = await getProducts();
      setProducts(data);
      setLoading(false);
    }
    load();
  }, []);

  const filtered = activeCategory === "All"
    ? products
    : products.filter(p => p.category_en === activeCategory);

  if (loading) return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "60vh", fontSize: "18px" }}>
      {lang === "al" ? "Po ngarkohen produktet..." : lang === "it" ? "Caricamento..." : "Loading..."}
    </div>
  );

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <div className="section-label">{tx.products.label}</div>
        <h1 className={styles.pageTitle}>{tx.products.title}</h1>
        <p className={styles.pageSub}>{tx.products.sub}</p>
      </div>

      <div className={styles.filters}>
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            className={`${styles.filterBtn} ${activeCategory === cat ? styles.filterActive : ""}`}
            onClick={() => setActiveCategory(cat)}
          >
            {CAT_LABELS[cat]?.[lang] || cat}
          </button>
        ))}
      </div>

      <div className={styles.grid}>
        {filtered.map(p => <ProductCard key={p.id} product={p} />)}
      </div>

      {filtered.length === 0 && (
        <div style={{ textAlign: "center", padding: "48px", color: "var(--gray-600)" }}>
          {lang === "al" ? "Nuk ka produkte në këtë kategori." : lang === "it" ? "Nessun prodotto in questa categoria." : "No products in this category."}
        </div>
      )}
    </div>
  );
}