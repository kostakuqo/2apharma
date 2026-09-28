"use client";

// CREAT (2026-09-28): componentă partajată pentru grid-ul de carduri de
// Servicii (cerc-iconiță + index numeric, titlu, liniuță de accent,
// descriere). Folosită atât pe pagina /services cât și pe secțiunea
// "Services" de pe Home — un singur loc de adevăr, așa că orice
// modificare de conținut sau de stil aici se vede automat în ambele
// locuri, fără să mai fie nevoie de două copii sincronizate manual.

const SERVICE_ICON_IMAGES = [
  "/images/icons/service-distribution.png",
  "/images/icons/service-regulatory.png",
  "/images/icons/service-marketing.png",
  "/images/icons/service-online-shop.png",
];

// ADĂUGAT (2026-09-28), REPOZIȚIONAT la cererea userului: poza stă acum LA
// MIJLOCUL cardului — cerc-iconiță + index sus, titlu, apoi poza, apoi
// descrierea jos. Pune fișierele primite de la grafician la aceste căi
// (sau schimbă căile cu numele reale primite). Aceeași ordine ca la
// SERVICE_ICON_IMAGES: 1=Distribucion, 2=Shërbime Rregullatore,
// 3=Marketing dhe Shitje, 4=Dyqan Online. Dacă un fișier lipsește, rămâne
// un dreptunghi gol (gri deschis) în locul lui — nu dă eroare.
const SERVICE_CARD_IMAGES = [
  "/images/services/service-distribution.jpg",
  "/images/services/service-regulatory.jpg",
  "/images/services/service-marketing.jpg",
  "/images/services/service-online-shop.jpg",
];

import Link from "next/link";
import styles from "./ServicesGrid.module.css";

// ADĂUGAT (2026-09-28), la cererea userului: fiecare card e acum clicabil
// și duce la pagina /services (link implicit — poți da alt `linkTo` dacă
// vrei altă destinație într-un anumit loc unde folosești componenta).
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
        return (
          <Link key={i} href={linkTo} className={styles.serviceCard}>
            <div className={styles.serviceCardBody}>
              <div className={styles.serviceCardTop}>
                <div className={styles.serviceIconCircle}>
                  <img src={iconSrc} alt="" className={styles.serviceIconImg} />
                </div>
                <span className={styles.serviceIndex}>
                  {String(i + 1).padStart(2, "0")}
                </span>
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