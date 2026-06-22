"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useLang } from "../../context/LangContext.jsx";
import { getProducts } from "../../lib/getProducts.js";
import ProductCard from "../../components/ProductCard.jsx";
import Map from "../../components/Map.jsx";
import styles from "./page.module.css";
import { db } from "../../lib/firebase.js";
import { collection, getDocs } from "firebase/firestore";

const STATS = [
  { num: "500+", label: "Products", labelAl: "Produkte" },
  { num: "50+", label: "Partners", labelAl: "Partnerë" },
  { num: "10+", label: "Years", labelAl: "Vjet" },
];

const IconShield = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>;
const IconPhone = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.47 2 2 0 0 1 3.58 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.54a16 16 0 0 0 6.29 6.29l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" /></svg>;
const IconArrow = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>;
const IconTruck = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="1" y="3" width="15" height="13" /><path d="M16 8h4l3 3v5h-7V8z" /><circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" /></svg>;
const IconCert = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="8" r="6" /><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" /></svg>;
const IconHeadset = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 18v-6a9 9 0 0 1 18 0v6" /><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3v5z" /><path d="M3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3v5z" /></svg>;
const IconRefresh = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="23 4 23 10 17 10" /><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" /></svg>;

const FEATURE_ICONS = [
  <IconCert key="cert" />,
  <IconTruck key="truck" />,
  <IconHeadset key="headset" />,
  <IconRefresh key="refresh" />
];

export default function HomeClient() {
  const { lang, tx } = useLang();
  const [featured, setFeatured] = useState([]);
  const [partners, setPartners] = useState([]);

  useEffect(() => {
    async function load() {
      try {
        const data = await getProducts();
        setFeatured(data.slice(0, 3));

        const snap = await getDocs(collection(db, "partners"));
        setPartners(
          snap.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          }))
        );
      } catch (err) {
        console.error(err);
      }
    }

    load();
  }, []);

  return (
    <>
      <div className={styles.darkBlock}>

        {/* ══ HERO ══ */}
        <section className={styles.hero}>
          <video
            className={styles.heroBgVideo}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
          >
            <source src="/videos/hero-1135993583-640_adpp_is.mp4" type="video/mp4" />
          </video>
          <div className={styles.heroOverlay} />

          <div className={styles.heroLeft}>
            <div className={styles.heroBadge}>
              <IconShield /> {tx.hero.badge}
            </div>
            <h1 className={styles.heroTitle}>
              {tx.hero.title1}<br />
              <span>{tx.hero.title2}</span><br />
              {tx.hero.title3}
            </h1>
            <p className={styles.heroSub}>{tx.hero.sub}</p>
            <div className={styles.heroBtns}>
              <Link href="/products" className={styles.btnGreen}>
                {tx.hero.btnProducts} <IconArrow />
              </Link>
              <Link href="/contact" className={styles.btnOutline}>
                <IconPhone /> {tx.hero.btnContact}
              </Link>
            </div>
            <div className={styles.heroStats}>
              {STATS.map((s, i) => (
                <div key={i} className={styles.statItem}>
                  <div className={styles.statNum}>{s.num}</div>
                  <div className={styles.statLbl}>{lang === "al" ? s.labelAl : s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ PRODUCTS ══ */}
        <section className={styles.productsSection}>
          <div className={styles.secHeader}>
            <div className="section-label">{tx.products.label}</div>
            <h2 className={styles.secTitle}>{tx.products.title}</h2>
            <p className={styles.secSub}>{tx.products.sub}</p>
          </div>
          <div className={styles.productsGrid}>
            {featured.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
          <div className={styles.viewAllWrap}>
            <Link href="/products" className={styles.viewAllBtn}>
              {tx.products.viewAll} <IconArrow />
            </Link>
          </div>
        </section>

        {/* ══ FEATURES ══ */}
        <section className={styles.featuresSection}>
          <div className={styles.secHeaderCenter}>
            <div className="section-label">{tx.features.label}</div>
            <h2 className={styles.secTitle}>{tx.features.title}</h2>
          </div>
          <div className={styles.featuresGrid}>
            {tx.features.items.map((f, i) => (
              <div key={i} className={styles.fCard}>
                <div className={styles.fIcon}>{FEATURE_ICONS[i]}</div>
                <div className={styles.fTitle}>{f.title}</div>
                <div className={styles.fDesc}>{f.desc}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ══ CTA ══ */}
        <section className={styles.ctaSection}>
          <h2 className={styles.ctaTitle}>
            {lang === "al"
              ? "Keni nevojë për pajisje mjekësore?"
              : lang === "it"
                ? "Hai bisogno di apparecchiature mediche?"
                : "Need medical equipment?"}
          </h2>
          <p className={styles.ctaSub}>
            {lang === "al"
              ? "Kontaktoni ekipin tonë sot dhe do t'ju ndihmojmë të gjeni zgjidhjen e duhur."
              : lang === "it"
                ? "Contatta il nostro team oggi e ti aiuteremo a trovare la soluzione giusta."
                : "Contact our team today and we'll help you find the right solution."}
          </p>
          <Link href="/contact" className={styles.btnWhite}>
            <IconPhone />
            {lang === "al" ? "Na kontaktoni" : lang === "it" ? "Contattaci" : "Contact us"} <IconArrow />
          </Link>
        </section>

      </div>

      {/* ══ PARTNERS ══ */}
      <section className={styles.partnersSection}>
        <div className={styles.partnersLabel}>{tx.partners.title}</div>
        <div className={styles.partnersRow}>
          {partners.map(p => (
            <div key={p.id} className={styles.partner}>
              {p.logo_url ? (
                <img
                  src={p.logo_url}
                  alt={p.name}
                  style={{ height: "60px", width: "auto", objectFit: "contain" }}
                />
              ) : (
                p.name
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ══ MAP ══ */}
      <section style={{ padding: "0 var(--section-px)" }}>
        <Map />
      </section>
    </>
  );
}