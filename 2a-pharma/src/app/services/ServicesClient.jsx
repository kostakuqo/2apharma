"use client";

import { useLang } from "../../context/LangContext.jsx";
import ServicesGrid from "../../components/ServicesGrid.jsx";
import styles from "./page.module.css";

// Conținut STATIC — nu vine din Firebase (confirmat cu userul).
//
// SCHIMBAT (2026-09-28): grid-ul de carduri (cerc-iconiță + index, titlu,
// liniuță de accent, descriere) a fost mutat în componenta partajată
// components/ServicesGrid.jsx, folosită acum și pe secțiunea "Services"
// de pe Home — un singur loc de adevăr pentru conținut ȘI stil, la
// cererea userului.
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

      <div className={styles.gridWrap}>
        <ServicesGrid
          services={services}
          emptyLabel={
            lang === "al"
              ? "Nuk ka shërbime të listuara."
              : lang === "it"
                ? "Nessun servizio elencato."
                : "No services listed."
          }
        />
      </div>
    </div>
  );
}