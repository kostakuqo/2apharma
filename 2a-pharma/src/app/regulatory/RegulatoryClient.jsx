"use client";

import Link from "next/link";
import { useLang } from "../../context/LangContext.jsx";
import { CheckCircle2 } from "lucide-react";
import styles from "./page.module.css";

// Poză reală — pune fișierul tău la această cale (sau schimbă calea aici).
const REGULATORY_IMAGE = "/images/regulatory/regulatory-team.jpg";

// Conținut STATIC, pe 3 limbi — la fel ca /marketing, /warehousing,
// /pharmacovigilance și /distribution, nu vine din Firebase.
const CONTENT = {
  al: {
    tag: "Shërbimet Tona",
    title: "Shërbime Rregullatore për Barna",
    sub: "Mbështetje e specializuar për partnerët farmaceutikë në proceset rregullatore dhe menaxhimin e portofolit të barnave në tregun shqiptar.",
    intro: (
      <>
        <p>
          2A Pharma ofron <strong>mbështetje të specializuar</strong> për partnerët
          farmaceutikë në proceset rregullatore dhe menaxhimin e portofolit të barnave në
          tregun shqiptar.
        </p>
        <p>
          Ne asistojmë partnerët në përmbushjen e kërkesave rregullatore përgjatë gjithë
          ciklit të jetës së produktit, duke siguruar një proces të strukturuar, të
          koordinuar dhe në përputhje me kërkesat ligjore në fuqi.
        </p>
      </>
    ),
    servicesTitle: "Shërbimet tona përfshijnë",
    services: [
      "Regjistrimin e barnave dhe ndjekjen e procedurave përkatëse rregullatore.",
      "Menaxhimin e ndryshimeve rregullatore dhe përditësimin e dokumentacionit.",
      "Përgatitjen dhe administrimin e dokumentacionit të nevojshëm për produktet farmaceutike.",
      "Komunikimin dhe koordinimin me autoritetet kompetente gjatë proceseve rregullatore.",
      "Mbështetjen e portofolit të barnave nga faza e hyrjes në treg dhe përgjatë gjithë ciklit të jetës së produktit.",
    ],
    ctaTitle: "Keni nevojë për mbështetje rregullatore?",
    ctaSub: "Na tregoni për çfarë keni nevojë dhe ekipi ynë do t'ju kontaktojë brenda 24 orësh.",
    ctaBtn: "Na kontaktoni",
  },
  en: {
    tag: "Our Services",
    title: "Medicine Regulatory Services",
    sub: "Specialized support for pharmaceutical partners in regulatory processes and drug portfolio management in the Albanian market.",
    intro: (
      <>
        <p>
          2A Pharma provides <strong>specialized support</strong> to pharmaceutical partners
          in regulatory processes and drug portfolio management in the Albanian market.
        </p>
        <p>
          We assist partners in meeting regulatory requirements throughout the entire
          product life cycle, ensuring a structured, coordinated process that complies with
          applicable legal requirements.
        </p>
      </>
    ),
    servicesTitle: "Our services include",
    services: [
      "Drug registration and follow-up of the relevant regulatory procedures.",
      "Management of regulatory changes and documentation updates.",
      "Preparation and administration of the documentation required for pharmaceutical products.",
      "Communication and coordination with the competent authorities during regulatory processes.",
      "Support for the drug portfolio from market entry through the entire product life cycle.",
    ],
    ctaTitle: "Need regulatory support?",
    ctaSub: "Tell us what you need and our team will contact you within 24 hours.",
    ctaBtn: "Contact us",
  },
  it: {
    tag: "I Nostri Servizi",
    title: "Servizi Regolatori Farmaceutici",
    sub: "Supporto specializzato ai partner farmaceutici nei processi regolatori e nella gestione del portafoglio di farmaci sul mercato albanese.",
    intro: (
      <>
        <p>
          2A Pharma offre <strong>supporto specializzato</strong> ai partner farmaceutici nei
          processi regolatori e nella gestione del portafoglio di farmaci sul mercato
          albanese.
        </p>
        <p>
          Assistiamo i partner nel soddisfare i requisiti regolatori lungo tutto il ciclo di
          vita del prodotto, garantendo un processo strutturato, coordinato e conforme ai
          requisiti legali vigenti.
        </p>
      </>
    ),
    servicesTitle: "I nostri servizi includono",
    services: [
      "Registrazione dei farmaci e monitoraggio delle relative procedure regolatorie.",
      "Gestione delle modifiche regolatorie e aggiornamento della documentazione.",
      "Preparazione e amministrazione della documentazione necessaria per i prodotti farmaceutici.",
      "Comunicazione e coordinamento con le autorità competenti durante i processi regolatori.",
      "Supporto al portafoglio di farmaci dalla fase di ingresso sul mercato lungo tutto il ciclo di vita del prodotto.",
    ],
    ctaTitle: "Avete bisogno di supporto regolatorio?",
    ctaSub: "Diteci di cosa avete bisogno e il nostro team vi contatterà entro 24 ore.",
    ctaBtn: "Contattaci",
  },
};

export default function RegulatoryClient() {
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
            <img src={REGULATORY_IMAGE} alt="" className={styles.introImage} />
          </div>
        </div>

        {/* ── Shërbimet tona përfshijnë ── */}
        <div className={styles.card}>
          <h2 className={styles.cardTitle}>{c.servicesTitle}</h2>
          <ul className={styles.checkList}>
            {c.services.map((item, i) => (
              <li key={i}>
                <CheckCircle2 size={18} strokeWidth={1.8} className={styles.checkIcon} />
                <span>{item}</span>
              </li>
            ))}
          </ul>
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