"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useLang } from "../../context/LangContext.jsx";
import { getProducts } from "../../lib/getProducts.js";
import ProductCard from "../../components/ProductCard.jsx";
import Map from "../../components/Map.jsx";
import ServicesGrid from "../../components/ServicesGrid.jsx";
import styles from "./page.module.css";
import { db } from "../../lib/firebase.js";
import { collection, getDocs } from "firebase/firestore";

const STATS = [
  { num: "1000+", label: "Products", labelAl: "Produkte" },
  { num: "50+", label: "Partners", labelAl: "Partnerë" },
  { num: "10+", label: "Years", labelAl: "Vjet" },
];

// ÎNLOCUIT (2026-09-27): imagine în locul path-ului video de fundal al
// hero-ului — pune fișierul tău real la public/images/heroimage.png (sau
// schimbă calea de mai jos cu numele fișierului tău). Dacă lipsește,
// fundalul rămâne pur gradient verde-albastru (vezi .hero din CSS) — nu
// dă eroare.
//
// ATENȚIE la cale: în Next.js, orice fișier pus în folderul `public/` e
// servit direct din rădăcina site-ului — deci un fișier la
// `public/images/heroimage.png` se referă în cod ca `/images/heroimage.png`,
// NICIODATĂ cu `public/` sau cu numele proiectului (`2a-pharma/...`) în
// față — acelea nu există ca URL-uri reale în browser. Și calea trebuie
// mereu între ghilimele (e un string), nu scrisă goală ca mai sus.
const HERO_IMAGE = "/images/heroimage.jpg";

// ADĂUGATE (2026-09-27): 2 imagini de fundal noi, pentru secțiunile
// "Our Mission" și "About the Company" adăugate mai jos pe Home — pune
// fișierele tale reale la aceste căi (sau schimbă calea în cod). Dacă
// lipsesc, secțiunile rămân cu un fundal navy/verde simplu — nu dă eroare.
const MISSION_IMAGE = "/images/mission.jpg";
const ABOUT_COMPANY_IMAGE = "/images/about-company.jpg";

const IconShield = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>;
const IconPhone = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.47 2 2 0 0 1 3.58 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.54a16 16 0 0 0 6.29 6.29l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" /></svg>;
const IconArrow = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>;

// SCHIMBAT (2026-09-27): toate iconițele "de conținut" (Features,
// Services teaser, About the Company, Figures) au fost trecute de la
// SVG-uri scrise în cod la IMAGINI — designerul creează pictograme/logo-uri
// proprii pentru fiecare. Pune fișierele la căile de mai jos (sau schimbă
// căile cu numele reale ale fișierelor primite). Dacă un fișier lipsește,
// cercul/căsuța rămâne goală — nu dă eroare.
// (IconShield/IconPhone/IconArrow de mai sus RĂMÂN cod — sunt iconițe
// mici, funcționale, din butoane/badge-uri, nu "logo-uri" de conținut.)
const FEATURE_ICON_IMAGES = [
  "/images/icons/feature-cert.png",
  "/images/icons/feature-truck.png",
  "/images/icons/feature-headset.png",
  "/images/icons/feature-refresh.png",
];

// ADĂUGATE (2026-09-27): secțiuni noi pe Home, după un design de referință
// trimis de user (Services teaser, Our Mission, Expertise, About the
// Company, Figures) — toate STATIC (conținut scris direct în translations,
// nu Firebase), la fel ca paginile /services și /events-news.

// SCHIMBAT (2026-09-28): secțiunea de Services de pe Home randează acum
// componenta partajată <ServicesGrid> (vezi components/ServicesGrid.jsx),
// aceeași folosită pe pagina /services — conținut ȘI stil identice și
// sincronizate automat, la cererea userului. Array-ul de imagini de mai
// jos nu mai e necesar aici (a rămas doar în ServicesGrid.jsx).

const ABOUT_COMPANY_ICON_IMAGES = [
  "/images/icons/about-products.png",
  "/images/icons/about-partners.png",
  "/images/icons/about-years.png",
];

// SIMPLIFICAT (2026-09-27): "2A Pharma in Figures" e acum un rând simplu de
// 3 statistici (10+ ani experiență, 500+ produse, 24-48h livrare), definite
// direct în `home.figures.stats` din LangContext.jsx — la fel ca secțiunea
// de statistici de pe pagina /about.

