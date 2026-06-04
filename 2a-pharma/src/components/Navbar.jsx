"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLang } from "../context/LangContext.jsx";
import { Home, Info, Package, Handshake, Phone } from "lucide-react";
import styles from "./Navbar.module.css";

const FlagAL = () => (
  <svg width="20" height="14" viewBox="0 0 20 14" xmlns="http://www.w3.org/2000/svg">
    <rect width="20" height="14" fill="#E41E20"/>
    <path d="M10 2 C8.5 2 7 3 7 4.5 C7 5.5 7.5 6 7.5 6 L6 6.5 L7 7 L6.5 8 L8 7.5 L8 9 L9 8.5 L9 10 L10 9.5 L11 10 L11 8.5 L12 9 L12 7.5 L13.5 8 L13 7 L14 6.5 L12.5 6 C12.5 6 13 5.5 13 4.5 C13 3 11.5 2 10 2Z M8.5 4 C8 4 7.5 4.5 8 5 C8 5 7.5 5.5 8.5 5.5Z M11.5 4 C12 4 12.5 4.5 12 5 C12 5 12.5 5.5 11.5 5.5Z" fill="#000"/>
  </svg>
);
const FlagEN = () => (
  <svg width="20" height="14" viewBox="0 0 20 14" xmlns="http://www.w3.org/2000/svg">
    <rect width="20" height="14" fill="#012169"/>
    <path d="M0 0L20 14M20 0L0 14" stroke="#fff" strokeWidth="2.8"/>
    <path d="M0 0L20 14M20 0L0 14" stroke="#C8102E" strokeWidth="1.8"/>
    <path d="M10 0V14M0 7H20" stroke="#fff" strokeWidth="4.5"/>
    <path d="M10 0V14M0 7H20" stroke="#C8102E" strokeWidth="2.8"/>
  </svg>
);
const FlagIT = () => (
  <svg width="20" height="14" viewBox="0 0 20 14" xmlns="http://www.w3.org/2000/svg">
    <rect width="20" height="14" fill="#CE2B37"/>
    <rect width="7" height="14" fill="#009246"/>
    <rect x="7" width="6" height="14" fill="#fff"/>
  </svg>
);

const LANGS = [
  { code: "al", label: "AL", Flag: FlagAL },
  { code: "en", label: "EN", Flag: FlagEN },
  { code: "it", label: "IT", Flag: FlagIT },
];

const NAV_ITEMS = [
  { href: "/",         label: "home",     Icon: Home },
  { href: "/about",    label: "about",    Icon: Info },
  { href: "/products", label: "products", Icon: Package },
  { href: "/partners", label: "partners", Icon: Handshake },
  { href: "/contact",  label: "contact",  Icon: Phone },
];

export default function Navbar() {
  const { lang, toggle, tx } = useLang();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <header className={`${styles.nav} ${scrolled ? styles.scrolled : ""}`}>
        <div className={styles.inner}>
          <Link href="/" className={styles.logo}>
            <div className={styles.logoMark}>2A</div>
            <div className={styles.logoText}>Pharma</div>
          </Link>

          <nav className={styles.links}>
            {NAV_ITEMS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={isActive(href) ? styles.active : ""}
              >
                {tx.nav[label]}
              </Link>
            ))}
          </nav>

          <div className={styles.right}>
            <div className={styles.langGroup}>
              {LANGS.map(({ code, label, Flag }) => (
                <button
                  key={code}
                  className={`${styles.langBtn} ${lang === code ? styles.langActive : ""}`}
                  onClick={() => toggle(code)}
                  title={label}
                >
                  <Flag />
                  <span className={styles.langLabel}>{label}</span>
                </button>
              ))}
            </div>

            <a href="tel:+355684083950" className={styles.phone}>
              <Phone size={14} />
              +355 68 4083 950
            </a>

            <button
              className={styles.hamburger}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Menu"
            >
              <span /><span /><span />
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className={styles.mobileMenu}>
            {NAV_ITEMS.map(({ href, label }) => (
              <Link key={href} href={href} onClick={() => setMenuOpen(false)}>
                {tx.nav[label]}
              </Link>
            ))}
            <div className={styles.mobileLangGroup}>
              {LANGS.map(({ code, label, Flag }) => (
                <button
                  key={code}
                  className={`${styles.mobileLangBtn} ${lang === code ? styles.mobileLangActive : ""}`}
                  onClick={() => { toggle(code); setMenuOpen(false); }}
                >
                  <Flag />
                  <span>{label}</span>
                </button>
              ))}
            </div>
            <a href="tel:+355684083950" className={styles.mobilePhone}>
              +355 68 4083 950
            </a>
          </div>
        )}
      </header>

      <nav className={styles.bottomNav}>
        {NAV_ITEMS.map(({ href, label, Icon }) => (
          <Link
            key={href}
            href={href}
            className={`${styles.bottomNavItem} ${isActive(href) ? styles.bottomNavActive : ""}`}
          >
            <span className={styles.bottomNavIcon}>
              <Icon size={22} strokeWidth={1.8} />
            </span>
            <span className={styles.bottomNavLabel}>{tx.nav[label]}</span>
          </Link>
        ))}
      </nav>
    </>
  );
}