"use client";

const SERVICE_ICON_IMAGES = [
  "/images/icons/service-distribution.png",
  "/images/icons/service-regulatory.png",
  "/images/icons/service-marketing.png",
  "/images/icons/service-online-shop.png",
  "/images/icons/service-warehousing.png",
  "/images/icons/service-pharmacovigilance.png",
];
const SERVICE_CARD_IMAGES = [
  "/images/services/service-distribution.jpg",
  "/images/services/service-regulatory.jpg",
  "/images/services/service-marketing.jpg",
  "/images/services/service-online-shop.jpg",
  "/images/services/service-warehousing.jpg",
  "/images/services/service-pharmacovigilance.jpg",
];

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
        const iconSrc = SERVICE_ICON_IMAGES[i % SERVICE_ICON_IMAGES.length];
        const cardImgSrc = SERVICE_CARD_IMAGES[i % SERVICE_CARD_IMAGES.length];
        // SCHIMBAT (2026-09-28): fiecare serviciu poate avea acum un `href`
        // propriu (ex. "Depozitimi"/"Warehousing" → /warehousing) — dacă nu
        // are, se folosește `linkTo` (implicit /services), ca înainte.
        const href = s.href || linkTo;
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