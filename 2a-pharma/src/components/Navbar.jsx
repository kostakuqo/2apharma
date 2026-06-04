"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLang } from "../context/LangContext.jsx";
import { Home, Info, Package, Handshake, Phone, Search, X } from "lucide-react";
import { getProducts } from "../lib/getProducts.js";
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
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [allProducts, setAllProducts] = useState([]);
  const [results, setResults] = useState([]);
  const searchWrapRef = useRef(null);
  const searchInputRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // încarcă produsele o singură dată
  useEffect(() => {
    getProducts().then(setAllProducts).catch(console.error);
  }, []);

  // filtrează live
  useEffect(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) { setResults([]); return; }
    const filtered = allProducts.filter(p =>
      p.name_al?.toLowerCase().includes(q) ||
      p.name_en?.toLowerCase().includes(q) ||
      p.name_it?.toLowerCase().includes(q) ||
      p.category_en?.toLowerCase().includes(q)
    ).slice(0, 6);
    setResults(filtered);
  }, [searchQuery, allProducts]);

  useEffect(() => {
    if (searchOpen) setTimeout(() => searchInputRef.current?.focus(), 300);
    else { setSearchQuery(""); setResults([]); }
  }, [searchOpen]);

  // închide la click afară
  useEffect(() => {
    const handleClick = (e) => {
      if (searchWrapRef.current && !searchWrapRef.current.contains(e.target)) {
        setSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const isActive = (href) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const searchPlaceholder =
    lang === "al" ? "Kërko produkte..." :
    lang === "it" ? "Cerca prodotti..." :
    "Search products...";

  const getName = (p) =>
    lang === "al" ? p.name_al : lang === "it" ? p.name_it : p.name_en;

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
              <Link key={href} href={href} className={isActive(href) ? styles.active : ""}>
                {tx.nav[label]}
              </Link>
            ))}
          </nav>

          <div className={styles.right}>
            {/* Search desktop */}
            <div
              ref={searchWrapRef}
              className={`${styles.searchWrap} ${searchOpen ? styles.searchOpen : ""}`}
            >
              <button
                type="button"
                className={styles.searchBtn}
                onClick={() => setSearchOpen(o => !o)}
                aria-label="Search"
              >
                {searchOpen ? <X size={16} /> : <Search size={16} />}
              </button>
              <input
                ref={searchInputRef}
                type="text"
                className={styles.searchInput}
                placeholder={searchPlaceholder}
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                tabIndex={searchOpen ? 0 : -1}
              />
              {searchOpen && results.length > 0 && (
                <div className={styles.dropdown}>
                  {results.map(p => (
                    <Link
                      key={p.id}
                      href={`/products/${p.id}`}
                      className={styles.dropdownItem}
                      onClick={() => setSearchOpen(false)}
                    >
                      <div className={styles.dropdownImg}>
                        {p.image_url
                          ? <img src={p.image_url} alt="" />
                          : <span>{p.icon}</span>
                        }
                      </div>
                      <div className={styles.dropdownInfo}>
                        <div className={styles.dropdownName}>{getName(p)}</div>
                        <div className={styles.dropdownCat}>{p.category_en}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
              {searchOpen && searchQuery.trim() && results.length === 0 && (
                <div className={styles.dropdown}>
                  <div className={styles.dropdownEmpty}>
                    {lang === "al" ? "Nuk u gjet asgjë." : lang === "it" ? "Nessun risultato." : "No results found."}
                  </div>
                </div>
              )}
            </div>

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
            {/* Mobile search */}
            <div className={styles.mobileSearchWrap}>
              <Search size={15} color="var(--gray-400)" />
              <input
                type="text"
                placeholder={searchPlaceholder}
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className={styles.mobileSearchInput}
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery("")} style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}>
                  <X size={14} color="var(--gray-400)" />
                </button>
              )}
            </div>
            {/* Mobile rezultate */}
            {results.length > 0 && (
              <div className={styles.mobileResults}>
                {results.map(p => (
                  <Link
                    key={p.id}
                    href={`/products/${p.id}`}
                    className={styles.mobileResultItem}
                    onClick={() => { setMenuOpen(false); setSearchQuery(""); }}
                  >
                    <div className={styles.dropdownImg}>
                      {p.image_url
                        ? <img src={p.image_url} alt="" />
                        : <span>{p.icon}</span>
                      }
                    </div>
                    <div className={styles.dropdownInfo}>
                      <div className={styles.dropdownName} style={{ color: "var(--navy)" }}>{getName(p)}</div>
                      <div className={styles.dropdownCat}>{p.category_en}</div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
            {searchQuery.trim() && results.length === 0 && (
              <div className={styles.mobileEmpty}>
                {lang === "al" ? "Nuk u gjet asgjë." : lang === "it" ? "Nessun risultato." : "No results found."}
              </div>
            )}

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