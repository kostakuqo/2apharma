"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLang } from "../context/LangContext.jsx";
import { Home, Info, Package, Wrench, Handshake, Newspaper, Phone, Search, X, Warehouse, ShieldAlert, TrendingUp, Truck, FileCheck2 } from "lucide-react";
import { getProducts } from "../lib/getProducts.js";
import { getSiteSettings } from "../lib/getSiteSettings.js";
import styles from "./Navbar.module.css";

const FlagAL = () => (
  <svg width="20" height="14" viewBox="0 0 20 14" xmlns="http://www.w3.org/2000/svg">
    <rect width="20" height="14" fill="#E41E20" />
    <path d="M10 2 C8.5 2 7 3 7 4.5 C7 5.5 7.5 6 7.5 6 L6 6.5 L7 7 L6.5 8 L8 7.5 L8 9 L9 8.5 L9 10 L10 9.5 L11 10 L11 8.5 L12 9 L12 7.5 L13.5 8 L13 7 L14 6.5 L12.5 6 C12.5 6 13 5.5 13 4.5 C13 3 11.5 2 10 2Z M8.5 4 C8 4 7.5 4.5 8 5 C8 5 7.5 5.5 8.5 5.5Z M11.5 4 C12 4 12.5 4.5 12 5 C12 5 12.5 5.5 11.5 5.5Z" fill="#000" />
  </svg>
);
const FlagEN = () => (
  <svg width="20" height="14" viewBox="0 0 20 14" xmlns="http://www.w3.org/2000/svg">
    <rect width="20" height="14" fill="#012169" />
    <path d="M0 0L20 14M20 0L0 14" stroke="#fff" strokeWidth="2.8" />
    <path d="M0 0L20 14M20 0L0 14" stroke="#C8102E" strokeWidth="1.8" />
    <path d="M10 0V14M0 7H20" stroke="#fff" strokeWidth="4.5" />
    <path d="M10 0V14M0 7H20" stroke="#C8102E" strokeWidth="2.8" />
  </svg>
);
const FlagIT = () => (
  <svg width="20" height="14" viewBox="0 0 20 14" xmlns="http://www.w3.org/2000/svg">
    <rect width="20" height="14" fill="#CE2B37" />
    <rect width="7" height="14" fill="#009246" />
    <rect x="7" width="6" height="14" fill="#fff" />
  </svg>
);

const LANGS = [
  { code: "al", label: "AL", Flag: FlagAL },
  { code: "en", label: "EN", Flag: FlagEN },
  { code: "it", label: "IT", Flag: FlagIT },
];

// ADĂUGAT (2026-09-27): 2 pagini noi — "services" (Wrench) și "eventsNews"
// (Newspaper) — cerute de user. Rutele lor (app/services, app/events-news)
// și traducerile (tx.nav.services / tx.nav.eventsNews, plus conținutul
// static tx.services / tx.eventsNews) au fost adăugate în LangContext.jsx.
//
// SCHIMBAT (2026-09-28): "warehousing" și "pharmacovigilance" NU mai sunt
// item-uri separate în header — la cererea userului, ele intră acum ca
// `children` sub "services": pe desktop apare un dropdown la hover peste
// "Services", pe mobil (meniul hamburger) se deschide/închide la click.
//
// SCHIMBAT (2026-09-28, update): la cererea userului, dropdown-ul de
// "Services" nu mai arată doar 3 rânduri fixe (Services / Warehousing /
// Pharmacovigilance) — acum listează TOATE cele 6 servicii din
// tx.services.items (aceeași listă folosită pe /services și pe Home), ca
// să se vadă toate din meniu. De-asta lista de mai jos nu mai e un array
// static: e construită în componentă, din tx.services.items, la fiecare
// randare (ca să respecte limba curentă). Cele care au pagină proprie
// (Warehousing, Pharmacovigilance) duc acolo; restul duc spre /services
// (item.href din LangContext decide asta, la fel ca la ServicesGrid).
function getServiceItemIcon(item) {
  if (item.href === "/warehousing") return Warehouse;
  if (item.href === "/pharmacovigilance") return ShieldAlert;
  if (item.href === "/marketing") return TrendingUp;
  if (item.href === "/distribution") return Truck;
  if (item.href === "/regulatory") return FileCheck2;
  return Wrench;
}

