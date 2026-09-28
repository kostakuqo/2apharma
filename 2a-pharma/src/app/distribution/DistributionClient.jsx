"use client";

import Link from "next/link";
import { useLang } from "../../context/LangContext.jsx";
import { CheckCircle2 } from "lucide-react";
import styles from "./page.module.css";

// ADĂUGAT (2026-09-28): diagrama circulară "GDP" trimisă de user (schema cu
// cele 8 zone: Organizational Management, Personnel & Training, Premises &
// Warehouses, Vehicles & Equipment, Container Labeling, Dispatch & Receipt,
// Transportation, Complaints & Recalls) — pune fișierul TĂU la această cale
// (sau schimbă calea aici cu numele fișierului tău). Dacă lipsește, cardul
// rămâne gol — nu dă eroare.
const GDP_DIAGRAM_IMAGE = "/images/distribution/gdp-diagram.png";

// ADĂUGAT (2026-09-28): poză sus, lângă textul de intro — la fel ca pe
// /marketing și /warehousing. Pune fișierul tău la această cale (sau
// schimbă calea aici cu numele fișierului tău).
const DISTRIBUTION_IMAGE = "/images/distribution/distribution-team.jpg";

// Conținut STATIC, pe 3 limbi — la fel ca /warehousing, /pharmacovigilance
// și /marketing, nu vine din Firebase.
const CONTENT = {
  al: {
    tag: "Shërbimet Tona",
    title: "Distribucion",
    sub: "Proces i mirëorganizuar nga magazinimi deri te dorëzimi te klienti, mbështetur nga një rrjet i konsoliduar shpërndarjeje.",
    intro: (
      <>
        <p>
          2A Pharma ofron shërbime të distribucionit të ilaçeve dhe pajisjeve mjekësore, duke
          garantuar një proces të mirëorganizuar nga magazinimi deri te dorëzimi te klienti.
        </p>
        <p>
          Falë një <strong>rrjeti të konsoliduar shpërndarjeje</strong> dhe një ekipi me
          eksperiencë në sektorin farmaceutik, ne sigurojmë furnizim të vazhdueshëm dhe në kohë
          për farmaci, spitale, klinika dhe institucione shëndetësore në të gjithë vendin.
        </p>
      </>
    ),
    offerTitle: "Çfarë ofrojmë?",
    offerList: [
      "Distribucion kombëtar",
      "Furnizim në kohë",
      "Menaxhim të zinxhirit të furnizimit",
      "Ruajtje dhe trajtim të kontrolluar të produkteve",
      "Komunikim të vazhdueshëm me partnerët",
    ],
    closing: (
      <>
        <p>
          Në 2A Pharma, distribucioni nuk është vetëm transporti i një produkti nga një pikë
          në tjetrën. Është një proces i integruar që kërkon organizim, përgjegjshmëri,
          shpejtësi dhe besueshmëri.
        </p>
        <p>
          Qëllimi ynë është t'u ofrojmë partnerëve tanë një zgjidhje të plotë distribucioni,
          duke ndihmuar që produktet të jenë të disponueshme në vendin e duhur, në kohën e
          duhur dhe në kushtet e duhura.
        </p>
      </>
    ),
    ctaTitle: "Keni nevojë për shërbime distribucioni?",
    ctaSub: "Na tregoni për çfarë keni nevojë dhe ekipi ynë do t'ju kontaktojë brenda 24 orësh.",
    ctaBtn: "Na kontaktoni",
  },
  en: {
    tag: "Our Services",
    title: "Distribution",
    sub: "A well-organized process from storage to delivery to the customer, backed by a consolidated distribution network.",
    intro: (
      <>
        <p>
          2A Pharma provides distribution services for medicines and medical equipment,
          ensuring a well-organized process from storage all the way to delivery to the
          customer.
        </p>
        <p>
          Thanks to a <strong>consolidated distribution network</strong> and a team
          experienced in the pharmaceutical sector, we ensure continuous and timely supply
          for pharmacies, hospitals, clinics and healthcare institutions across the country.
        </p>
      </>
    ),
    offerTitle: "What we offer",
    offerList: [
      "National distribution",
      "Timely supply",
      "Supply chain management",
      "Controlled storage and handling of products",
      "Continuous communication with partners",
    ],
    closing: (
      <>
        <p>
          At 2A Pharma, distribution is not just about transporting a product from one point
          to another. It is an integrated process that requires organization,
          responsibility, speed and reliability.
        </p>
        <p>
          Our goal is to offer our partners a complete distribution solution, helping
          products be available in the right place, at the right time and under the right
          conditions.
        </p>
      </>
    ),
    ctaTitle: "Need distribution services?",
    ctaSub: "Tell us what you need and our team will contact you within 24 hours.",
    ctaBtn: "Contact us",
  },
  it: {
    tag: "I Nostri Servizi",
    title: "Distribuzione",
    sub: "Un processo ben organizzato dallo stoccaggio fino alla consegna al cliente, sostenuto da una rete di distribuzione consolidata.",
    intro: (
      <>
        <p>
          2A Pharma offre servizi di distribuzione di farmaci e apparecchiature mediche,
          garantendo un processo ben organizzato dallo stoccaggio fino alla consegna al
          cliente.
        </p>
        <p>
          Grazie a una <strong>rete di distribuzione consolidata</strong> e a un team con
          esperienza nel settore farmaceutico, garantiamo una fornitura continua e puntuale
          per farmacie, ospedali, cliniche e istituzioni sanitarie in tutto il paese.
        </p>
      </>
    ),
    offerTitle: "Cosa offriamo",
    offerList: [
      "Distribuzione nazionale",
      "Fornitura puntuale",
      "Gestione della catena di fornitura",
      "Stoccaggio e gestione controllata dei prodotti",
      "Comunicazione continua con i partner",
    ],
    closing: (
      <>
        <p>
          In 2A Pharma, la distribuzione non è solo il trasporto di un prodotto da un punto
          all'altro. È un processo integrato che richiede organizzazione, responsabilità,
          velocità e affidabilità.
        </p>
        <p>
          Il nostro obiettivo è offrire ai nostri partner una soluzione di distribuzione
          completa, aiutando i prodotti a essere disponibili nel posto giusto, al momento
          giusto e nelle condizioni giuste.
        </p>
      </>
    ),
    ctaTitle: "Avete bisogno di servizi di distribuzione?",
    ctaSub: "Diteci di cosa avete bisogno e il nostro team vi contatterà entro 24 ore.",
    ctaBtn: "Contattaci",
  },
};

