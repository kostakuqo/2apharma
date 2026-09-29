"use client";

import Link from "next/link";
import { useLang } from "../../context/LangContext.jsx";
import styles from "./page.module.css";

// Poză reală (echipă/depozit) — pune fișierul tău la această cale (sau
// schimbă calea aici).
const QUALITY_IMAGE = "/images/quality-compliance/quality-compliance.jpg";

// Organigrama reală GDP (cele 12 elemente, cu logo-ul 2A Pharma în centru) —
// trimisă de user. Pune fișierul exact la această cale:
// public/images/quality-compliance/gdp-organigram.png
const GDP_DIAGRAM_IMAGE = "/images/quality-compliance/gdp-organigram.png";

// Conținut STATIC, pe 3 limbi.
// Structura paginii urmează organigrama reală GDP trimisă de user (12
// elemente, în jurul logo-ului 2A Pharma).
const CONTENT = {
  al: {
    tag: "Cilësia & Pajtueshmëria",
    title: "Cilësia & Pajtueshmëria / GDP",
    sub: "2A Pharma operon në përputhje të plotë me Praktikat e Mira të Shpërndarjes (GDP), për të garantuar integritetin dhe cilësinë e produkteve mjekësore në çdo hap të zinxhirit të furnizimit.",
    intro: (
      <>
        <p>
          Sistemi ynë i Menaxhimit të Cilësisë (SMC), i bazuar në{" "}
          <strong>ISO 9001:2015</strong> dhe standardet <strong>GDP</strong>, mbulon çdo
          fazë të magazinimit, transportit dhe shpërndarjes së produkteve farmaceutike —
          nga marrja e mallit deri te dorëzimi tek klienti final.
        </p>
        <p>
          Sistemi ynë i cilësisë organizohet në <strong>12 elemente kryesore</strong>,
          paraqitur në organigramën më poshtë.
        </p>
      </>
    ),
    diagramTitle: "12 Elementet e Sistemit Tonë GDP",
    diagramCaption:
      "Organigrama e Sistemit të Menaxhimit të Cilësisë GDP në 2A Pharma.",
    pillars: [
      { title: "Procedurat GDP", text: "Procedura standarde operative (SOP), sistemi dhe pajtueshmëria e plotë me kërkesat e Praktikave të Mira të Shpërndarjes." },
      { title: "Persona Përgjegjëse", text: "Mbikëqyrje e drejtpërdrejtë dhe pajtueshmëri rregullatore, e siguruar nga një person i emëruar zyrtarisht." },
      { title: "Karantinë & Çlirim", text: "Menaxhimi i statusit të produktit dhe autorizimi për çlirim, vetëm pas konfirmimit të përputhshmërisë me specifikat." },
      { title: "FEFO", text: "First Expiry, First Out — menaxhimi i stokut sipas datës së skadimit, për të minimizuar humbjet." },
      { title: "Gjurmueshmëria", text: "Ndjekja e plotë e produktit, nga marrja e mallit deri te dorëzimi final tek klienti." },
      { title: "Kontrolli i Dokumentacionit", text: "Dokumente dhe regjistra të kontrolluara, të përditësuara dhe lehtësisht të aksesueshme." },
      { title: "Trajnimi i Stafit", text: "Trajnim fillestar dhe i vazhdueshëm për të gjithë stafin e përfshirë në zinxhirin e furnizimit." },
      { title: "Devijimet & CAPA", text: "Investigim i çdo devijimi, si dhe veprime korrektuese dhe parandaluese (CAPA) për të shmangur përsëritjen." },
      { title: "Ankesat", text: "Menaxhimi dhe investigimi i çdo ankese lidhur me cilësinë e produktit apo shërbimit." },
      { title: "Kthimet", text: "Vlerësimi dhe trajtimi i produkteve të kthyera, sipas kushteve të ruajtjes dhe integritetit." },
      { title: "Tërheqjet e Produkteve", text: "Tërheqja e produkteve nga tregu dhe njoftimi rregullator, kur është e nevojshme." },
      { title: "Produktet e Falsifikuara", text: "Identifikimi dhe parandalimi i hyrjes së produkteve të dyshuara si të falsifikuara në zinxhirin e furnizimit." },
    ],
    responsibleLabel: "Persona Përgjegjëse (Responsible Person)",
    responsibleRole:
      "Personi i emëruar zyrtarisht, përgjegjës për mbikëqyrjen e sistemit të cilësisë, autorizimin e çlirimit të produkteve dhe komunikimin me autoritetet rregullatore (AKBPM).",
    ctaTitle: "Keni pyetje mbi cilësinë apo pajtueshmërinë tonë?",
    ctaSub: "Ekipi ynë i Cilësisë është në dispozicion për çdo pyetje apo kërkesë për dokumentacion.",
    ctaBtn: "Na kontaktoni",
  },
  en: {
    tag: "Quality & Compliance",
    title: "Quality & Compliance / GDP",
    sub: "2A Pharma operates in full compliance with Good Distribution Practice (GDP), to guarantee the integrity and quality of medical products at every step of the supply chain.",
    intro: (
      <>
        <p>
          Our Quality Management System (QMS), based on <strong>ISO 9001:2015</strong> and{" "}
          <strong>GDP</strong> standards, covers every stage of storage, transport and
          distribution of pharmaceutical products — from goods receipt to final delivery.
        </p>
        <p>
          Our quality system is organized around <strong>12 core elements</strong>, shown in
          the diagram below.
        </p>
      </>
    ),
    diagramTitle: "The 12 Elements of Our GDP System",
    diagramCaption: "2A Pharma's GDP Quality Management System diagram.",
    pillars: [
      { title: "GDP Procedures", text: "Standard operating procedures (SOPs), system and full compliance with Good Distribution Practice requirements." },
      { title: "Responsible Person", text: "Direct oversight and regulatory compliance, ensured by an officially appointed individual." },
      { title: "Quarantine & Release", text: "Status management and authorization for release, only after specification compliance is confirmed." },
      { title: "FEFO", text: "First Expiry, First Out — stock management by expiry date, to minimize losses." },
      { title: "Traceability", text: "End-to-end product tracking, from goods receipt to final delivery to the customer." },
      { title: "Document Control", text: "Controlled documents and records, kept up to date and readily accessible." },
      { title: "Staff Training", text: "Initial and ongoing training for all staff involved in the supply chain." },
      { title: "Deviations & CAPA", text: "Investigation of every deviation, together with corrective and preventive actions (CAPA) to prevent recurrence." },
      { title: "Complaints", text: "Management and investigation of every complaint regarding product or service quality." },
      { title: "Returns", text: "Assessment and handling of returned products, according to storage conditions and integrity." },
      { title: "Recalls", text: "Market withdrawal of products and regulatory notification, when necessary." },
      { title: "Falsified Products", text: "Detection and prevention of suspected falsified products entering the supply chain." },
    ],
    responsibleLabel: "Responsible Person",
    responsibleRole:
      "Officially appointed individual responsible for overseeing the quality system, authorizing product release, and liaising with regulatory authorities (AKBPM).",
    ctaTitle: "Questions about our quality or compliance?",
    ctaSub: "Our Quality team is available for any question or documentation request.",
    ctaBtn: "Contact us",
  },
  it: {
    tag: "Qualità & Conformità",
    title: "Qualità & Conformità / GDP",
    sub: "2A Pharma opera in piena conformità con le Buone Pratiche di Distribuzione (GDP), per garantire l'integrità e la qualità dei prodotti medicali in ogni fase della catena di fornitura.",
    intro: (
      <>
        <p>
          Il nostro Sistema di Gestione della Qualità (SGQ), basato su{" "}
          <strong>ISO 9001:2015</strong> e sugli standard <strong>GDP</strong>, copre ogni
          fase di stoccaggio, trasporto e distribuzione dei prodotti farmaceutici — dalla
          ricezione della merce alla consegna finale.
        </p>
        <p>
          Il nostro sistema di qualità è organizzato attorno a{" "}
          <strong>12 elementi principali</strong>, mostrati nel diagramma qui sotto.
        </p>
      </>
    ),
    diagramTitle: "I 12 Elementi del Nostro Sistema GDP",
    diagramCaption: "Diagramma del Sistema di Gestione della Qualità GDP di 2A Pharma.",
    pillars: [
      { title: "Procedure GDP", text: "Procedure operative standard (SOP), sistema e piena conformità con i requisiti delle Buone Pratiche di Distribuzione." },
      { title: "Persona Responsabile", text: "Supervisione diretta e conformità normativa, garantita da una persona ufficialmente nominata." },
      { title: "Quarantena & Rilascio", text: "Gestione dello stato del prodotto e autorizzazione al rilascio, solo dopo la conferma della conformità alle specifiche." },
      { title: "FEFO", text: "First Expiry, First Out — gestione delle scorte in base alla data di scadenza, per minimizzare le perdite." },
      { title: "Tracciabilità", text: "Tracciamento completo del prodotto, dalla ricezione della merce alla consegna finale al cliente." },
      { title: "Controllo della Documentazione", text: "Documenti e registri controllati, aggiornati e facilmente accessibili." },
      { title: "Formazione del Personale", text: "Formazione iniziale e continua per tutto il personale coinvolto nella catena di fornitura." },
      { title: "Deviazioni & CAPA", text: "Indagine su ogni deviazione, insieme ad azioni correttive e preventive (CAPA) per prevenirne il ripetersi." },
      { title: "Reclami", text: "Gestione e indagine di ogni reclamo relativo alla qualità del prodotto o del servizio." },
      { title: "Resi", text: "Valutazione e gestione dei prodotti resi, in base alle condizioni di stoccaggio e all'integrità." },
      { title: "Ritiri", text: "Ritiro dei prodotti dal mercato e notifica alle autorità regolatorie, quando necessario." },
      { title: "Prodotti Falsificati", text: "Rilevamento e prevenzione dell'ingresso di prodotti sospettati di falsificazione nella catena di fornitura." },
    ],
    responsibleLabel: "Persona Responsabile",
    responsibleRole:
      "Persona ufficialmente nominata, responsabile della supervisione del sistema qualità, dell'autorizzazione al rilascio dei prodotti e dei rapporti con le autorità regolatorie (AKBPM).",
    ctaTitle: "Domande sulla nostra qualità o conformità?",
    ctaSub: "Il nostro team Qualità è a disposizione per qualsiasi domanda o richiesta di documentazione.",
    ctaBtn: "Contattaci",
  },
};

