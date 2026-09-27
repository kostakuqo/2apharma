"use client";

import Link from "next/link";
import { useLang } from "../../context/LangContext.jsx";
import styles from "./page.module.css";
import { HeartPulse, Eye, ShieldCheck, Award } from "lucide-react";

const STATS = [
  { num: "10+", labelAl: "Vjet Eksperiencë", labelEn: "Years Experience", labelIt: "Anni di Esperienza" },
  { num: "500+", labelAl: "Produkte në Stok", labelEn: "Products in Stock", labelIt: "Prodotti in Stock" },
  { num: "24-48h", labelAl: "Kohë Dorëzimi", labelEn: "Delivery Time", labelIt: "Tempo di Consegna" },
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

// ADĂUGAT (2026-09-27): textul lung de prezentare a companiei, cerut de
// user, randat în hero, sub titlu/subtitlu — tradus în cele 3 limbi,
// împărțit pe paragrafe (fiecare element din array = un <p>).
const HERO_STORY = {
  al: [
    "2A Pharma u themelua në vitin 2012 dhe specializohet në shpërndarjen e materialeve kirurgjikale, fijeve kirurgjikale (sutura), seteve mjekësore dhe pajisjeve të tjera spitalore. Aktiviteti ynë kryesor është furnizimi i spitaleve, klinikave dhe laboratorëve mjekësorë me produkte dhe pajisje mjekësore me cilësi të lartë.",
    "Objektivi ynë është të bëhemi kombinimi kryesor i Cilësisë dhe Inovacionit në sektorin e kujdesit shëndetësor, të mbështetur nga një ekip me përvojë të gjerë dhe ekspertizë në mjekësi, si dhe në prokurimin dhe furnizimin e materialeve spitalore. Bashkëpunojmë me prodhues dhe furnitorë kryesorë evropianë për t'u ofruar klientëve tanë produkte me cilësi të lartë, të dorëzuara në mënyrë efikase, të besueshme dhe në kohë.",
    "Vizioni ynë bazohet në menaxhimin total të cilësisë, besueshmërinë dhe profesionalizmin. Ne synojmë të përmbushim dhe të kalojmë pritshmëritë e klientëve tanë duke ofruar çmime konkurruese dhe produkte të certifikuara, me cilësi të lartë, në përputhje me standardet e kërkuara. Në 2A Pharma, jemi plotësisht të angazhuar ndaj biznesit tonë dhe ofrimit të zgjidhjeve gjithëpërfshirëse për të përmbushur nevojat e të gjitha specialiteteve kirurgjikale.",
  ],
  en: [
    "2A Pharma was established in 2012 and specializes in the distribution of surgical materials, sutures, medical sets, and other hospital equipment. Our core activity is the supply of hospitals, clinics, and medical laboratories with high-quality medical products and equipment.",
    "Our objective is to become a leading combination of Quality and Innovation in the healthcare sector, supported by a highly experienced team with expertise in medicine and the procurement and supply of hospital materials. We collaborate with leading European manufacturers and suppliers to provide our clients with high-quality products, delivered efficiently, reliably, and on time.",
    "Our vision is founded on total quality management, reliability, and professionalism. We strive to meet and exceed our customers' expectations by offering competitive pricing and certified, high-quality products that comply with the required standards. At 2A Pharma, we are fully committed to our business and to providing comprehensive solutions to meet the needs of all surgical specialties.",
  ],
  it: [
    "2A Pharma è stata fondata nel 2012 ed è specializzata nella distribuzione di materiali chirurgici, suture, set medici e altre attrezzature ospedaliere. La nostra attività principale è la fornitura a ospedali, cliniche e laboratori medici di prodotti e attrezzature mediche di alta qualità.",
    "Il nostro obiettivo è diventare la combinazione leader di Qualità e Innovazione nel settore sanitario, supportati da un team altamente esperto con competenze in medicina e nell'approvvigionamento e fornitura di materiali ospedalieri. Collaboriamo con i principali produttori e fornitori europei per offrire ai nostri clienti prodotti di alta qualità, consegnati in modo efficiente, affidabile e puntuale.",
    "La nostra visione si fonda sulla gestione totale della qualità, sull'affidabilità e sulla professionalità. Ci impegniamo a soddisfare e superare le aspettative dei nostri clienti offrendo prezzi competitivi e prodotti certificati e di alta qualità, conformi agli standard richiesti. In 2A Pharma, siamo pienamente impegnati nella nostra attività e nel fornire soluzioni complete per soddisfare le esigenze di tutte le specialità chirurgiche.",
  ],
};

const TRUST = {
  al: { title: "Besuar nga institucione në mbarë Shqipërinë", sub: "Bashkohuni me qindra institucione shëndetësore që kanë zgjedhur 2A Pharma si partnerin e tyre të besuar.", btn: "Na kontaktoni" },
  en: { title: "Trusted by institutions across Albania", sub: "Join hundreds of healthcare institutions that have chosen 2A Pharma as their trusted partner.", btn: "Contact us" },
  it: { title: "Fiducia da istituzioni in tutta l'Albania", sub: "Unisciti a centinaia di istituzioni sanitarie che hanno scelto 2A Pharma come partner di fiducia.", btn: "Contattaci" },
};

// ADĂUGAT (2026-09-27): secțiune nouă cu poze din ambientul
// magazinului/depozitului — STATIC, la fel ca restul paginii /about.
// Pune fișierele tale reale la aceste căi (public/images/gallery/...) —
// numărul de imagini poate diferi de 6, doar adaugă/șterge linii aici, în
// aceeași ordine în care vrei să apară în grid. Dacă un fișier lipsește,
// celula rămâne goală — nu dă eroare.
const GALLERY_IMAGES = [
  "/images/gallery/store-1.jpg",
  "/images/gallery/store-2.jpg",
  "/images/gallery/store-3.jpg",
  "/images/gallery/store-4.jpg",
  "/images/gallery/store-6.jpg",
  "/images/gallery/store-7.jpg",
];

const GALLERY_LABELS = {
  al: { tag: "Galeria", title: "Ambientet Tona", sub: "Një vështrim brenda dyqanit dhe depos tonë 2A Pharma." },
  en: { tag: "Gallery", title: "Our Premises", sub: "A look inside the 2A Pharma store and warehouse." },
  it: { tag: "Galleria", title: "I Nostri Ambienti", sub: "Uno sguardo all'interno del negozio e del magazzino 2A Pharma." },
};

export default function AboutClient() {
  const { lang, tx } = useLang();
  const cards = CARDS[lang] || CARDS.en;
  const trust = TRUST[lang] || TRUST.en;
  const gallery = GALLERY_LABELS[lang] || GALLERY_LABELS.en;
  const story = HERO_STORY[lang] || HERO_STORY.en;

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

          <div className={styles.heroStory}>
            {story.map((p, i) => (
              <p key={i} className={styles.heroStoryP}>{p}</p>
            ))}
          </div>
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

      {/* ══ GALERIE — poze din ambientul magazinului/depozitului ══ */}
      <div className={styles.galleryContent}>
        <div className={styles.contentHeader}>
          <div className={styles.sectionTag}>✦ {gallery.tag}</div>
          <h2 className={styles.sectionTitle}>{gallery.title}</h2>
          <p className={styles.sectionSub}>{gallery.sub}</p>
        </div>

        <div className={styles.galleryGrid}>
          {GALLERY_IMAGES.map((src, i) => (
            <div key={i} className={styles.galleryItem}>
              <img src={src} alt="" className={styles.galleryImg} />
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