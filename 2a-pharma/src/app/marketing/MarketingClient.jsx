"use client";

import Link from "next/link";
import { useLang } from "../../context/LangContext.jsx";
import { CheckCircle2 } from "lucide-react";
import styles from "./page.module.css";

// Poză reală — pune fișierul tău la această cale (sau schimbă calea aici).
const MARKETING_IMAGE = "/images/marketing/marketing-team.jpg";

// Conținut STATIC, pe 3 limbi — la fel ca /warehousing și
// /pharmacovigilance, nu vine din Firebase. Ținut direct în acest fișier
// (nu în LangContext.jsx) pentru că are paragrafe cu porțiuni îngroșate
// (<strong>), mai ușor de scris ca JSX direct decât ca string simplu.
//
// ATENȚIE: în textul tău, numărul de oameni din echipă e scris ca "X" (ex:
// "X profesionistë marketingu dhe x ekspertë") — am păstrat "X" ca atare,
// în toate cele 3 limbi. Înlocuiește-l cu numărul real când îl ai.
const CONTENT = {
  al: {
    tag: "Shërbimet Tona",
    title: "Marketing",
    sub: "Strategji e integruar mes marketingut dhe shitjeve, për të sjellë vlerë të qëndrueshme në treg.",
    intro: (
      <>
        <p>
          Në 2A Pharma, çdo produkt nis me një pyetje të thjeshtë: <strong>çfarë vlere sjell në
          treg dhe si mund të arrijë te njerëzit që kanë nevojë për të?</strong>
        </p>
        <p>
          Ne ndërtojmë strategjinë e çdo produkti duke kombinuar njohjen e tregut, ekspertizën
          farmaceutike dhe një kuptim të thellë të nevojave të profesionistëve të shëndetësisë
          dhe pacientëve. Nga identifikimi i potencialit të një produkti, te pozicionimi,
          komunikimi dhe prezenca e tij në treg, qasja jonë është e strukturuar për të krijuar
          vlerë të qëndrueshme gjatë gjithë ciklit të jetës së produktit.
        </p>
        <p>
          Marketingu dhe shitjet janë pjesë e këtij procesi të integruar:{" "}
          <strong>marketingu përcakton drejtimin</strong>, ekipi ynë në terren e sjell atë drejt
          profesionistëve të shëndetësisë dhe të dhënat nga tregu na ndihmojnë të evoluojmë më
          tej.
        </p>
      </>
    ),
    teamTitle: "Ekipi Ynë",
    teamIntro: (
      <>
        Strategjia bëhet reale përmes njerëzve që e përfaqësojnë atë. Ekipi ynë i përfaqësimit
        përbëhet nga <strong> profesionistë marketingu</strong> dhe{" "}
        <strong>  </strong> me formim në mjekësi dhe farmaci. Ata janë pika jonë e
        kontaktit me profesionistët e shëndetësisë dhe një burim i rëndësishëm informacioni mbi
        zhvillimet e tregut. Përmes tyre, ne krijojmë:
      </>
    ),
    teamList: [
      "Komunikim profesional",
      "Prezencë të vazhdueshme në terren",
      "Feedback nga tregu",
      "Marrëdhënie afatgjata",
    ],
    ctaTitle: "Doni të mësoni më shumë rreth produkteve tona?",
    ctaSub: "Na tregoni për çfarë keni nevojë dhe ekipi ynë do t'ju kontaktojë brenda 24 orësh.",
    ctaBtn: "Na kontaktoni",
  },
  en: {
    tag: "Our Services",
    title: "Marketing",
    sub: "An integrated strategy between marketing and sales, built to create sustainable value in the market.",
    intro: (
      <>
        <p>
          At 2A Pharma, every product starts with a simple question:{" "}
          <strong>what value does it bring to the market, and how can it reach the people
          who need it?</strong>
        </p>
        <p>
          We build the strategy for every product by combining market knowledge,
          pharmaceutical expertise and a deep understanding of the needs of healthcare
          professionals and patients. From identifying a product's potential, to its
          positioning, communication and market presence, our approach is structured to
          create sustainable value throughout the product's entire life cycle.
        </p>
        <p>
          Marketing and sales are part of this integrated process:{" "}
          <strong>marketing sets the direction</strong>, our field team brings it to
          healthcare professionals, and market data helps us evolve further.
        </p>
      </>
    ),
    teamTitle: "Our Team",
    teamIntro: (
      <>
        Strategy becomes real through the people who represent it. Our representation team is
        made up of <strong> marketing professionals</strong> and{" "}
        <strong> experts</strong> trained in medicine and pharmacy. They are our point of
        contact with healthcare professionals and an important source of information on
        market developments. Through them, we create:
      </>
    ),
    teamList: [
      "Professional communication",
      "Continuous field presence",
      "Market feedback",
      "Long-term relationships",
    ],
    ctaTitle: "Want to learn more about our products?",
    ctaSub: "Tell us what you need and our team will contact you within 24 hours.",
    ctaBtn: "Contact us",
  },
  it: {
    tag: "I Nostri Servizi",
    title: "Marketing",
    sub: "Una strategia integrata tra marketing e vendite, costruita per creare valore sostenibile sul mercato.",
    intro: (
      <>
        <p>
          In 2A Pharma, ogni prodotto inizia con una domanda semplice:{" "}
          <strong>quale valore porta sul mercato e come può raggiungere le persone che ne
          hanno bisogno?</strong>
        </p>
        <p>
          Costruiamo la strategia di ogni prodotto combinando la conoscenza del mercato, la
          competenza farmaceutica e una comprensione approfondita delle esigenze dei
          professionisti sanitari e dei pazienti. Dall'identificazione del potenziale di un
          prodotto, al suo posizionamento, comunicazione e presenza sul mercato, il nostro
          approccio è strutturato per creare valore sostenibile lungo tutto il ciclo di vita
          del prodotto.
        </p>
        <p>
          Il marketing e le vendite fanno parte di questo processo integrato:{" "}
          <strong>il marketing definisce la direzione</strong>, il nostro team sul campo la
          porta ai professionisti sanitari e i dati di mercato ci aiutano a evolvere
          ulteriormente.
        </p>
      </>
    ),
    teamTitle: "Il Nostro Team",
    teamIntro: (
      <>
        La strategia diventa reale attraverso le persone che la rappresentano. Il nostro team
        di rappresentanza è composto da <strong> professionisti del marketing</strong> e{" "}
        <strong> esperti</strong> con formazione in medicina e farmacia. Sono il nostro punto
        di contatto con i professionisti sanitari e una fonte importante di informazioni sugli
        sviluppi del mercato. Attraverso di loro, creiamo:
      </>
    ),
    teamList: [
      "Comunicazione professionale",
      "Presenza costante sul campo",
      "Feedback dal mercato",
      "Relazioni a lungo termine",
    ],
    ctaTitle: "Volete saperne di più sui nostri prodotti?",
    ctaSub: "Diteci di cosa avete bisogno e il nostro team vi contatterà entro 24 ore.",
    ctaBtn: "Contattaci",
  },
};

export default function MarketingClient() {
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
            <img src={MARKETING_IMAGE} alt="" className={styles.introImage} />
          </div>
        </div>

        {/* ── Our Team ── */}
        <div className={styles.card}>
          <h2 className={styles.cardTitle}>{c.teamTitle}</h2>
          <p className={styles.cardIntro}>{c.teamIntro}</p>
          <ul className={styles.checkList}>
            {c.teamList.map((item, i) => (
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