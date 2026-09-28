"use client";

import Link from "next/link";
import { useLang } from "../../context/LangContext.jsx";
import { Calendar, Newspaper, FileText, Download } from "lucide-react";
import styles from "./page.module.css";

// Conținut STATIC — nu vine din Firebase (confirmat cu userul). Fiecare
// element din tx.eventsNews.items are un câmp `type`: "event" sau "news",
// folosit pentru iconița afișată (Calendar / Newspaper) ȘI, din 2026-09-28,
// pentru un accent de culoare diferit pe fiecare card (verde pentru
// eveniment, albastru pentru știre) + o linie verticală de "timeline" care
// leagă vizual cardurile una de alta.
//
// SCHIMBAT (2026-09-28): un item poate avea acum și un câmp opțional
// `files: [{ name, url }]` — de exemplu cele 2 certificate ISO, ca PDF-uri
// (nu poze). Dacă există, sub descriere apar niște "chip"-uri cu iconiță de
// PDF + numele certificatului; click descarcă fișierul direct (atributul
// `download` de pe <a> — browserul salvează fișierul, nu îl deschide într-un
// tab nou). Un item fără `files` arată exact ca înainte.
export default function EventsNewsClient() {
  const { lang, tx } = useLang();
  const items = tx.eventsNews?.items || [];

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <div className={styles.pageHeaderInner}>
          <div className={styles.heroTag}>✦ {tx.eventsNews?.label || "News"}</div>
          <h1 className={styles.pageTitle}>
            {lang === "al" ? (
              <>Lajme <span>&amp; Evente</span></>
            ) : lang === "it" ? (
              <>Notizie <span>&amp; Eventi</span></>
            ) : (
              <>News <span>&amp; Events</span></>
            )}
          </h1>
          <p className={styles.pageSub}>{tx.eventsNews?.sub}</p>
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
                        {item.files.map((f, j) => (
                          <a
                            key={j}
                            href={f.url}
                            download
                            className={styles.newsFileChip}
                          >
                            {/* SCHIMBAT (2026-09-28): dacă fișierul are un `icon`
                                (logo-ul real ISO/GDP, imagine), îl arătăm pe
                                acela — altfel rămâne iconița generică de
                                document, ca fallback. */}
                            {f.icon ? (
                              <img src={f.icon} alt="" className={styles.newsFileChipIcon} />
                            ) : (
                              <FileText size={16} strokeWidth={1.8} />
                            )}
                            <span>{f.name}</span>
                            <Download size={14} strokeWidth={2} className={styles.newsFileChipDownloadIcon} />
                          </a>
                        ))}
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