export default function QualityComplianceClient() {
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
        {/* ── Intro: text + poză reală ── */}
        <div className={styles.introRow}>
          <div className={styles.introText}>{c.intro}</div>
          <div className={styles.introImageWrap}>
            <img src={QUALITY_IMAGE} alt="" className={styles.introImage} />
          </div>
        </div>

        {/* ── Organigrama GDP (12 elemente) — poza reală trimisă de user ── */}
        <div>
          <h2 className={styles.cardTitle} style={{ textAlign: "center" }}>
            {c.diagramTitle}
          </h2>
          <div className={styles.diagramWrap}>
            <img src={GDP_DIAGRAM_IMAGE} alt={c.diagramTitle} className={styles.diagramImg} />
            <p className={styles.diagramCaption}>{c.diagramCaption}</p>
          </div>
        </div>

        {/* ── 12 elementet, si karta (të njëjtat emërtime si organigrama) ── */}
        <div className={styles.pillarsGrid}>
          {c.pillars.map((p, i) => (
            <div key={i} className={styles.topicCard}>
              <span className={styles.topicNum}>{String(i + 1).padStart(2, "0")}</span>
              <h3 className={styles.topicTitle}>{p.title}</h3>
              <p className={styles.topicText}>{p.text}</p>
            </div>
          ))}
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