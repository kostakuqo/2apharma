"use client";

import Link from "next/link";
import { useLang } from "../../context/LangContext.jsx";
import { Calendar, Newspaper, FileText, Download } from "lucide-react";
import styles from "./page.module.css";

// IMAGINEA HERO: pune fișierul tău la această cale (sau schimbă calea de
// mai jos cu numele real al fișierului tău). Dimensiune recomandată:
// 1920x640px, JPG optimizat. Dacă fișierul lipsește, secțiunea rămâne cu
// un fundal navy în gradient (fallback din CSS) — nu dă eroare.
const HERO_IMAGE = "/images/events-news-hero.jpg";

// Conținut STATIC — nu vine din Firebase (confirmat cu userul). Fiecare
// element din tx.eventsNews.items are un câmp `type`: "event" sau "news",
// folosit pentru iconița afișată (Calendar / Newspaper) ȘI, din 2026-09-28,
// pentru un accent de culoare diferit pe fiecare card (verde pentru
// eveniment, albastru pentru știre) + o linie verticală de "timeline" care
// leagă vizual cardurile una de alta.
//
// SCHIMBAT (2026-09-28): un item poate avea acum și un câmp opțional
// `files: [{ name, url, icon }]` — ex. certificatele ISO/GDP/AKBPM, ca
// PDF-uri (nu poze). Dacă există, sub descriere apar niște "chip"-uri cu
// iconiță de PDF + numele certificatului.
//
// SCHIMBAT (2026-09-29): link-ul deschide PDF-ul într-un tab nou
// (target="_blank"), nu îl mai descarcă direct.
//
// ADĂUGAT (2026-09-29): un fișier poate avea acum și `disabled: true` —
// pentru certificate care încă nu sunt disponibile (ex. GDP/AKBPM, cât
// timp userul nu a încărcat încă PDF-ul real). La cererea userului,
// chip-ul arată identic cu cele active (aceeași iconiță, text, stil) —
// SINGURA diferență e că devine un <div> în loc de <a>, deci la click nu
// se întâmplă absolut nimic (nu navighează, nu dă 404 / "Failed to load
// PDF document"). Când PDF-ul real e gata, se scoate doar `disabled: true`
// din LangContext.jsx și chip-ul redevine link normal — fără nicio altă
// modificare de cod/stil.
export default function EventsNewsClient() {
  const { lang, tx } = useLang();
  const items = tx.eventsNews?.items || [];

  return (
    <div className={styles.page}>
      <div
        className={styles.imageHero}
        style={{ backgroundImage: `url(${HERO_IMAGE})` }}
      >
        <div className={styles.imageHeroOverlay} />
        <div className={styles.imageHeroInner}>
          <div className={styles.imageHeroTag}>✦ {tx.eventsNews?.label || "News"}</div>
          <h1 className={styles.imageHeroTitle}>
            {lang === "al" ? (
              <>Lajme <span>&amp; Evente</span></>
            ) : lang === "it" ? (
              <>Notizie <span>&amp; Eventi</span></>
            ) : (
              <>News <span>&amp; Events</span></>
            )}
          </h1>
          <p className={styles.imageHeroSub}>{tx.eventsNews?.sub}</p>
        </div>
      </div>

      <div className={styles.gridWrap}>
        <div className={styles.gridHeader}>
          <span className={styles.gridTag}>✦ {tx.eventsNews?.gridTag}</span>
          <h2 className={styles.gridTitle}>{tx.eventsNews?.gridTitle}</h2>
        </div>

        {items.length === 0 ? (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>📰</div>
            {lang === "al"
              ? "Nuk ka lajme apo evente momentalisht."
              : lang === "it"
                ? "Nessuna notizia o evento al momento."
                : "No news or events at the moment."}
          </div>
        ) : (
          <div className={styles.list}>
            {items.map((item, i) => {
              const isEvent = item.type === "event";
              return (
                <div
                  key={i}
                  className={`${styles.newsCard} ${isEvent ? styles.newsCardEvent : styles.newsCardNews}`}
                >
                  <div className={styles.newsRail}>
                    <div className={styles.newsIcon}>
                      {isEvent ? (
                        <Calendar size={20} strokeWidth={1.8} />
                      ) : (
                        <Newspaper size={20} strokeWidth={1.8} />
                      )}
                    </div>
                    {i < items.length - 1 && <div className={styles.newsRailLine} />}
                  </div>
                  <div className={styles.newsBody}>
                    <div className={styles.newsMeta}>
                      <span className={styles.newsDate}>{item.date}</span>
                      <span
                        className={`${styles.newsTag} ${isEvent ? styles.newsTagEvent : styles.newsTagNews}`}
                      >
                        {item.tag}
                      </span>
                    </div>
                    <div className={styles.newsTitle}>{item.title}</div>
                    <div className={styles.newsDesc}>{item.excerpt}</div>

                    {item.files && item.files.length > 0 && (
                      <div className={styles.newsFileRow}>
                        {item.files.map((f, j) => {
                          const content = (
                            <>
                              {f.icon ? (
                                <img src={f.icon} alt="" className={styles.newsFileChipIcon} />
                              ) : (
                                <FileText size={16} strokeWidth={1.8} />
                              )}
                              <span className={styles.newsFileChipText}>
                                <span className={styles.newsFileChipName}>{f.name}</span>
                                <span className={styles.newsFileChipMeta}>
                                  PDF ·{" "}
                                  {lang === "al" ? "Shiko" : lang === "it" ? "Vedi" : "View"}
                                </span>
                              </span>
                              <span className={styles.newsFileChipDownloadDot}>
                                <Download size={13} strokeWidth={2.5} />
                              </span>
                            </>
                          );

                          // ADĂUGAT (2026-09-29): dacă certificatul nu e încă
                          // disponibil (`disabled: true`), randăm un <div>
                          // identic vizual cu chip-ul normal (aceeași clasă,
                          // fără stil diferit) — dar NU un <a>, deci nu
                          // navighează nicăieri. La click nu se întâmplă
                          // absolut nimic, nu mai poate da eroare de PDF
                          // lipsă / 404.
                          if (f.disabled) {
                            return (
                              <div key={j} className={styles.newsFileChip}>
                                {content}
                              </div>
                            );
                          }

                          return (
                            <a
                              key={j}
                              href={f.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={styles.newsFileChip}
                            >
                              {content}
                            </a>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div className={styles.trustBanner}>
        <h2 className={styles.trustTitle}>{tx.eventsNews?.ctaTitle}</h2>
        <p className={styles.trustSub}>{tx.eventsNews?.ctaSub}</p>
        <Link href="/contact" className={styles.trustBtn}>
          {tx.eventsNews?.ctaBtn} →
        </Link>
      </div>
    </div>
  );
}