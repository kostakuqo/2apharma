"use client";

import Link from "next/link";
import { useLang } from "../../context/LangContext.jsx";
import { Calendar, Newspaper } from "lucide-react";
import styles from "./page.module.css";

// Conținut STATIC — nu vine din Firebase (confirmat cu userul). Fiecare
// element din tx.eventsNews.items are un câmp `type`: "event" sau "news",
// folosit doar pentru iconița afișată (Calendar / Newspaper).
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
            {items.map((item, i) => (
              <div key={i} className={styles.newsCard}>
                <div className={styles.newsIcon}>
                  {item.type === "event" ? (
                    <Calendar size={20} strokeWidth={1.8} />
                  ) : (
                    <Newspaper size={20} strokeWidth={1.8} />
                  )}
                </div>
                <div className={styles.newsBody}>
                  <div className={styles.newsMeta}>
                    <span className={styles.newsDate}>{item.date}</span>
                    <span className={styles.newsTag}>{item.tag}</span>
                  </div>
                  <div className={styles.newsTitle}>{item.title}</div>
                  <div className={styles.newsDesc}>{item.excerpt}</div>
                </div>
              </div>
            ))}
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