"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { db } from "../../lib/firebase.js";
import { collection, getDocs } from "firebase/firestore";
import { useLang } from "../../context/LangContext.jsx";
import styles from "./page.module.css";

const TRUST = {
  al: {
    title: "Deshiron të bëhesh partner ynë?",
    sub: "Kontaktoni ekipin tonë dhe bashkëpunoni me ne për të ofruar shërbime më të mira shëndetësore.",
    btn: "Na kontaktoni"
  },
  en: {
    title: "Want to become our partner?",
    sub: "Contact our team and collaborate with us to provide better healthcare services.",
    btn: "Contact us"
  },
  it: {
    title: "Vuoi diventare nostro partner?",
    sub: "Contatta il nostro team e collabora con noi per fornire migliori servizi sanitari.",
    btn: "Contattaci"
  },
};

const GRID_LABELS = {
  al: { tag: "Partnerët tanë", title: "Organizatat me të cilat punojmë" },
  en: { tag: "Our partners",   title: "Organizations we work with" },
  it: { tag: "I nostri partner", title: "Le organizzazioni con cui lavoriamo" },
};

export default function PartnersClient() {
  const { lang, tx } = useLang();
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);

  const trust = TRUST[lang] || TRUST.en;
  const gridLabels = GRID_LABELS[lang] || GRID_LABELS.en;

  useEffect(() => {
    async function loadPartners() {
      try {
        const snap = await getDocs(collection(db, "partners"));
        setPartners(snap.docs.map(d => ({ id: d.id, ...d.data() })));
      } catch (err) {
        console.error("Error loading partners:", err);
      } finally {
        setLoading(false);
      }
    }
    loadPartners();
  }, []);

  useEffect(() => {
    if (!loading) setVisible(true);
  }, [loading]);

  return (
    <div className={styles.page}>

      {/* ══ HERO HEADER ══ */}
      <div className={styles.pageHeader}>
        <div className={styles.pageHeaderInner}>
          <div className={styles.heroTag}>✦ {tx.partners?.label || "Partners"}</div>
          <h1 className={styles.pageTitle}>
            {lang === "al" ? <>Partnerët <span>Tanë</span></> :
             lang === "it" ? <>I Nostri <span>Partner</span></> :
             <>Our <span>Partners</span></>}
          </h1>
          <p className={styles.pageSub}>
            {lang === "al"
              ? "Bashkëpunojmë me organizatat kryesore shëndetësore në Shqipëri."
              : lang === "it"
              ? "Collaboriamo con le principali organizzazioni sanitarie in Albania."
              : "We collaborate with leading healthcare organizations across Albania."}
          </p>
        </div>
      </div>

      {/* ══ GRID ══ */}
      <div className={styles.gridWrap}>
        <div className={styles.gridHeader}>
          <span className={styles.gridTag}>✦ {gridLabels.tag}</span>
          <h2 className={styles.gridTitle}>{gridLabels.title}</h2>
        </div>

        {loading ? (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>⏳</div>
            {lang === "al" ? "Duke u ngarkuar..." : lang === "it" ? "Caricamento..." : "Loading..."}
          </div>
        ) : partners.length === 0 ? (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>🤝</div>
            {lang === "al" ? "Nuk ka partnerë." : lang === "it" ? "Nessun partner." : "No partners found."}
          </div>
        ) : (
          <div className={`${styles.grid} ${visible ? styles.visible : ""}`}>
            {partners.map(p => (
              <div key={p.id} className={styles.partnerCard}>
                <div className={styles.partnerLogo}>
                  {p.logo_url ? (
                    <img
                      src={p.logo_url}
                      alt={p.name}
                      style={{ width: "100%", height: "100%", objectFit: "contain", borderRadius: "50%" }}
                    />
                  ) : (
                    <span>{p.name?.charAt(0)}</span>
                  )}
                </div>
                <div className={styles.partnerName}>{p.name}</div>
                {p.website && (
                  <a
                    href={p.website}
                    target="_blank"
                    rel="noreferrer"
                    className={styles.partnerLink}
                  >
                    {p.website.replace("https://", "").replace("http://", "")} →
                  </a>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ══ TRUST BANNER ══ */}
      <div className={styles.trustBanner}>
        <h2 className={styles.trustTitle}>{trust.title}</h2>
        <p className={styles.trustSub}>{trust.sub}</p>
        <Link href="/contact" className={styles.trustBtn}>
          {trust.btn} →
        </Link>
      </div>

    </div>
  );
}