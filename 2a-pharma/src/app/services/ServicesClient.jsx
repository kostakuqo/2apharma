"use client";

import { useLang } from "../../context/LangContext.jsx";
import styles from "./page.module.css";

// Conținut STATIC — nu vine din Firebase (confirmat cu userul). Iconițele
// se mapează pozițional pe `tx.services.items`, ca la FEATURE_ICONS din
// HomeClient.jsx — dacă adaugi/ștergi un serviciu în translations, doar
// adaugă/șterge și o imagine în array-ul de mai jos, în aceeași ordine.
//
// LAYOUT (2026-09-27): REDESENAT, la cererea userului, dintr-o listă
// verticală simplă (rând cu cerc-iconiță în stânga + text) într-un grid de
// carduri pe 2 coloane — fiecare card are cerc-iconiță sus, titlu,
// liniuță de accent verde, descriere și un efect de hover (ridicare +
// umbră + accent), consistent cu stilul cardurilor de pe restul site-ului
// (ex. .card din /about, .fCard din Home). Secțiunea hero cu imagine +
// titlu suprapus rămâne, dar are acum și un tag mic + un subtitlu.
//
// IMAGINEA HERO: pune fișierul tău la public/images/services-hero.jpg (sau
// schimbă calea de mai jos cu numele real al fișierului tău). Dacă
// fișierul lipsește, secțiunea rămâne cu un fundal navy/verde în gradient —
// nu dă eroare, dar arată gol până adaugi imaginea.
const HERO_IMAGE = "/images/services-hero.jpg";

// SCHIMBAT (2026-09-27): iconițele din cod (lucide-react) au fost
// înlocuite cu imagini reale — designerul le creează separat (logo-uri /
// pictograme proprii). Pune fișierele la căile de mai jos (sau schimbă
// căile cu numele reale ale fișierelor primite). Dacă un fișier lipsește,
// cercul rămâne gol — nu dă eroare.
const SERVICE_ICON_IMAGES = [
  "/images/icons/service-distribution.png",
  "/images/icons/service-regulatory.png",
  "/images/icons/service-marketing.png",
  "/images/icons/service-online-shop.png",
];

const LABELS = {
  al: { tag: "Çfarë Ofrojmë", sub: "Zgjidhje të plota për çdo hallkë të furnizimit me ilace dhe pajisje mjekësore." },
  en: { tag: "What We Offer", sub: "Comprehensive solutions across every step of medical equipment supply." },
  it: { tag: "Cosa Offriamo", sub: "Soluzioni complete per ogni fase della fornitura di apparecchiature mediche." },
};

export default function ServicesClient() {
  const { lang, tx } = useLang();
  const services = tx.services?.items || [];
  const l = LABELS[lang] || LABELS.en;

  const heroTitle =
    lang === "al" ? "Shërbimet" : lang === "it" ? "Servizi" : "Services";

  return (
    <div className={styles.page}>
      <div
        className={styles.imageHero}
        style={{ backgroundImage: `url(${HERO_IMAGE})` }}
      >
        <div className={styles.imageHeroOverlay} />
        <div className={styles.imageHeroInner}>
          <div className={styles.imageHeroTag}>✦ {l.tag}</div>
          <h1 className={styles.imageHeroTitle}>{heroTitle}</h1>
          <p className={styles.imageHeroSub}>{l.sub}</p>
        </div>
      </div>

      {services.length === 0 ? (
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>🛠️</div>
          {lang === "al"
            ? "Nuk ka shërbime të listuara."
            : lang === "it"
              ? "Nessun servizio elencato."
              : "No services listed."}
        </div>
      ) : (
        <div className={styles.servicesGrid}>
          {services.map((s, i) => {
            const iconSrc = SERVICE_ICON_IMAGES[i % SERVICE_ICON_IMAGES.length];
            return (
              <div key={i} className={styles.serviceCard}>
                <div className={styles.serviceCardTop}>
                  <div className={styles.serviceIconCircle}>
                    <img src={iconSrc} alt="" className={styles.serviceIconImg} />
                  </div>
                  <span className={styles.serviceIndex}>{String(i + 1).padStart(2, "0")}</span>
                </div>
                <h3 className={styles.serviceRowTitle}>{s.title}</h3>
                <div className={styles.serviceAccent} />
                <p className={styles.serviceRowDesc}>{s.desc}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}