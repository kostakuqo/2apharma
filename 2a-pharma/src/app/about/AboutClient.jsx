"use client";

import Link from "next/link";
import { useLang } from "../../context/LangContext.jsx";
import styles from "./page.module.css";
import { HeartPulse, Eye, ShieldCheck, Award } from "lucide-react";

const STATS = [
  { num: "10+", labelAl: "Vjet Eksperiencë", labelEn: "Years Experience", labelIt: "Anni di Esperienza" },
  { num: "500+", labelAl: "Produkte", labelEn: "Products", labelIt: "Prodotti" },
  { num: "50+", labelAl: "Partnerë", labelEn: "Partners", labelIt: "Partner" },
  { num: "24/7", labelAl: "Mbështetje", labelEn: "Support", labelIt: "Supporto" },
];

const CARDS = {
  al: [
    { icon: <HeartPulse size={32} />, title: "Misioni Ynë", text: "Të ofrojmë pajisje mjekësore të cilësisë së lartë për institucionet shëndetësore në Shqipëri, duke kontribuar në përmirësimin e kujdesit shëndetësor." },
    { icon: <Eye size={32} />, title: "Vizioni Ynë", text: "Të jemi furnizuesi kryesor dhe më i besueshëm i pajisjeve mjekësore në rajon, i njohur për cilësinë dhe shërbimin e shkëlqyer." },
    { icon: <ShieldCheck size={32} />, title: "Vlerat Tona", text: "Cilësia, integriteti dhe dedikimi ndaj klientëve janë themelet e biznesit tonë. Çdo produkt që ofrojmë kalon standarde strikte kontrolli." },
    { icon: <Award size={32} />, title: "Arritjet Tona", text: "Mbi 10 vjet eksperiencë, mbi 500 produkte të certifikuara dhe bashkëpunim me institucionet kryesore shëndetësore të Shqipërisë." },
  ],
  en: [
    { icon: <HeartPulse size={32} />, title: "Our Mission", text: "To provide high-quality medical equipment to healthcare institutions in Albania, contributing to the improvement of healthcare." },
    { icon: <Eye size={32} />, title: "Our Vision", text: "To be the leading and most trusted supplier of medical equipment in the region, known for quality and excellent service." },
    { icon: <ShieldCheck size={32} />, title: "Our Values", text: "Quality, integrity and dedication to customers are the foundations of our business. Every product we offer passes strict quality control." },
    { icon: <Award size={32} />, title: "Our Achievements", text: "Over 10 years of experience, over 500 certified products and collaboration with Albania's leading healthcare institutions." },
  ],
  it: [
    { icon: <HeartPulse size={32} />, title: "La Nostra Missione", text: "Fornire apparecchiature mediche di alta qualità alle istituzioni sanitarie in Albania, contribuendo al miglioramento dell'assistenza sanitaria." },
    { icon: <Eye size={32} />, title: "La Nostra Visione", text: "Essere il principale e più affidabile fornitore di apparecchiature mediche nella regione, noto per la qualità e il servizio eccellente." },
    { icon: <ShieldCheck size={32} />, title: "I Nostri Valori", text: "Qualità, integrità e dedizione ai clienti sono le fondamenta del nostro business. Ogni prodotto che offriamo supera severi controlli di qualità." },
    { icon: <Award size={32} />, title: "I Nostri Risultati", text: "Oltre 10 anni di esperienza, oltre 500 prodotti certificati e collaborazione con le principali istituzioni sanitarie albanesi." },
  ],
};

const TRUST = {
  al: { title: "Besuar nga institucione në mbarë Shqipërinë", sub: "Bashkohuni me qindra institucione shëndetësore që kanë zgjedhur 2A Pharma si partnerin e tyre të besuar.", btn: "Na kontaktoni" },
  en: { title: "Trusted by institutions across Albania", sub: "Join hundreds of healthcare institutions that have chosen 2A Pharma as their trusted partner.", btn: "Contact us" },
  it: { title: "Fiducia da istituzioni in tutta l'Albania", sub: "Unisciti a centinaia di istituzioni sanitarie che hanno scelto 2A Pharma come partner di fiducia.", btn: "Contattaci" },
};

export default function AboutClient() {
  const { lang, tx } = useLang();
  const cards = CARDS[lang] || CARDS.en;
  const trust = TRUST[lang] || TRUST.en;

  const sectionLabels = {
    al: { tag: "Rreth nesh", title: "Kush jemi ne?", sub: "Mësoni më shumë rreth misionit, visionit dhe vlerave tona." },
    en: { tag: "About us", title: "Who are we?", sub: "Learn more about our mission, vision and values." },
    it: { tag: "Chi siamo", title: "Chi siamo noi?", sub: "Scopri di più sulla nostra missione, visione e valori." },
  };
  const sec = sectionLabels[lang] || sectionLabels.en;

  return (
    <div className={styles.page}>

      {/* ══ HERO ══ */}
      <div className={styles.hero}>
        <div className={styles.heroInner}>
          <div className={styles.heroLabel}>
            ✦ {tx.about?.label || "About"}
          </div>
          <h1 className={styles.heroTitle}>
            {lang === "al" ? <>2A Pharma — <span>Partnerit tuaj</span><br />të shëndetit</> :
             lang === "it" ? <>2A Pharma — <span>Il vostro partner</span><br />per la salute</> :
             <>2A Pharma — <span>Your trusted</span><br />health partner</>}
          </h1>
          <p className={styles.heroSub}>{tx.about?.sub}</p>
        </div>
      </div>

     
      <div className={styles.statsRow}>
        {STATS.map((s, i) => (
          <div key={i} className={styles.statCard}>
            <div className={styles.statNum}>{s.num}</div>
            <div className={styles.statLbl}>
              {lang === "al" ? s.labelAl : lang === "it" ? s.labelIt : s.labelEn}
            </div>
          </div>
        ))}
      </div>

      <div className={styles.content}>
        <div className={styles.contentHeader}>
          <div className={styles.sectionTag}>✦ {sec.tag}</div>
          <h2 className={styles.sectionTitle}>{sec.title}</h2>
          <p className={styles.sectionSub}>{sec.sub}</p>
        </div>

        <div className={styles.cards}>
          {cards.map((c, i) => (
            <div key={i} className={styles.card}>
              <div className={styles.cardIcon}>{c.icon}</div>
              <div className={styles.cardTitle}>{c.title}</div>
              <div className={styles.cardText}>{c.text}</div>
            </div>
          ))}
        </div>
      </div>

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