"use client";

import Link from "next/link";
import { useLang } from "../../context/LangContext.jsx";
import { ArrowRight } from "lucide-react";
import styles from "./page.module.css";

// Poză reală — pune fișierul tău la această cale (sau schimbă calea aici).
const ONLINE_SHOP_IMAGE = "/images/online-shop/online-shop.jpg";

// Conținut STATIC, pe 3 limbi — la fel ca celelalte pagini noi de servicii.
// SCHIMBAT (2026-09-28): pagina asta e mai scurtă decât celelalte (nu are
// listă de puncte) — user a trimis doar un text scurt de tip "hero" +
// buton "Zbuloni produktet →", care duce spre pagina existentă /products
// (catalogul real de produse, deja construit pe site).
const CONTENT = {
  al: {
    tag: "Shërbimet Tona",
    title: "Dyqan Online",
    sub: "Kujdesi që kërkoni, tashmë më pranë jush.",
    body: (
      <>
        <p>
          Eksploroni katalogun e produkteve të 2A Pharma, njihuni me produktet tona,
          zgjidhni ato që i përshtaten nevojave tuaja dhe porosisni lehtësisht online.
        </p>
        <p>
          Për çdo pyetje apo nevojë për asistencë, ekipi ynë është gjithmonë në dispozicion
          për t'ju ndihmuar. <strong>Ju kujdeseni për zgjedhjen, ne kujdesemi për pjesën
          tjetër.</strong>
        </p>
      </>
    ),
    ctaBtn: "Zbuloni produktet",
  },
  en: {
    tag: "Our Services",
    title: "Online Shop",
    sub: "The care you're looking for, now closer to you.",
    body: (
      <>
        <p>
          Explore 2A Pharma's product catalogue, get to know our products, choose the ones
          that fit your needs and order easily online.
        </p>
        <p>
          For any question or need for assistance, our team is always available to help
          you. <strong>You take care of choosing, we take care of the rest.</strong>
        </p>
      </>
    ),
    ctaBtn: "Discover products",
  },
  it: {
    tag: "I Nostri Servizi",
    title: "Negozio Online",
    sub: "L'assistenza che cerchi, ora più vicina a te.",
    body: (
      <>
        <p>
          Esplora il catalogo dei prodotti di 2A Pharma, scopri i nostri prodotti, scegli
          quelli adatti alle tue esigenze e ordina facilmente online.
        </p>
        <p>
          Per qualsiasi domanda o necessità di assistenza, il nostro team è sempre a
          disposizione per aiutarti. <strong>Tu pensi alla scelta, noi pensiamo al
          resto.</strong>
        </p>
      </>
    ),
    ctaBtn: "Scopri i prodotti",
  },
};

export default function OnlineShopClient() {
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
          <div className={styles.introText}>
            {c.body}
            {/* DEZACTIVAT (2026-09-28), la cererea userului: deocamdată nu
                arătăm produsele, deci butonul spre /products e scos temporar.
                Ca să-l aduci înapoi, scoate comentariul de mai jos. */}
            {/* <Link href="/products" className={styles.trustBtn} style={{ marginTop: 8 }}>
              {c.ctaBtn} <ArrowRight size={16} />
            </Link> */}
          </div>
          <div className={styles.introImageWrap}>
            <img src={ONLINE_SHOP_IMAGE} alt="" className={styles.introImage} />
          </div>
        </div>
      </div>
    </div>
  );
}