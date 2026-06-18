"use client";

import { useState } from "react";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { useLang } from "../../context/LangContext.jsx";
import { db } from "../../lib/firebase.js";
import Map from "../../components/Map.jsx";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import styles from "./page.module.css";

export default function ContactClient() {
  const { lang, tx } = useLang();
  const c = tx.contact;

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

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
    const fallbackUrl =
      "https://www.google.com/maps/dir/?api=1&destination=41.34511991545273,19.762055167049983";

    window.open(fallbackUrl, "_blank");
    return;
  }

  setLocating(true);

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const { latitude, longitude } = position.coords;

      const url = `https://www.google.com/maps/dir/?api=1&origin=${latitude},${longitude}&destination=41.34511991545273,19.762055167049983&travelmode=driving`;

      setLocating(false);
      window.open(url, "_blank");
    },
    () => {
      setLocating(false);

      // fallback dacă user refuză locația
      const fallbackUrl =
        "https://www.google.com/maps/dir/?api=1&destination=41.34511991545273,19.762055167049983";

      window.open(fallbackUrl, "_blank");
    }
  );
}
  return (
    
    <div className={styles.page}>
      
      {/* HEADER */}
      <div className={styles.pageHeader}>
        <div className="section-label">{c.label}</div>
        <h1 className={styles.pageTitle}>{c.title}</h1>
        <p className={styles.pageSub}>{c.sub}</p>
      </div>

      <div className={styles.grid}>
        {/* FORM */}
        <div className={styles.formCard}>
          <div className={styles.formGroup}>
            <label className={styles.label}>{c.name}</label>
            <input
              className={styles.input}
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
              placeholder={c.name}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>{c.email}</label>
            <input
              className={styles.input}
              type="email"
              value={form.email}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
              placeholder={c.email}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>{c.phone}</label>
            <input
              className={styles.input}
              value={form.phone}
              onChange={(e) =>
                setForm({ ...form, phone: e.target.value })
              }
              placeholder="+355..."
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>{c.message}</label>
            <textarea
              className={styles.textarea}
              value={form.message}
              onChange={(e) =>
                setForm({ ...form, message: e.target.value })
              }
              placeholder={c.message}
              rows={5}
            />
          </div>

          {success && (
            <div className={styles.successMsg}>
              {c.success}
            </div>
          )}

          {error && (
            <div className={styles.errorMsg}>
              {c.error}
            </div>
          )}

          <button
            className={styles.submitBtn}
            onClick={handleSubmit}
            disabled={sending}
          >
            {sending ? c.sending : c.send}
          </button>
        </div>

        {/* INFO */}
        <div className={styles.infoCol}>

          {/* ADDRESS - GEO ROUTE */}
          <div
            className={styles.infoCard}
            onClick={openDirections}
            style={{ cursor: "pointer" }}
          >
            <div className={styles.infoIcon}>
              <MapPin size={20} />
            </div>

            <div>
              <div className={styles.infoTitle}>
                {lang === "al"
                  ? "Adresa"
                  : lang === "it"
                  ? "Indirizzo"
                  : "Address"}
              </div>

              <div className={styles.infoText}>
                Tiranë, Shqipëri
              </div>

              <div className={styles.infoLink}>
                {locating ? "Getting location..." : "Get Directions →"}
              </div>
            </div>
          </div>

          {/* PHONE */}
          <div className={styles.infoCard}>
            <div className={styles.infoIcon}>
              <Phone size={20} />
            </div>
            <div>
              <div className={styles.infoTitle}>
                {lang === "al"
                  ? "Telefon"
                  : lang === "it"
                  ? "Telefono"
                  : "Phone"}
              </div>
              <a
                href="tel:+355684083950"
                className={styles.infoLink}
              >
                +355 68 4083 950
              </a>
            </div>
          </div>

          {/* EMAIL */}
          <div className={styles.infoCard}>
            <div className={styles.infoIcon}>
              <Mail size={20} />
            </div>
            <div>
              <div className={styles.infoTitle}>
                Email
              </div>
              <a
                href="mailto:info@2apharma.al"
                className={styles.infoLink}
              >
                info@2apharma.al
              </a>
            </div>
          </div>

          {/* HOURS */}
          <div className={styles.infoCard}>
            <div className={styles.infoIcon}>
              <Clock size={20} />
            </div>
            <div>
              <div className={styles.infoTitle}>
                {lang === "al"
                  ? "Orari"
                  : lang === "it"
                  ? "Orario"
                  : "Hours"}
              </div>
              <div className={styles.infoText}>
                {lang === "al"
                  ? "E Hënë–E Premte: 09:00–18:00"
                  : lang === "it"
                  ? "Lun–Ven: 09:00–18:00"
                  : "Mon–Fri: 09:00–18:00"}
              </div>
            </div>
            
          </div>
          

        </div>
      
      </div>
        <section style={{ marginTop: "10px" }}>
        <Map />
      </section>
    </div>
  );
}