// ADĂUGAT (2026-09-28): "count up" — numerele din "2A Pharma in Figures"
// (10+, 500+, un an ca 2012 etc.) se animă de la 0 până la valoarea reală
// când secțiunea intră în ecran la scroll (o singură dată). Funcționează
// DOAR pentru valori simple "număr" sau "număr+" (ex: "10+", "500+",
// "2012") — o valoare ca "24-48h" (interval, cu litere) NU se potrivește
// tiparului de mai jos, deci rămâne afișată static, neanimată (corect,
// altfel animația ar arăta ciudat pentru un interval).
function CountUpNumber({ value }) {
  const match = /^(\d+)(\+?)$/.exec(String(value).trim());
  const target = match ? parseInt(match[1], 10) : null;
  const suffix = match ? match[2] : "";
  const [display, setDisplay] = useState(target !== null ? `0${suffix}` : value);
  const ref = useRef(null);
  const animatedRef = useRef(false);

  useEffect(() => {
    if (target === null) return;
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !animatedRef.current) {
            animatedRef.current = true;
            const duration = 1600;
            const start = performance.now();
            const step = (now) => {
              const progress = Math.min((now - start) / duration, 1);
              const current = Math.floor(progress * target);
              setDisplay(`${current}${suffix}`);
              if (progress < 1) requestAnimationFrame(step);
              else setDisplay(`${target}${suffix}`);
            };
            requestAnimationFrame(step);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, suffix]);

  return <span ref={ref}>{display}</span>;
}