export default function DistributionClient() {
  const { lang } = useLang();
  const c = CONTENT[lang] || CONTENT.al;

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <div className={styles.pageHeaderInner}>
          <div className={styles.heroTag}>✦ {c.tag}</div>
          <h1 className={styles.pageTitle}>{c.title}</h1>
          <p className={styles.pageSub}>{c.sub}</p>
        </div>
      </div>

      <div className={styles.gridWrap}>
        {/* ── Intro: text + poză ── */}
        <div className={styles.introRow}>
          <div className={styles.introText}>{c.intro}</div>
          <div className={styles.introImageWrap}>
            <img src={DISTRIBUTION_IMAGE} alt="" className={styles.introImage} />
          </div>
        </div>

        {/* ── Çfarë ofrojmë? ── */}
        <div className={styles.card}>
          <h2 className={styles.cardTitle}>{c.offerTitle}</h2>
          <ul className={styles.checkList}>
            {c.offerList.map((item, i) => (
              <li key={i}>
                <CheckCircle2 size={18} strokeWidth={1.8} className={styles.checkIcon} />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* ── Diagrama GDP ── */}
        <div className={styles.diagramCard}>
          <img src={GDP_DIAGRAM_IMAGE} alt="GDP" className={styles.diagramImage} />
        </div>

        {/* ── Text de închidere ── */}
        <div className={styles.card} style={{ maxWidth: 1100 }}>
          <div className={styles.introText}>{c.closing}</div>
        </div>
      </div>

      <div className={styles.trustBanner}>
        <h2 className={styles.trustTitle}>{c.ctaTitle}</h2>
        <p className={styles.trustSub}>{c.ctaSub}</p>
        <Link href="/contact" className={styles.trustBtn}>
          {c.ctaBtn} →
        </Link>
      </div>
    </div>
  );
}