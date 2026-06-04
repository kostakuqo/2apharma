 "use client";

import { useLang } from "../../context/LangContext.jsx";
import styles from "./page.module.css";

const PARTNERS = [
  { id: 1, name: "Hospital Shefqet Ndroqi" },
  { id: 2, name: "Hygeia Albania" },
  { id: 3, name: "American Hospital" },
  { id: 4, name: "Polyclinic Nr. 3" },
  { id: 5, name: "PharmAlb" },
  { id: 6, name: "Spitali Rajonal Durrës" },
];

export default function PartnersClient() {
  const { lang, tx } = useLang();

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <div className="section-label">{tx.partners.label}</div>
        <h1 className={styles.pageTitle}>
          {lang === "al" ? "Partnerët Tanë" : lang === "it" ? "I Nostri Partner" : "Our Partners"}
        </h1>
        <p className={styles.pageSub}>
          {lang === "al" ? "Bashkëpunojmë me organizatat kryesore shëndetësore në Shqipëri." : lang === "it" ? "Collaboriamo con le principali organizzazioni sanitarie in Albania." : "We collaborate with leading healthcare organizations across Albania."}
        </p>
      </div>

      <div className={styles.grid}>
        {PARTNERS.map(p => (
          <div key={p.id} className={styles.partnerCard}>
            <div className={styles.partnerLogo}>
              <span>{p.name.charAt(0)}</span>
            </div>
            <div className={styles.partnerName}>{p.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
}