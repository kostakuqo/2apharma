"use client";

import { useLang } from "../../context/LangContext.jsx";
import styles from "./page.module.css";
import {
  HeartPulse,
  Eye,
  ShieldCheck,
  Award
} from "lucide-react";

const STATS = [
  { num: "10+", labelAl: "Vjet Eksperiencë", labelEn: "Years Experience", labelIt: "Anni di Esperienza" },
  { num: "500+", labelAl: "Produkte", labelEn: "Products", labelIt: "Prodotti" },
  { num: "50+", labelAl: "Partnerë", labelEn: "Partners", labelIt: "Partner" },
  { num: "24/7", labelAl: "Mbështetje", labelEn: "Support", labelIt: "Supporto" },
];

const CARDS = {
  al: [
    {
      icon: <HeartPulse size={34} />,
      title: "Misioni Ynë",
      text: "Të ofrojmë pajisje mjekësore të cilësisë së lartë për institucionet shëndetësore në Shqipëri, duke kontribuar në përmirësimin e kujdesit shëndetësor."
    },
    {
      icon: <Eye size={34} />,
      title: "Vizioni Ynë",
      text: "Të jemi furnizuesi kryesor dhe më i besueshëm i pajisjeve mjekësore në rajon, i njohur për cilësinë dhe shërbimin e shkëlqyer."
    },
    {
      icon: <ShieldCheck size={34} />,
      title: "Vlerat Tona",
      text: "Cilësia, integriteti dhe dedikimi ndaj klientëve janë themelet e biznesit tonë. Çdo produkt që ofrojmë kalon standarde strikte kontrolli."
    },
    {
      icon: <Award size={34} />,
      title: "Arritjet Tona",
      text: "Mbi 10 vjet eksperiencë, mbi 500 produkte të certifikuara dhe bashkëpunim me institucionet kryesore shëndetësore të Shqipërisë."
    }
  ],

  en: [
    {
      icon: <HeartPulse size={34} />,
      title: "Our Mission",
      text: "To provide high-quality medical equipment to healthcare institutions in Albania, contributing to the improvement of healthcare."
    },
    {
      icon: <Eye size={34} />,
      title: "Our Vision",
      text: "To be the leading and most trusted supplier of medical equipment in the region, known for quality and excellent service."
    },
    {
      icon: <ShieldCheck size={34} />,
      title: "Our Values",
      text: "Quality, integrity and dedication to customers are the foundations of our business. Every product we offer passes strict quality control."
    },
    {
      icon: <Award size={34} />,
      title: "Our Achievements",
      text: "Over 10 years of experience, over 500 certified products and collaboration with Albania's leading healthcare institutions."
    }
  ],

  it: [
    {
      icon: <HeartPulse size={34} />,
      title: "La Nostra Missione",
      text: "Fornire apparecchiature mediche di alta qualità alle istituzioni sanitarie in Albania, contribuendo al miglioramento dell'assistenza sanitaria."
    },
    {
      icon: <Eye size={34} />,
      title: "La Nostra Visione",
      text: "Essere il principale e più affidabile fornitore di apparecchiature mediche nella regione, noto per la qualità e il servizio eccellente."
    },
    {
      icon: <ShieldCheck size={34} />,
      title: "I Nostri Valori",
      text: "Qualità, integrità e dedizione ai clienti sono le fondamenta del nostro business. Ogni prodotto che offriamo supera severi controlli di qualità."
    },
    {
      icon: <Award size={34} />,
      title: "I Nostri Risultati",
      text: "Oltre 10 anni di esperienza, oltre 500 prodotti certificati e collaborazione con le principali istituzioni sanitarie albanesi."
    }
  ]
};

export default function AboutClient() {
  const { lang, tx } = useLang();
  const cards = CARDS[lang] || CARDS.en;

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <div className="section-label">{tx.about.label}</div>
        <h1 className={styles.pageTitle}>{tx.about.title}</h1>
        <p className={styles.pageSub}>{tx.about.sub}</p>
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
  );
}