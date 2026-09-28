"use client";

import Link from "next/link";
import { useLang } from "../../context/LangContext.jsx";
import { CheckCircle2 } from "lucide-react";
import styles from "./page.module.css";

// Poze reale — pune fișierele tale la aceste căi (sau schimbă calea aici).
// WAREHOUSE_IMAGE_1 = poza din secțiunea de sus (echipa la depozitare).
// WAREHOUSE_IMAGE_2 = poza din secțiunea "Warehousing Services" (rafturi).
const WAREHOUSE_IMAGE_1 = "/images/warehousing/warehousing-operations.jpg";
const WAREHOUSE_IMAGE_2 = "/images/warehousing/warehousing-storage.jpg";

// Conținut STATIC, pe 3 limbi — la fel ca /about și /events-news, nu vine
// din Firebase. Ținut direct în acest fișier (nu în LangContext.jsx)
// pentru că are paragrafe cu porțiuni îngroșate (<strong>), mai ușor de
// scris ca JSX direct decât ca string simplu în obiectul de traduceri.
const CONTENT = {
  al: {
    tag: "Shërbimet Tona",
    title: "Operacionet e Magazinimit",
    sub: "Infrastrukturë moderne e magazinimit, mbështetur nga sisteme IT të plota, për shpërndarjen e produkteve mjekësore në të gjithë Shqipërinë.",
    intro: (
      <>
        <p>
          Kemi krijuar një <strong>rrjet të zgjeruar operacionesh magazinimi</strong> për
          të përmbushur angazhimin tonë ndaj klientëve.
        </p>
        <p>
          Depoja jonë kryesore përbëhet nga{" "}
          <strong>pajisjet më moderne logjistike dhe mbështetet nga shërbime IT të plota.</strong>{" "}
          Ofrojmë zgjidhjen më të mirë për shpërndarjen e produkteve mjekësore në Shqipëri.
        </p>
      </>
    ),
    proceduresTitle: "Procedurat e Magazinimit",
    proceduresIntro: (
      <>
       {" "}
        <strong> Bazuar ne sistemin e menaxhimit të cilësisë ISO 9001:2015</strong>, ofrojmë të gjitha
        kategoritë e ruajtjes sipas standardeve të BE-së:
      </>
    ),
    procedures: [
      "Ruajtje në temperaturë normale: 15°–25°C",
      "Dhomë e ftohtë: 2°–8°C",
      "Ilaçe të kontrolluara dhe të rrezikshme (Narkotike & Psikotrope)",
      "Ruajtje mostrash mjekësore dhe materialesh promocionale",
    ],
    servicesTitle: "Shërbimet e Magazinimit",
    services: [
      "Import, eksport dhe magazinim",
      "Stok në konsinjacion",
      "Menaxhim dhe kontroll i inventarit",
      "Logjistikë e avancuar",
      "Përpunim dhe administrim porosish",
      "Etiketim, bar-kodim, paketim",
      "Kontroll cilësie",
      "Rimbushje statike dhe dinamike",
      "Ndërtim ngarkese (load building)",
      "Dërgesa ekspres",
      "Depo doganore",
      "Shpejtësi e lartë dhe gjurmueshmëri",
      "Mbështetje për shërbimin ndaj klientit",
      "Mbështetje e plotë nga një ekip profesionist IT",
      
    ],
    ctaTitle: "Keni nevojë për shërbime magazinimi?",
    ctaSub: "Na tregoni për çfarë keni nevojë dhe ekipi ynë do t'ju kontaktojë brenda 24 orësh.",
    ctaBtn: "Na kontaktoni",
  },
  en: {
    tag: "Our Services",
    title: "Warehousing Operations",
    sub: "Modern warehousing infrastructure, backed by complete IT services, for medical product distribution across Albania.",
    intro: (
      <>
        <p>
          We have created an <strong>extended network of warehousing operations</strong>{" "}
          to fulfill our commitment to our customers.
        </p>
        <p>
          Our main warehouse consists of the{" "}
          <strong>most modern logistics equipment and is supported with complete IT services.</strong>{" "}
          We offer the best solution for medical products distribution in Albania.
        </p>
      </>
    ),
    proceduresTitle: "Warehousing Procedures",
    proceduresIntro: (
      <>
        
        <strong>Quality management system ISO 9001:2015</strong>, we offer all storage
        categories based on EU standards:
      </>
    ),
    procedures: [
      "Normal temperature storage: 15°–25°C",
      "Cold room storage: 2°–8°C",
      "Controlled drugs & hazardous drugs (Narcotic & Psychotropic drugs)",
      "Medical samples & promotional material storage",
    ],
    servicesTitle: "Warehousing Services",
    services: [
      "Import, export and storage",
      "Consignment stock",
      "Inventory management and control",
      "Advanced logistics",
      "Order processing and administration",
      "Labeling, bar-coding, packaging",
      "Quality control",
      "Static and dynamic replenishment",
      "Load building",
      "Express delivery consignments",
      "Customs warehouse",
      "High speed and traceability",
      "Customer service support",
      "Full support by a professional IT team",
      
    ],
    ctaTitle: "Need warehousing services?",
    ctaSub: "Tell us what you need and our team will contact you within 24 hours.",
    ctaBtn: "Contact us",
  },
  it: {
    tag: "I Nostri Servizi",
    title: "Operazioni di Magazzinaggio",
    sub: "Infrastruttura di magazzinaggio moderna, supportata da servizi IT completi, per la distribuzione di prodotti medicali in tutta l'Albania.",
    intro: (
      <>
        <p>
          Abbiamo creato una <strong>rete estesa di operazioni di magazzinaggio</strong>{" "}
          per adempiere al nostro impegno verso i clienti.
        </p>
        <p>
          Il nostro magazzino principale è composto dalle{" "}
          <strong>attrezzature logistiche più moderne ed è supportato da servizi IT completi.</strong>{" "}
          Offriamo la migliore soluzione per la distribuzione di prodotti medicali in Albania.
        </p>
      </>
    ),
    proceduresTitle: "Procedure di Magazzinaggio",
    proceduresIntro: (
      <>
       
        <strong>Sistema di gestione della qualità ISO 9001:2015</strong>, offriamo tutte
        le categorie di stoccaggio secondo gli standard UE:
      </>
    ),
    procedures: [
      "Stoccaggio a temperatura normale: 15°–25°C",
      "Cella frigorifera: 2°–8°C",
      "Farmaci controllati e pericolosi (Narcotici & Psicotropi)",
      "Stoccaggio di campioni medici e materiale promozionale",
    ],
    servicesTitle: "Servizi di Magazzinaggio",
    services: [
      "Importazione, esportazione e stoccaggio",
      "Stock in conto deposito",
      "Gestione e controllo dell'inventario",
      "Logistica avanzata",
      "Elaborazione e amministrazione degli ordini",
      "Etichettatura, codici a barre, imballaggio",
      "Controllo qualità",
      "Rifornimento statico e dinamico",
      "Costruzione del carico (load building)",
      "Consegne espresse",
      "Magazzino doganale",
      "Alta velocità e tracciabilità",
      "Assistenza clienti",
      "Supporto completo da un team IT professionale",
      
    ],
    ctaTitle: "Avete bisogno di servizi di magazzinaggio?",
    ctaSub: "Diteci di cosa avete bisogno e il nostro team vi contatterà entro 24 ore.",
    ctaBtn: "Contattaci",
  },
};

export default function WarehousingClient() {
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
            <img src={WAREHOUSE_IMAGE_1} alt="" className={styles.introImage} />
          </div>
        </div>

        {/* ── Warehousing Procedures ── */}
        <div className={styles.card}>
          <h2 className={styles.cardTitle}>{c.proceduresTitle}</h2>
          <p className={styles.cardIntro}>{c.proceduresIntro}</p>
          <ul className={styles.checkList}>
            {c.procedures.map((item, i) => (
              <li key={i}>
                <CheckCircle2 size={18} strokeWidth={1.8} className={styles.checkIcon} />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* ── Warehousing Services: poză + card ── */}
        <div className={styles.servicesRow}>
          <div className={styles.servicesImageWrap}>
            <img src={WAREHOUSE_IMAGE_2} alt="" className={styles.servicesImage} />
          </div>
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