export default function HomeClient() {
  const { lang, tx } = useLang();
  const [featured, setFeatured] = useState([]);
  const [partners, setPartners] = useState([]);

  useEffect(() => {
    async function load() {
      try {
        const data = await getProducts();
        setFeatured(data.slice(0, 3));

        const snap = await getDocs(collection(db, "partners"));
        setPartners(
          snap.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          }))
        );
      } catch (err) {
        console.error(err);
      }
    }

    load();
  }, []);

  const home = tx.home || {};
  const homeServices = tx.services?.items || [];

  return (
    <>
      <div className={styles.darkBlock}>
        <section className={styles.hero}>
          <img
            className={styles.heroBgImage}
            src={HERO_IMAGE}
            alt=""
          />
          <div className={styles.heroOverlay} />

          <div className={styles.heroLeft}>
            {/* SIMPLIFICAT (2026-09-27): la cererea userului, hero-ul
                arată DOAR titlul — am scos badge-ul, subtitlul, butoanele
                și rândul de statistici (STATS rămâne definit mai sus, dar
                nemaifiind randat aici — poate fi șters complet dacă nu se
                mai folosește nicăieri altundeva). */}
            <h1 className={styles.heroTitle}>
              {tx.hero.title1}<br />
              <span>{tx.hero.title2}</span><br />
              {tx.hero.title3}
            </h1>
          </div>
        </section>

        {/* ── CERTIFICATE BADGES (ISO x2 + GDP) ──
            ADĂUGAT (2026-09-28): sub poza mare de hero, centrat — 3 iconițe
            clickabile care descarcă direct PDF-urile certificatelor.
            Refolosim EXACT aceleași fișiere puse deja pentru pagina
            /events-news (nu mai trebuie încărcate din nou).
            ADĂUGAT (2026-09-28, update): fiecare iconiță are acum o
            descriere scrisă dedesubt (trilingv), ca omul să știe ce
            certificat descarcă. */}
        <div className={styles.certBadgesRow}>
          <a href="/documents/iso-certificate-1.pdf" download className={styles.certBadgeItem}>
            <div className={styles.certBadge}>
              <img src="/images/icons/cert-iso.png" alt="ISO" className={styles.certBadgeIcon} />
            </div>
            <span className={styles.certBadgeLabel}>
              {lang === "al" ? "ISO 9001 : 2015 " : lang === "it" ? "ISO 9001 : 2015 " : "ISO 9001 : 2015"}
            </span>
          </a>
          <a href="/documents/iso-certificate-2.pdf" download className={styles.certBadgeItem}>
            <div className={styles.certBadge}>
              <img src="/images/icons/cert-iso.png" alt="ISO" className={styles.certBadgeIcon} />
            </div>
            <span className={styles.certBadgeLabel}>
              {lang === "al" ? "ISO 9001 : 2015 " : lang === "it" ? "ISO 9001 : 2015 " : "ISO 9001 : 2015"}
            </span>
          </a>
          <a href="/documents/gdp-certificate.pdf" download className={styles.certBadgeItem}>
            <div className={styles.certBadge}>
              <img src="/images/icons/cert-gdp.png" alt="GDP" className={styles.certBadgeIcon} />
            </div>
            <span className={styles.certBadgeLabel}>
              {lang === "al" ? "Certifikata GDP" : lang === "it" ? "Certificato GDP" : "GDP Certificate"}
            </span>
          </a>
          {/* ADĂUGAT (2026-09-28): a 4-a iconiță — certificat AKBPM.
              Pune fișierul icon la public/images/icons/cert-akbpm.png și
              PDF-ul la public/documents/akbpm-certificate.pdf (sau schimbă
              căile de mai jos cu numele reale ale fișierelor tale). */}
          <a href="/documents/akbpm-certificate.pdf" download className={styles.certBadgeItem}>
            <div className={styles.certBadge}>
              <img src="/images/icons/cert-akbpm.png" alt="AKBPM" className={styles.certBadgeIcon} />
            </div>
            <span className={styles.certBadgeLabel}>
              {lang === "al" ? "Certifikata AKBPM" : lang === "it" ? "Certificato AKBPM" : "AKBPM Certificate"}
            </span>
          </a>
        </div>

        {/* ── SERVICES (teaser) ──
            SCHIMBAT (2026-09-28): la cererea userului, secțiunea de pe
            Home folosește acum EXACT aceeași componentă <ServicesGrid>
            (cerc-iconiță + index numeric, titlu, liniuță de accent,
            descriere) ca pagina /services — orice modificare de conținut
            sau stil făcută acolo apare automat și aici. */}
        <section className={styles.homeServicesSection}>
          <h2 className={styles.homeSectionTitle}>{home.servicesTitle}</h2>
          <div className={styles.homeSectionUnderline} />
          <div style={{ marginTop: 44 }}>
            <ServicesGrid services={homeServices} />
          </div>
        </section>

        {/* ── OUR MISSION ──
            SCHIMBAT (2026-09-28): la cererea userului, poza nu mai e
            background-image + cover (se tăia pe ecrane late de desktop) —
            acum e o imagine <img> normală, la fel ca la hero, care se
            vede complet, necropată, indiferent de lățimea ecranului. */}
        <section className={styles.missionSection}>
          <img className={styles.missionBgImage} src={MISSION_IMAGE} alt="" />
          <div className={styles.missionOverlay} />
          <div className={styles.missionInner}>
            <h2 className={styles.missionTitle}>{home.mission?.title}</h2>
            <p className={styles.missionText}>{home.mission?.text}</p>
          </div>
        </section>

        {/* ── SPACER (verde) ──
            ȘTERS (2026-09-28): secțiunea "Ekspertiza dhe Gama Jonë e
            Shërbimeve" a fost eliminată la cererea userului (conținut
            considerat irelevant). Am pus în locul ei un simplu spațiu cu
            fundal verde, ca să rămână o separare vizuală între "Our
            Mission" (deasupra) și "About the Company" (dedesubt) — fără
            titlu, fără text. Dacă vrei să dispară complet spațiul (fără
            fundal verde deloc), șterge tot acest <div>. */}
        <div className={styles.homeGreenSpacer} />

        {/* ── ABOUT THE COMPANY (stats) ──
            SCHIMBAT (2026-09-28): la cererea userului, toată secțiunea
            (fundal + titlu + cele 3 carduri) e acum un <Link> spre /about
            — click oriunde în secțiune deschide pagina About, la fel cum
            s-a făcut deja la ServiceGrid. */}
        <Link
          href="/about"
          className={styles.aboutCompanySection}
          style={{ backgroundImage: `url(${ABOUT_COMPANY_IMAGE})` }}
        >
          <div className={styles.aboutCompanyOverlay} />
          <div className={styles.aboutCompanyInner}>
            <h2 className={styles.homeSectionTitleLight}>{home.aboutCompany?.title}</h2>
            <div className={styles.homeSectionUnderlineLight} />
            <div className={styles.aboutCompanyGrid}>
              {(home.aboutCompany?.stats || []).map((s, i) => {
                const iconSrc = ABOUT_COMPANY_ICON_IMAGES[i % ABOUT_COMPANY_ICON_IMAGES.length];
                return (
                  <div key={i} className={styles.aboutStatCard}>
                    <div className={styles.aboutStatIcon}>
                      <img src={iconSrc} alt="" className={styles.aboutStatIconImg} />
                    </div>
                    <div className={styles.aboutStatNum}>{s.num}</div>
                    <div className={styles.aboutStatLabel}>{s.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </Link>

        {/* ── FIGURES ── */}
        <section className={styles.figuresSection}>
          <h2 className={styles.homeSectionTitle}>{home.figures?.title}</h2>
          <div className={styles.homeSectionUnderline} />
          <div className={styles.figuresStatsRow}>
            {(home.figures?.stats || []).map((s, i) => (
              <div key={i} className={styles.figuresStatCard}>
                <div className={styles.figuresCellNum}>
                  <CountUpNumber value={s.num} />
                </div>
                <div className={styles.figuresCellLabel}>{s.label}</div>
              </div>
            ))}
          </div>
        </section>
        </div>

        {/* <section className={styles.productsSection}>
          <div className={styles.secHeader}>
            <div className="section-label">{tx.products.label}</div>
            <h2 className={styles.secTitle}>{tx.products.title}</h2>
            <p className={styles.secSub}>{tx.products.sub}</p>
          </div>
          <div className={styles.productsGrid}>
            {featured.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
          <div className={styles.viewAllWrap}>
            <Link href="/products" className={styles.viewAllBtn}>
              {tx.products.viewAll} <IconArrow />
            </Link>
          </div>
        </section> */}
        {/* <section className={styles.featuresSection}>
          <div className={styles.secHeaderCenter}>
            <div className="section-label">{tx.features.label}</div>
            <h2 className={styles.secTitle}>{tx.features.title}</h2>
          </div>
          <div className={styles.featuresGrid}>
            {tx.features.items.map((f, i) => (
              <div key={i} className={styles.fCard}>
                <div className={styles.fIcon}>
                  <img src={FEATURE_ICON_IMAGES[i % FEATURE_ICON_IMAGES.length]} alt="" className={styles.fIconImg} />
                </div>
                <div className={styles.fTitle}>{f.title}</div>
                <div className={styles.fDesc}>{f.desc}</div>
              </div>
            ))}
          </div>
        </section> */}
        {/* <section className={styles.ctaSection}>
          <h2 className={styles.ctaTitle}>
            {lang === "al"
              ? "Keni nevojë për pajisje mjekësore?"
              : lang === "it"
                ? "Hai bisogno di apparecchiature mediche?"
                : "Need medical equipment?"}
          </h2>
          <p className={styles.ctaSub}>
            {lang === "al"
              ? "Kontaktoni ekipin tonë sot dhe do t'ju ndihmojmë të gjeni zgjidhjen e duhur."
              : lang === "it"
                ? "Contatta il nostro team oggi e ti aiuteremo a trovare la soluzione giusta."
                : "Contact our team today and we'll help you find the right solution."}
          </p>
          <Link href="/contact" className={styles.btnWhite}>
            <IconPhone />
            {lang === "al" ? "Na kontaktoni" : lang === "it" ? "Contattaci" : "Contact us"} <IconArrow />
          </Link>
        </section> */}

      {/* </div> */}
      <section className={styles.partnersSection}>
  {/* <div className={styles.partnersLabel}>{tx.partners.title}</div> */}

  {/* <div className={styles.partnersRow}>
    {partners.map(p => (
      <div key={p.id} className={styles.partner}>

        {p.website ? (
          <a
            href={p.website}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.partnerLinkHome}
          >
            {p.logo_url ? (
              <img
                src={p.logo_url}
                alt={p.name}
                className={styles.partnerLogoHome}
              />
            ) : (
              <span>{p.name}</span>
            )}
          </a>
        ) : (
          <>
            {p.logo_url ? (
              <img
                src={p.logo_url}
                alt={p.name}
                className={styles.partnerLogoHome}
              />
            ) : (
              <span>{p.name}</span>
            )}
          </>
        )}

      </div>
    ))}
  </div> */}
</section>
      <section style={{ padding: "0 var(--section-px)" }}>
        <Map />
      </section>
    </>
  );
}