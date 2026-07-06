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
const PAGE_SIZE = 6;

export default function ProductsClient() {
  const { lang, tx } = useLang();
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(PAGE_SIZE);

  useEffect(() => {
    async function load() {
      const data = await getProducts();
      setProducts(data);
      setLoading(false);
    }
    load();
  }, []);

  // reset visible când se schimbă filtrul sau search-ul
  useEffect(() => {
    setVisible(PAGE_SIZE);
  }, [activeCategory, search]);

  const filtered = products
    .filter(p => activeCategory === "All" || p.category_en === activeCategory)
    .filter(p => {
      if (!search.trim()) return true;
      const q = search.toLowerCase();
      return (
        p.name_al?.toLowerCase().includes(q) ||
        p.name_en?.toLowerCase().includes(q) ||
        p.name_it?.toLowerCase().includes(q) ||
        p.category_en?.toLowerCase().includes(q)
      );
    });

  const displayed = filtered.slice(0, visible);
  const hasMore = visible < filtered.length;

  if (loading) return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "60vh", fontSize: "18px" }}>
      {lang === "al" ? "Po ngarkohen produktet..." : lang === "it" ? "Caricamento..." : "Loading..."}
    </div>
  );

 return (
  <div className={styles.page}>
    <div className={styles.pageHeader}>
      <div className={styles.pageHeaderInner}>
        <div className={styles.heroTag}>✦ {tx.products.label}</div>
        <h1 className={styles.pageTitle}>{tx.products.title}</h1>
        <p className={styles.pageSub}>{tx.products.sub}</p>
      </div>
    </div>
    <div className={styles.controlsWrap}>
      <div className={styles.controls}>
        <input
          type="text"
          className={styles.searchInput}
          placeholder={lang === "al" ? "Kërko produkte..." : lang === "it" ? "Cerca prodotti..." : "Search products..."}
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <select
          className={styles.dropdown}
          value={activeCategory}
          onChange={e => setActiveCategory(e.target.value)}
        >
          {CATEGORIES.map(cat => (
            <option key={cat} value={cat}>
              {CAT_LABELS[cat]?.[lang] || cat}
            </option>
          ))}
        </select>
      </div>
    </div>
    <div className={styles.gridWrap}>
      {filtered.length === 0 ? (
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>🔍</div>
          {lang === "al" ? "Nuk ka produkte." : lang === "it" ? "Nessun prodotto trovato." : "No products found."}
        </div>
      ) : (
        <div className={styles.grid}>
          {displayed.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      )}
    </div>
    {hasMore && (
      <div className={styles.showMoreWrap}>
        <button className={styles.showMoreBtn} onClick={() => setVisible(v => v + PAGE_SIZE)}>
          {lang === "al" ? "Shfaq më shumë" : lang === "it" ? "Mostra altri" : "Show more"}
        </button>
      </div>
    )}

  </div>
);
}