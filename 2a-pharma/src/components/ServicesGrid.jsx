"use client";

// SCHIMBAT (2026-09-29): pozele erau alese după POZIȚIA din listă
// (i % 6) — cu 6 poze definite, al 7-lea serviciu (sau orice serviciu nou
// adăugat) "împrumuta" poza primului (Distribution). Acum fiecare poză e
// legată de `href`-ul serviciului, deci fiecare card arată mereu poza lui
// corectă, indiferent de câte servicii sunt sau în ce ordine apar.
//
// ADAUGĂ AICI o poză nouă de fiecare dată când adaugi un serviciu nou în
// LangContext.jsx (services.items) — cheia trebuie să fie exact `href`-ul
// acelui serviciu.
const SERVICE_ICON_IMAGES = {
  "/distribution": "/images/icons/service-distribution.png",
  "/regulatory": "/images/icons/service-regulatory.png",
  "/marketing": "/images/icons/service-marketing.png",
  "/online-shop": "/images/icons/service-online-shop.png",
  "/warehousing": "/images/icons/service-warehousing.png",
  "/pharmacovigilance": "/images/icons/service-pharmacovigilance.png",
  "/quality-compliance": "/images/icons/service-quality-compliance.png",
  "/cold-chain": "/images/icons/service-cold-chain.png",
};
const SERVICE_CARD_IMAGES = {
  "/distribution": "/images/services/service-distribution.jpg",
  "/regulatory": "/images/services/service-regulatory.jpg",
  "/marketing": "/images/services/service-marketing.jpg",
  "/online-shop": "/images/services/service-online-shop.jpg",
  "/warehousing": "/images/services/service-warehousing.jpg",
  "/pharmacovigilance": "/images/services/service-pharmacovigilance.jpg",
  "/quality-compliance": "/images/services/service-quality-compliance.jpg",
  "/cold-chain": "/images/services/service-cold-chain.jpg",
};

// Fallback, doar pentru un serviciu fără `href` cunoscut mai sus (nu ar
// trebui să se întâmple în mod normal, dar nu lăsăm cardul fără poză).
const FALLBACK_ICON = "/images/icons/service-distribution.png";
const FALLBACK_CARD = "/images/services/service-distribution.jpg";

import Link from "next/link";
import styles from "./ServicesGrid.module.css";

export default function ServicesGrid({ services, emptyLabel, linkTo = "/services" }) {
  if (!services || services.length === 0) {
    return (
      <div className={styles.emptyState}>
        <div className={styles.emptyIcon}>🛠️</div>
        {emptyLabel || "No services listed."}
      </div>
    );
  }
  return (
    <div className={styles.servicesGrid}>
      {services.map((s, i) => {
        // SCHIMBAT (2026-09-28): fiecare serviciu poate avea acum un `href`
        // propriu (ex. "Depozitimi"/"Warehousing" → /warehousing) — dacă nu
        // are, se folosește `linkTo` (implicit /services), ca înainte.
        const href = s.href || linkTo;
        const iconSrc = SERVICE_ICON_IMAGES[href] || FALLBACK_ICON;
        const cardImgSrc = SERVICE_CARD_IMAGES[href] || FALLBACK_CARD;
        return (
          <Link key={i} href={href} className={styles.serviceCard}>
            <div className={styles.serviceCardBody}>
              <div className={styles.serviceCardTop}>
                <div className={styles.serviceIconCircle}>
                  <img src={iconSrc} alt="" className={styles.serviceIconImg} />
                </div>
                <span className={styles.serviceIndex}>{String(i + 1).padStart(2, "0")}</span>
              </div>
              <h3 className={styles.serviceRowTitle}>{s.title}</h3>
              <img src={cardImgSrc} alt="" className={styles.serviceCardImage} />
              <div className={styles.serviceAccent} />
              <p className={styles.serviceRowDesc}>{s.desc}</p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}