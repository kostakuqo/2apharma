"use client";

import { useState } from "react";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { useLang } from "../../context/LangContext.jsx";
import { db } from "../../lib/firebase.js";
import Map from "../../components/Map.jsx";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import styles from "./page.module.css";

const FORM_TITLES = {
  al: "Dërgoni një mesazh",
  en: "Send us a message",
  it: "Inviaci un messaggio",
};

export default function ContactClient() {
  const { lang, tx } = useLang();
  const c = tx.contact;

  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [locating, setLocating] = useState(false);

  async function handleSubmit() {
    if (!form.name || !form.email || !form.message) return;
    setSending(true);
    setSuccess(false);
    setError(false);
    try {
      await addDoc(collection(db, "messages"), {
        ...form,
        read: false,
        createdAt: serverTimestamp(),
      });
      setSuccess(true);
      setForm({ name: "", email: "", phone: "", message: "" });
    } catch (err) {
      console.error(err);
      setError(true);
    }
    setSending(false);
  }

  function openDirections() {
    if (!navigator.geolocation) {
      window.open("https://www.google.com/maps/dir/?api=1&destination=41.34511991545273,19.762055167049983", "_blank");
      return;
    }
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        const url = `https://www.google.com/maps/dir/?api=1&origin=${coords.latitude},${coords.longitude}&destination=41.34511991545273,19.762055167049983&travelmode=driving`;
        setLocating(false);
        window.open(url, "_blank");
      },
      () => {
        setLocating(false);
        window.open("https://www.google.com/maps/dir/?api=1&destination=41.34511991545273,19.762055167049983", "_blank");
      }
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <div className={styles.pageHeaderInner}>
          <div className={styles.heroTag}>✦ {c.label}</div>
          <h1 className={styles.pageTitle}>
            {lang === "al" ? <>Na <span>Kontaktoni</span></> :
              lang === "it" ? <><span>Contattaci</span></> :
                <>Get in <span>Touch</span></>}
          </h1>
          <p className={styles.pageSub}>{c.sub}</p>
        </div>
      </div>
      <div className={styles.contentWrap}>
        <div className={styles.grid}>
          <div className={styles.formCard}>
            <div className={styles.formTitle}>{FORM_TITLES[lang] || FORM_TITLES.en}</div>

            <div className={styles.formGroup}>
              <label className={styles.label}>{c.name}</label>
              <input
                className={styles.input}
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                placeholder={c.name}
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>{c.email}</label>
              <input
                className={styles.input}
                type="email"
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                placeholder={c.email}
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>{c.phone}</label>
              <input
                className={styles.input}
                value={form.phone}
                onChange={e => setForm({ ...form, phone: e.target.value })}
                placeholder="+355..."
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>{c.message}</label>
              <textarea
                className={styles.textarea}
                value={form.message}
                onChange={e => setForm({ ...form, message: e.target.value })}
                placeholder={c.message}
                rows={5}
              />
            </div>

            {success && <div className={styles.successMsg}>✅ {c.success}</div>}
            {error && <div className={styles.errorMsg}>❌ {c.error}</div>}

            <button
  className={styles.submitBtn}
  onClick={success ? () => { setSuccess(false); setForm({ name: "", email: "", phone: "", message: "" }); } : handleSubmit}
  disabled={sending}
>
  {sending ? c.sending : success ? (
    <>
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ marginRight: "8px", flexShrink: 0 }}
      >
        <polyline points="1 4 1 10 7 10" />
        <path d="M3.51 15a9 9 0 1 0 .49-3.51" />
      </svg>
      {lang === "al" ? "Dërgo mesazh tjetër" : lang === "it" ? "Invia un altro messaggio" : "Send another message"}
    </>
  ) : (
    <>
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ marginRight: "8px", flexShrink: 0 }}
      >
        <line x1="22" y1="2" x2="11" y2="13" />
        <polygon points="22 2 15 22 11 13 2 9 22 2" />
      </svg>
      {c.send}
    </>
  )}
</button>
          </div>
          <div className={styles.infoCol}>

            <div className={styles.infoCard} onClick={openDirections} style={{ cursor: "pointer" }}>
              <div className={styles.infoIcon}><MapPin size={20} /></div>
              <div>
                <div className={styles.infoTitle}>
                  {lang === "al" ? "Adresa" : lang === "it" ? "Indirizzo" : "Address"}
                </div>
                <div className={styles.infoText}>Tiranë, Shqipëri</div>
                <div className={styles.infoLink}>
                  {locating
                    ? (lang === "al" ? "Duke gjetur vendndodhjen..." : "Getting location...")
                    : (lang === "al" ? "Merr drejtimin →" : lang === "it" ? "Ottieni indicazioni →" : "Get Directions →")}
                </div>
              </div>
            </div>

            <div className={styles.infoCard}>
              <div className={styles.infoIcon}><Phone size={20} /></div>
              <div>
                <div className={styles.infoTitle}>
                  {lang === "al" ? "Telefon" : lang === "it" ? "Telefono" : "Phone"}
                </div>
                <a href="tel:+355684083950" className={styles.infoLink}>
                  +355 68 4083 950
                </a>
              </div>
            </div>

            <div className={styles.infoCard}>
              <div className={styles.infoIcon}><Mail size={20} /></div>
              <div>
                <div className={styles.infoTitle}>Email</div>
                <a href="mailto:info@2apharma.al" className={styles.infoLink}>
                  info@2apharma.al
                </a>
              </div>
            </div>

            <div className={styles.infoCard}>
              <div className={styles.infoIcon}><Clock size={20} /></div>
              <div>
                <div className={styles.infoTitle}>
                  {lang === "al" ? "Orari" : lang === "it" ? "Orario" : "Hours"}
                </div>
                <div className={styles.infoText}>
                  {lang === "al" ? "E Hënë–E Premte: 09:00–18:00"
                    : lang === "it" ? "Lun–Ven: 09:00–18:00"
                      : "Mon–Fri: 09:00–18:00"}
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
      <div className={styles.mapWrap}>
        <Map />
      </div>

    </div>
  );
}