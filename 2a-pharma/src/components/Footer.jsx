"use client";

import Link from "next/link";
import { useLang } from "../context/LangContext.jsx";
import styles from "./Footer.module.css";

export default function Footer() {
  const { lang, tx } = useLang();

  return (
    <footer className={styles.footer}>
      <div className={styles.top}>

        <div className={styles.brand}>
          <div className={styles.logoMark}>2A</div>
          <div>
            <div className={styles.logoText}>
              <span>2A</span> Pharma
            </div>
            <div className={styles.logoSub}>Pajisje Mjekësore</div>
          </div>
        </div>

        <div className={styles.cols}>
          <div className={styles.col}>
            <div className={styles.colTitle}>{tx.nav.products}</div>

            <Link href="/products">Diagnostics</Link>
            <Link href="/products">Respiratory</Link>
            <Link href="/products">Consumables</Link>
            <Link href="/products">Mobility</Link>
          </div>

          <div className={styles.col}>
            <div className={styles.colTitle}>Company</div>

            <Link href="/about">{tx.nav.about}</Link>
            <Link href="/partners">{tx.nav.partners}</Link>
            <Link href="/contact">{tx.nav.contact}</Link>
          </div>

          <div className={styles.col}>
            <div className={styles.colTitle}>Contact</div>

            <a href="tel:+355684083950">+355 68 4083 950</a>
            <a href="tel:+355689053225">+355 68 905 3225</a>
            <a href="mailto:info@2apharma.al">info@2apharma.al</a>
            <span>Tiranë, Shqipëri</span>
          </div>
        </div>
      </div>

      <div className={styles.bottom}>
        <div className={styles.copy}>{tx.footer?.copy}</div>

        <div className={styles.links}>
          <Link href="#">{tx.footer?.privacy}</Link>
          <Link href="#">{tx.footer?.terms}</Link>
          <Link href="#">{tx.footer?.sitemap}</Link>
        </div>
      </div>
    </footer>
  );
}