"use client";

import Link from "next/link";
import { useLang } from "../../context/LangContext.jsx";
import { Phone, Mail } from "lucide-react";
import styles from "./page.module.css";

// Poză reală — pune fișierul tău la această cale (sau schimbă calea aici).
const PV_IMAGE = "/images/pharmacovigilance/pharmacovigilance-team.jpg";

// ATENȚIE: telefonul și email-ul de mai jos sunt PLACEHOLDER (am refolosit
// numărul general de pe site) — spune-mi numărul/email-ul REAL dedicat
// farmakovigjilencës (dacă e diferit de cel general) și le schimb.
const PV_PHONE = "+355 68 4083950";
const PV_PHONE_HREF = "tel:+355684083950";
const PV_EMAIL = "pv@2a-pharma.al";

// Conținut STATIC, pe 3 limbi — la fel ca /warehousing, /about și
// /events-news, nu vine din Firebase. Ținut direct în acest fișier pentru
// paragrafele cu porțiuni îngroșate (<strong>).
const CONTENT = {
  al: {
    tag: "Shërbimet Tona",
    title: "Farmakovigjilenca",
    sub: "Menaxhojmë sigurinë e produktit përmes mbledhjes, zbulimit, vlerësimit, monitorimit, raportimit dhe parandalimit.",
    availTitle: "Në Dispozicion 24/7/365",
    availText: (
      <>
        <strong>Nëse po hasni reagime anësore nga trajtimi juaj</strong>, ju lutem na
        kontaktoni menjëherë.
      </>
    ),
    productSafetyTitle: "Siguria e Produktit",
    productSafetyText: (
      <>
        Menaxhojmë sigurinë e produktit{" "}
        <strong>
          përmes mbledhjes, zbulimit, vlerësimit, monitorimit, raportimit dhe parandalimit
        </strong>{" "}
        të rasteve të efekteve anësore të ilaçeve (ADR), si dhe të ngjarjeve të tjera të
        lidhura me ilaçet.
      </>
    ),
    responsibilityTitle: "Përgjegjësia",
    respPara1: (
      <>
        Departamenti ynë i farmakovigjilencës{" "}
        <strong>siguron përputhshmëri me rregulloret në fuqi</strong> dhe/ose procedurat
        standarde të operimit. Ofrojmë gjithashtu partnerëve tanë specialistë në
        menaxhimin e sigurisë së barnave, provave klinike dhe mbikëqyrjes mjekësore.
      </>
    ),
    respPara2:
      "Ekipi ynë i shërbimit të farmakovigjilencës arkivon me saktësi dokumentet e farmakovigjilencës; shqyrton të dhënat e rasteve të sigurisë për plotësi dhe saktësi; monitoron raportet periodike të sigurisë përmes rishikimit të cilësisë; ndihmon në gjurmimin, dorëzimin dhe shpërndarjen e raporteve periodike; dhe mbështet projekte të ndryshme ad-hoc të farmakovigjilencës.",
    ctaBtn: "Na kontaktoni",
  },
  en: {
    tag: "Our Services",
    title: "Pharmacovigilance",
    sub: "We manage product safety via the collection, detection, assessment, monitoring, reporting and prevention.",
    availTitle: "Available 24/7/365",
    availText: (
      <>
        <strong>If you are encountering adverse reactions to your treatment</strong>,
        please contact us immediately.
      </>
    ),
    productSafetyTitle: "Product Safety",
    productSafetyText: (
      <>
        We manage product safety{" "}
        <strong>via the collection, detection, assessment, monitoring, reporting and prevention</strong>{" "}
        of medicine side effects (ADR) cases as well as medicine related adverse events.
      </>
    ),
    responsibilityTitle: "Responsibility",
    respPara1: (
      <>
        Our{" "}
        <strong>pharmacovigilance department ensures compliance with applicable regulations</strong>{" "}
        and/or standard operating procedures. We also offer our partners specialists in
        drug safety management, clinical trials and medical supervision.
      </>
    ),
    respPara2:
      "Our pharmacovigilance service team accurately archives pharmacovigilance documents; reviews safety case data for completeness and accuracy; monitors periodic safety reports through quality review; assists with tracking, submitting and distribution of periodic reports; and supports various ad-hoc deliverables and pharmacovigilance projects.",
    ctaBtn: "Contact us",
  },
  it: {
    tag: "I Nostri Servizi",
    title: "Farmacovigilanza",
    sub: "Gestiamo la sicurezza del prodotto attraverso la raccolta, il rilevamento, la valutazione, il monitoraggio, la segnalazione e la prevenzione.",
    availTitle: "Disponibili 24/7/365",
    availText: (
      <>
        <strong>Se state riscontrando reazioni avverse al vostro trattamento</strong>,
        contattateci immediatamente.
      </>
    ),
    productSafetyTitle: "Sicurezza del Prodotto",
    productSafetyText: (
      <>
        Gestiamo la sicurezza del prodotto{" "}
        <strong>attraverso la raccolta, il rilevamento, la valutazione, il monitoraggio, la segnalazione e la prevenzione</strong>{" "}
        dei casi di effetti collaterali dei farmaci (ADR) e degli eventi avversi
        correlati ai farmaci.
      </>
    ),
    responsibilityTitle: "Responsabilità",
    respPara1: (
      <>
        Il nostro{" "}
        <strong>dipartimento di farmacovigilanza garantisce la conformità alle normative applicabili</strong>{" "}
        e/o alle procedure operative standard. Offriamo inoltre ai nostri partner
        specialisti nella gestione della sicurezza dei farmaci, sperimentazioni
        cliniche e supervisione medica.
      </>
    ),
    respPara2:
      "Il nostro team del servizio di farmacovigilanza archivia con precisione i documenti di farmacovigilanza; esamina i dati dei casi di sicurezza per completezza e accuratezza; monitora i rapporti periodici di sicurezza attraverso la revisione della qualità; assiste nel tracciamento, invio e distribuzione dei rapporti periodici; e supporta vari deliverable ad-hoc e progetti di farmacovigilanza.",
    ctaBtn: "Contattaci",
  },
};

export default function PharmacovigilanceClient() {
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
        {/* ── Available 24/7/365 + poză ── */}
        <div className={styles.availRow}>
          <div className={styles.availCard}>
            <h2 className={styles.availTitle}>{c.availTitle}</h2>
            <p className={styles.availText}>{c.availText}</p>
            <a href={PV_PHONE_HREF} className={styles.availContactLine}>
              <Phone size={16} strokeWidth={1.8} />
              {PV_PHONE}
            </a>
            <a href={`mailto:${PV_EMAIL}`} className={styles.availContactLine}>
              <Mail size={16} strokeWidth={1.8} />
              {PV_EMAIL}
            </a>
          </div>
          <div className={styles.availImageWrap}>
            <img src={PV_IMAGE} alt="" className={styles.availImage} />
          </div>
        </div>

        {/* ── Product Safety ── */}
        <div className={styles.textSection}>
          <h2 className={styles.sectionTitle}>{c.productSafetyTitle}</h2>
          <p className={styles.sectionText}>{c.productSafetyText}</p>
        </div>

        {/* ── Responsibility ── */}
        <div className={styles.card}>
          <h2 className={styles.cardTitle}>{c.responsibilityTitle}</h2>
          <p className={styles.cardText}>{c.respPara1}</p>
          <p className={styles.cardText}>{c.respPara2}</p>
          <Link href="/contact" className={styles.cardLink}>
            {c.ctaBtn} →
          </Link>
        </div>
      </div>
    </div>
  );
}