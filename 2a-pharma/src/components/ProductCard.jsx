"use client";

import Link from "next/link";
import { useLang } from "../context/LangContext.jsx";
import styles from "./ProductCard.module.css";

export default function ProductCard({ product }) {
  const { lang, tx } = useLang();

  const name = lang === "al" ? product.name_al : lang === "it" ? product.name_it : product.name_en;
  const desc = lang === "al" ? product.desc_al : lang === "it" ? product.desc_it : product.desc_en;
  const cat  = lang === "al" ? product.category_al : lang === "it" ? product.category_it : product.category_en;

  const stockLabel = tx.stock[product.stock];
  const stockClass = styles[`badge_${product.stock}`];
  const imgClass   = product.image_url ? styles.img_real : styles[`img_${product.stock}`];

  return (
    <div className={styles.card}>
      <div className={`${styles.img} ${imgClass}`}>
        {product.image_url
          ? <img
              src={product.image_url}
              alt={name}
              className={styles.image}
            />
          : <span className={styles.icon}>{product.icon}</span>
        }
      </div>
      <div className={styles.body}>
        <div className={styles.cat}>{cat}</div>
        <div className={styles.name}>{name}</div>
        <div className={styles.desc}>{desc}</div>
        <div className={styles.footer}>
          <span className={`${styles.badge} ${stockClass}`}>{stockLabel}</span>
          <Link href={`/products/${product.id}`} className={styles.detailBtn}>
            {tx.products.details}
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}