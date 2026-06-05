"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../lib/firebase.js";
import styles from "./page.module.css";

export default function LoginClient() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Reset parolă
  const [resetMode, setResetMode] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetSent, setResetSent] = useState(false);
  const [resetError, setResetError] = useState("");
  const [resetLoading, setResetLoading] = useState(false);

  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/admin");
    } catch (err) {
      setError("Email ose passwordi gabim!");
    } finally {
      setLoading(false);
    }
  }

  async function handleReset(e) {
    e.preventDefault();
    setResetLoading(true);
    setResetError("");
    try {
      await sendPasswordResetEmail(auth, resetEmail);
      setResetSent(true);
    } catch (err) {
      setResetError("Email-i nuk u gjet. Kontrollo adresën.");
    } finally {
      setResetLoading(false);
    }
  }

  // ── View: Reset parolă ──
  if (resetMode) {
    return (
      <div className={styles.page}>
        <div className={styles.card}>
          <div className={styles.logo}>2A Pharma</div>
          <h1 className={styles.title}>Rivendos Fjalëkalimin</h1>

          {resetSent ? (
            <div className={styles.successBox}>
              ✅ Email-i u dërgua! Kontrollo kutinë postare dhe ndiq udhëzimet.
              <button
                className={styles.linkBtn}
                onClick={() => { setResetMode(false); setResetSent(false); setResetEmail(""); }}
              >
                ← Kthehu te login
              </button>
            </div>
          ) : (
            <>
              <p className={styles.resetDesc}>
                Shkruaj email-in e llogarisë tënde dhe do të të dërgojmë një link për të rivendosur fjalëkalimin.
              </p>

              {resetError && <div className={styles.error}>{resetError}</div>}

              <form onSubmit={handleReset} className={styles.form}>
                <div className={styles.field}>
                  <label>Email</label>
                  <input
                    type="email"
                    value={resetEmail}
                    onChange={e => setResetEmail(e.target.value)}
                    placeholder="admin@2apharma.al"
                    required
                  />
                </div>
                <button type="submit" className={styles.btn} disabled={resetLoading}>
                  {resetLoading ? "Duke dërguar..." : "Dërgo Link-un"}
                </button>
              </form>

              <button
                className={styles.linkBtn}
                onClick={() => { setResetMode(false); setResetError(""); }}
              >
                ← Kthehu te login
              </button>
            </>
          )}
        </div>
      </div>
    );
  }

  // ── View: Login normal ──
  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.logo}>2A Pharma</div>
        <h1 className={styles.title}>Admin Login</h1>

        {error && <div className={styles.error}>{error}</div>}

        <form onSubmit={handleLogin} className={styles.form}>
          <div className={styles.field}>
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="admin@2apharma.al"
              required
            />
          </div>
          <div className={styles.field}>
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>
          <button type="submit" className={styles.btn} disabled={loading}>
            {loading ? "Duke u procesuar..." : "Logohu"}
          </button>
        </form>

        <button
          className={styles.linkBtn}
          onClick={() => { setResetMode(true); setResetEmail(email); }}
        >
          Keni harruar fjalëkalimin?
        </button>
      </div>
    </div>
  );
}