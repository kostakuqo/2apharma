"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useLang } from "../../../context/LangContext.jsx";
import { db } from "../../../lib/firebase.js";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import styles from "./page.module.css";

const IconArrowLeft = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M19 12H5M12 5l-7 7 7 7" />
  </svg>
);

const IconPhone = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.47 2 2 0 0 1 3.58 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.54a16 16 0 0 0 6.29 6.29l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const IconMail = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

const labels = {
  al: {
    notFound: "Produkti nuk u gjet",
    back: "Kthehu te produktet",
    backBtn: "Kthehu",
    related: "Produkte të ngjashme",
    contactPrice: "Na kontaktoni për çmim",
    sendEmail: "Dërgo email",
  },
  en: {
    notFound: "Product not found",
    back: "Back to products",
    backBtn: "Go back",
    related: "Related products",
    contactPrice: "Contact us for price",
    sendEmail: "Send email",
  },
  it: {
    notFound: "Prodotto non trovato",
    back: "Torna ai prodotti",
    backBtn: "Indietro",
    related: "Prodotti correlati",
    contactPrice: "Contattaci per il prezzo",
    sendEmail: "Invia email",
  },
};

export default function ProductDetailClient() {
  const { id } = useParams();
  const router = useRouter();

  const { lang, tx } = useLang();
  const lb = labels[lang] || labels.en;

  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    async function load() {
      setLoading(true);

      try {
        const docRef = doc(db, "products", id);
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
          setProduct(null);
          setLoading(false);
          return;
        }

        const p = { id: docSnap.id, ...docSnap.data() };
        setProduct(p);

        const snap = await getDocs(collection(db, "products"));
        const all = snap.docs.map(d => ({ id: d.id, ...d.data() }));

        setRelated(
          all.filter(r => r.category_en === p.category_en && r.id !== p.id).slice(0, 3)
        );

      } catch (err) {
        console.error(err);
        setProduct(null);
      }

      setLoading(false);
    }

    load();
  }, [id]);

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "60vh" }}>
        {lang === "al" ? "Duke u ngarkuar..." : "Loading..."}
      </div>
    );
  }

  if (!product) {
    return (
      <div className={styles.notFound}>
        <div className={styles.notFoundIcon}>🔍</div>
        <h2>{lb.notFound}</h2>
        <Link href="/products" className={styles.backBtn}>
          <IconArrowLeft /> {lb.back}
        </Link>
      </div>
    );
  }

  const name =
    lang === "al" ? product.name_al :
    lang === "it" ? product.name_it :
    product.name_en;

  const desc =
    lang === "al" ? product.desc_al :
    lang === "it" ? product.desc_it :
    product.desc_en;

  const cat =
    lang === "al" ? product.category_al :
    lang === "it" ? product.category_it :
    product.category_en;

  const stock = tx.stock?.[product.stock] || product.stock;

  return (
    <div className={styles.page}>

      <div className={styles.breadcrumb}>
        <Link href="/">{tx.nav.home}</Link>
        <span>/</span>
        <Link href="/products">{tx.nav.products}</Link>
        <span>/</span>
        <span className={styles.breadActive}>{name}</span>
      </div>

      <div className={styles.mainGrid}>
        <div className={styles.imageWrap}>
          <div className={`${styles.imageBox} ${!product.image_url ? styles[`img_${product.stock}`] : ""}`}>
            {product.image_url ? (
              <img src={product.image_url} alt={name} className={styles.productImage} />
            ) : (
              <span className={styles.productIcon}>{product.icon}</span>
            )}
          </div>

          <div className={`${styles.stockBadge} ${styles[`badge_${product.stock}`]}`}>
            {stock}
          </div>
        </div>

        <div className={styles.info}>
          <div className={styles.cat}>{cat}</div>
          <h1 className={styles.name}>{name}</h1>
          <p className={styles.desc}>{desc}</p>

          <div className={styles.cta}>
            <a href="tel:+355684083950" className={styles.ctaBtnPrimary}>
              <IconPhone /> {lb.contactPrice}
            </a>
            <a href="mailto:info@2apharma.al" className={styles.ctaBtnOutline}>
              <IconMail /> {lb.sendEmail}
            </a>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <div className={styles.relatedSection}>
          <h2 className={styles.relatedTitle}>{lb.related}</h2>

          <div className={styles.relatedGrid}>
            {related.map(p => {
              const rName =
                lang === "al" ? p.name_al :
                lang === "it" ? p.name_it :
                p.name_en;

              return (
                <Link key={p.id} href={`/products/${p.id}`} className={styles.relatedCard}>
                  <div className={`${styles.relatedImg} ${!p.image_url ? styles[`img_${p.stock}`] : ""}`}>
                    {p.image_url ? (
                      <img src={p.image_url} alt={rName} />
                    ) : (
                      <span>{p.icon}</span>
                    )}
                  </div>

                  <div className={styles.relatedBody}>
                    <div className={styles.relatedName}>{rName}</div>
                    <span className={`${styles.relatedBadge} ${styles[`badge_${p.stock}`]}`}>
                      {tx.stock?.[p.stock] || p.stock}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}

      <div className={styles.backWrap}>
        <button className={styles.backBtn} onClick={() => router.back()}>
          <IconArrowLeft /> {lb.backBtn}
        </button>
      </div>

    </div>
  );
}