const NAV_ITEMS = [
  { href: "/", label: "home", Icon: Home },
  { href: "/about", label: "about", Icon: Info },
  // { href: "/products", label: "products", Icon: Package },
  { href: "/services", label: "services", Icon: Wrench, hasServicesDropdown: true },
  { href: "/partners", label: "partners", Icon: Handshake },
  { href: "/events-news", label: "eventsNews", Icon: Newspaper },
  { href: "/contact", label: "contact", Icon: Phone },
];

const DEFAULT_LOGO = { logoType: "text", logoMark: "2A", logoText: "Pharma", logoImageUrl: "" };

export default function Navbar() {
  const { lang, toggle, tx } = useLang();
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef(null);
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  // ADĂUGAT (2026-09-28): stare pentru dropdown-ul "Services" din meniul
  // mobil (hamburger) — pe mobil nu există hover, deci se deschide/închide
  // la click pe cuvântul "Services".
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  // ADĂUGAT (2026-09-28): dropdown-ul "Services" de pe DESKTOP nu mai
  // depinde doar de CSS ":hover" — dacă dai click pe o opțiune chiar când
  // mouse-ul stă peste listă, lista rămânea vizibilă până mutai mouse-ul
  // (pagina se schimbă dedesubt, dar panoul rămâne deschis). Acum e
  // controlat din JS (onMouseEnter/Leave) și se închide explicit la click
  // pe orice opțiune din listă.
  const [desktopServicesOpen, setDesktopServicesOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [allProducts, setAllProducts] = useState([]);
  const [results, setResults] = useState([]);
  const [logo, setLogo] = useState(DEFAULT_LOGO);
  const searchWrapRef = useRef(null);
  const searchInputRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    getProducts().then(setAllProducts).catch(console.error);
  }, []);

  useEffect(() => {
    getSiteSettings().then(setLogo).catch(console.error);
  }, []);

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

  useEffect(() => {
    const handleClick = (e) => {
      if (langRef.current && !langRef.current.contains(e.target)) {
        setLangOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // ADĂUGAT (2026-09-27): pe iPhone/Safari, la tap pe un link din meniul
  // mobil, navigarea (Next.js router) poate "depăși" apelul lui
  // onClick={() => setMenuOpen(false)} de pe Link înainte ca acesta să apuce
  // să ruleze complet — meniul rămâne deschis peste pagina nouă. Închidem
  // meniul (și search-ul) automat de fiecare dată când se schimbă ruta,
  // indiferent de onClick, ca plasă de siguranță pentru toate browserele.
  useEffect(() => {
    setMenuOpen(false);
    setSearchOpen(false);
    setMobileServicesOpen(false);
    setDesktopServicesOpen(false);
  }, [pathname]);

  // ADĂUGAT (2026-09-27): meniul mobil (.mobileMenu) era randat "în flow"
  // (împingea conținutul de sub el), ceea ce pe iOS Safari cauza un
  // recalcul de layout vizibil ca scroll orizontal + "plutire" a paginii
  // exact în momentul deschiderii, și făcea butoanele de limbă din meniu
  // instabile la tap imediat după. Acum .mobileMenu e un overlay fix (vezi
  // Navbar.module.css) care nu mai împinge nimic — dar, cât timp el
  // acoperă ecranul, blocăm scroll-ul paginii din spate, altfel pe iOS tot
  // se pot întâmpla scroll-uri "fantomă" în fundal, sub overlay.
  useEffect(() => {
    if (menuOpen) {
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prevOverflow;
      };
    }
  }, [menuOpen]);

  const isActive = (href) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  // ADĂUGAT (2026-09-28): "Services" din header trebuie să rămână evidențiat
  // (verde) și cât timp ești pe /warehousing sau /pharmacovigilance, nu doar
  // pe /services — pentru că acum sunt "sub" el, în dropdown.
  // SCHIMBAT (2026-09-28, update): lista de sub-linkuri nu mai e statică —
  // verificăm activ pe toate href-urile din tx.services.items.
  const serviceHrefs = (tx.services?.items || []).map(s => s.href || "/services");
  const isItemActive = (item) =>
    isActive(item.href) || (item.hasServicesDropdown && serviceHrefs.some(h => isActive(h)));

  // ADĂUGAT (2026-09-28): la cererea userului, în dropdown-ul "Shërbimet",
  // Magazinimi și Farmakovigjilenca (cele cu pagină proprie, `href`) apar
  // primele — restul serviciilor (fără pagină proprie, deci spre /services)
  // vin după. Ordinea pe /services și Home rămâne neschimbată — sortarea e
  // făcută doar aici, pentru listă.
  const dropdownServices = [...(tx.services?.items || [])].sort(
    (a, b) => (a.href ? 0 : 1) - (b.href ? 0 : 1)
  );

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
            {logo.logoType === "image" && logo.logoImageUrl ? (
              // SCHIMBAT (2026-09-27): logo mai mare (64px, față de 40px) și
              // mai clar — fundalul navbar-ului a fost deschis la culoare
              // (vezi Navbar.module.css, .nav) ca să se potrivească cu
              // fundalul pal al imaginii primite de la designer, în loc să
              // arate ca un dreptunghi alb pe fundalul navy-verde vechi.
              <img
                src={logo.logoImageUrl}
                alt="2A Pharma"
                style={{ height: "64px", width: "auto", objectFit: "contain" }}
              />
            ) : (
              <>
                <div className={styles.logoMark}>{logo.logoMark || "2A"}</div>
                <div className={styles.logoText}>{logo.logoText || "Pharma"}</div>
              </>
            )}
          </Link>

          <nav className={styles.links}>
            {NAV_ITEMS.map((item) => {
              if (item.hasServicesDropdown) {
                // "Services" cu dropdown — pe desktop se deschide la hover
                // (onMouseEnter/Leave, nu CSS ":hover" pur) ca să-l putem
                // închide explicit la click pe o opțiune, chiar dacă mouse-ul
                // rămâne peste listă în momentul click-ului.
                // SCHIMBAT (2026-09-28): listăm acum toate cele 6 servicii
                // din tx.services.items, nu doar 3 fixe.
                return (
                  <div
                    key={item.href}
                    className={styles.navDropdown}
                    onMouseEnter={() => setDesktopServicesOpen(true)}
                    onMouseLeave={() => setDesktopServicesOpen(false)}
                  >
                    <Link href={item.href} className={isItemActive(item) ? styles.active : ""}>
                      {tx.nav[item.label]}
                    </Link>
                    <div
                      className={`${styles.navDropdownPanel} ${desktopServicesOpen ? styles.navDropdownPanelOpen : ""}`}
                    >
                      {dropdownServices.map((service, i) => {
                        const ChildIcon = getServiceItemIcon(service);
                        return (
                          <Link
                            key={`${service.href || "/services"}-${i}`}
                            href={service.href || "/services"}
                            className={styles.navDropdownLink}
                            onClick={(e) => {
                              // FIX (2026-09-28): CSS-ul mai ține panoul
                              // deschis via ":focus-within" (pentru Tab de pe
                              // tastatură) — click-ul dă focus link-ului, deci
                              // trebuie să scoatem explicit focus-ul, altfel
                              // panoul rămâne vizibil peste pagina nouă chiar
                              // dacă starea din JS spune "închis".
                              e.currentTarget.blur();
                              setDesktopServicesOpen(false);
                            }}
                          >
                            <ChildIcon size={16} strokeWidth={1.8} />
                            <span>{service.title}</span>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                );
              }
              return (
                <Link key={item.href} href={item.href} className={isActive(item.href) ? styles.active : ""}>
                  {tx.nav[item.label]}
                </Link>
              );
            })}
          </nav>

          <div className={styles.right}>

            {/* ── Search (desktop only) ── */}
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

            {/* ── Lang switcher ── */}
            <div className={styles.langWrap} ref={langRef}>
              <div className={styles.langGroup}>
                {LANGS.map(({ code, label, Flag }) => (
                  <button
                    key={code}
                    className={`${styles.langBtn} ${lang === code ? styles.langActive : ""}`}
                    onClick={() => toggle(code)}
                  >
                    <Flag />
                    <span className={styles.langLabel}>{label}</span>
                  </button>
                ))}
              </div>

              <button
                className={styles.langMobileBtn}
                onClick={() => setLangOpen(v => !v)}
              >
                {(() => {
                  const current = LANGS.find(l => l.code === lang);
                  return current ? <current.Flag /> : null;
                })()}
                <span>{lang.toUpperCase()}</span>
              </button>

              {langOpen && (
                <div className={styles.langDropdown}>
                  {LANGS.map(({ code, label, Flag }) => {
                    const isLangActive = lang === code;
                    return (
                      <button
                        key={code}
                        className={`${styles.langDropdownItem} ${isLangActive ? styles.langDropdownActive : ""}`}
                        onClick={() => {
                          toggle(code);
                          setLangOpen(false);
                          setMenuOpen(false);
                        }}
                      >
                        <span className={styles.langFlag}><Flag /></span>
                        <span className={styles.langText}>{label}</span>
                        {isLangActive && <span className={styles.langCheck}>✓</span>}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            <a href="tel:+355689053241" className={styles.phone}>
              <Phone size={14} />
              +355689053241
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

        {/* ── Mobile Menu ── */}
        {menuOpen && (
          <div className={styles.mobileMenu}>
            {/* Search în meniu */}
            <div className={styles.mobileSearchWrap}>
              <Search size={15} color="var(--gray-400)" />
              <input
                type="text"
                placeholder={searchPlaceholder}
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className={styles.mobileSearchInput}
                /* ELIMINAT (2026-09-27): "autoFocus" încerca să deschidă
                   tastatura chiar în momentul în care se deschidea meniul
                   mobil (hamburger). Pe iOS Safari, asta declanșează un bug
                   cunoscut: viewport-ul vizual rămâne "deplasat" din cauza
                   apariției/dispariției rapide a tastaturii, iar elementele
                   position:fixed (meniul, bottom nav-ul) rămân dezaliniate
                   față de ecranul real — exact "scroll orizontal + plutire"
                   raportat, reparat temporar de un pinch-zoom (care resetează
                   forțat viewport-ul). Fără autoFocus, userul dă tap manual
                   pe input dacă vrea să caute — tastatura nu mai apare
                   automat la simpla deschidere a meniului. */
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}
                >
                  <X size={14} color="var(--gray-400)" />
                </button>
              )}
            </div>

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

            {NAV_ITEMS.map((item) => {
              if (item.hasServicesDropdown) {
                // "Services" din meniul mobil — click deschide/închide
                // sub-lista (acum toate cele 6 servicii, nu doar 3); nu
                // navighează direct, ca userul să vadă întâi opțiunile.
                return (
                  <div key={item.href} className={styles.mobileNavGroup}>
                    <button
                      type="button"
                      className={styles.mobileNavToggle}
                      onClick={() => setMobileServicesOpen(v => !v)}
                    >
                      {tx.nav[item.label]}
                      <span className={styles.mobileNavChevron}>{mobileServicesOpen ? "−" : "+"}</span>
                    </button>
                    {mobileServicesOpen && (
                      <div className={styles.mobileNavSubmenu}>
                        {dropdownServices.map((service, i) => {
                          const ChildIcon = getServiceItemIcon(service);
                          return (
                            <Link
                              key={`${service.href || "/services"}-${i}`}
                              href={service.href || "/services"}
                              className={styles.mobileNavSubLink}
                              onClick={() => { setMenuOpen(false); setMobileServicesOpen(false); }}
                            >
                              <ChildIcon size={15} strokeWidth={1.8} />
                              <span>{service.title}</span>
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              }
              return (
                <Link key={item.href} href={item.href} onClick={() => setMenuOpen(false)}>
                  {tx.nav[item.label]}
                </Link>
              );
            })}

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

            <a href="tel:+355689053241" className={styles.mobilePhone}>
              +355 68 905 3241
            </a>
          </div>
        )}
      </header>

      {/* ── Bottom Nav ── */}
      <nav className={styles.bottomNav}>
        {NAV_ITEMS.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`${styles.bottomNavItem} ${isItemActive(item) ? styles.bottomNavActive : ""}`}
          >
            <span className={styles.bottomNavIcon}>
              <item.Icon size={22} strokeWidth={1.8} />
            </span>
            <span className={styles.bottomNavLabel}>{tx.nav[item.label]}</span>
          </Link>
        ))}
      </nav>
    </>
  );
}