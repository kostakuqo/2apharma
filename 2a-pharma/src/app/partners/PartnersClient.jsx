"use client";

import { useState, useEffect } from "react";
import { db } from "../../lib/firebase.js";
import { collection, getDocs } from "firebase/firestore";
import { useLang } from "../../context/LangContext.jsx";
import styles from "./page.module.css";

export default function PartnersClient() {
  const { lang, tx } = useLang();

  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    async function loadPartners() {
      try {
        const snap = await getDocs(collection(db, "partners"));
        setPartners(
          snap.docs.map((d) => ({
            id: d.id,
            ...d.data(),
          }))
        );
      } catch (err) {
        console.error("Error loading partners:", err);
      } finally {
        setLoading(false);
      }
    }

    loadPartners();
  }, []);

  useEffect(() => {
    if (!loading) {
      setVisible(true);
    }
  }, [loading]);

  return (
    <div className={styles.page}>
      {/* HEADER */}
      <div className={styles.pageHeader}>
        <div className="section-label">
          {tx.partners.label}
        </div>

        <h1 className={styles.pageTitle}>
          {lang === "al"
            ? "Partnerët Tanë"
            : lang === "it"
            ? "I Nostri Partner"
            : "Our Partners"}
        </h1>

        <p className={styles.pageSub}>
          {lang === "al"
            ? "Bashkëpunojmë me organizatat kryesore shëndetësore në Shqipëri."
            : lang === "it"
            ? "Collaboriamo con le principali organizzazioni sanitarie in Albania."
            : "We collaborate with leading healthcare organizations across Albania."}
        </p>
      </div>

      {/* LOADING */}
      {loading ? (
        <div style={{ textAlign: "center", padding: "60px", color: "#7A8BA8" }}>
          {lang === "al"
            ? "Duke u ngarkuar..."
            : lang === "it"
            ? "Caricamento..."
            : "Loading..."}
        </div>
      ) : partners.length === 0 ? (
        <div style={{ textAlign: "center", padding: "60px", color: "#7A8BA8" }}>
          {lang === "al"
            ? "Nuk ka partnerë."
            : lang === "it"
            ? "Nessun partner."
            : "No partners found."}
        </div>
      ) : (
        /* GRID */
        <div className={`${styles.grid} ${visible ? styles.visible : ""}`}>
          {partners.map((p) => (
            <div key={p.id} className={styles.partnerCard}>
              {/* LOGO */}
              <div className={styles.partnerLogo}>
                {p.logo_url ? (
                  <img
                    src={p.logo_url}
                    alt={p.name}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                      borderRadius: "50%",
                    }}
                  />
                ) : (
                  <span>{p.name?.charAt(0)}</span>
                )}
              </div>

              {/* NAME */}
              <div className={styles.partnerName}>
                {p.name}
              </div>

              {/* WEBSITE */}
              {p.website && (
                <a
                  href={p.website}
                  target="_blank"
                  rel="noreferrer"
                >
                  {p.website
                    .replace("https://", "")
                    .replace("http://", "")}
                </a>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}