"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../lib/firebase.js";
import { getSecret } from "../../lib/totp.js";
import styles from "./page.module.css";

export default function LoginClient() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [step, setStep] = useState("login");
  const [totpToken, setTotpToken] = useState("");
  const [totpError, setTotpError] = useState("");
  const [totpLoading, setTotpLoading] = useState(false);
  const [userRef, setUserRef] = useState(null);

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
      const cred = await signInWithEmailAndPassword(auth, email, password);
      const data = await getSecret(cred.user.uid);

      if (data?.enabled) {
        setUserRef(cred.user);
        setStep("2fa");
      } else {
        router.push("/admin/setup-2fa");
      }
    } catch (err) {
      setError("Email sau parolă incorectă.");
    } finally {
      setLoading(false);
    }
  }

  async function handleTotp(e) {
    e.preventDefault();
    setTotpLoading(true);
    setTotpError("");

    try {
      const res = await fetch("/api/verify-2fa", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ uid: userRef.uid, token: totpToken }),
      });

      const data = await res.json();

      if (!data.ok) {
        setTotpError("Kod i pasaktë ose i skaduar.");
        return;
      }

      router.push("/admin");
    } catch {
      setTotpError("Err ne verifikim.Provoje perseri.");
    } finally {
      setTotpLoading(false);
    }
  }

  async function handleReset(e) {
    e.preventDefault();
    setResetLoading(true);
    setResetError("");

    try {
      await sendPasswordResetEmail(auth, resetEmail);
      setResetSent(true);
    } catch {
      setResetError("Email i pasaktë.");
    } finally {
      setResetLoading(false);
    }
  }

  const LogoBlock = () => (
    <div className={styles.logoWrap}>
      <div className={styles.logoIcon}>2A</div>
      <div className={styles.logo}>2A Pharma</div>
      <div className={styles.logoSub}>Admin Panel</div>
    </div>
  );
    /* ───────── RESET PASSWORD ───────── */
  if (resetMode) {
    return (
      <div className={styles.page}>
        <div className={styles.card}>
          <LogoBlock />

          <h1 className={styles.title}>Rivendos fjalëkalimin</h1>

          {resetSent ? (
            <div className={styles.successBox}>
              <span className={styles.iconSuccess}>✓</span>
              Email u dërgua me sukses. Kontrollo inbox-in.

              <button
                className={styles.linkBtn}
                onClick={() => {
                  setResetMode(false);
                  setResetSent(false);
                  setResetEmail("");
                }}
              >
                ← Kthehu te login
              </button>
            </div>
          ) : (
            <>
              <p className={styles.subtitle}>
                Shkruaj email-in dhe do të marrësh link për reset.
              </p>

              {resetError && (
                <div className={styles.error}>
                  <span className={styles.iconWarn}>!</span>
                  {resetError}
                </div>
              )}

              <form onSubmit={handleReset} className={styles.form}>
                <div className={styles.field}>
                  <label>Email</label>
                  <input
                    type="email"
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                    placeholder="admin@domain.com"
                    required
                  />
                </div>

                <button className={styles.btn} disabled={resetLoading}>
                  <span className={styles.btnIcon}>✉</span>
                  {resetLoading ? "Se dërgon..." : "Dërgo link"}
                </button>
              </form>

              <button
                className={styles.linkBtn}
                onClick={() => setResetMode(false)}
              >
                ← Kthehu
              </button>
            </>
          )}
        </div>
      </div>
    );
  }

  /* ───────── 2FA STEP ───────── */
  if (step === "2fa") {
    return (
      <div className={styles.page}>
        <div className={styles.card}>
          <LogoBlock />

          <h1 className={styles.title}>Verifikim 2FA</h1>

          <p className={styles.subtitle}>
            Fut kodin 6-shifror nga aplikacioni Authenticator.
          </p>

          {totpError && (
            <div className={styles.error}>
              <span className={styles.iconWarn}>!</span>
              {totpError}
            </div>
          )}

          <form onSubmit={handleTotp} className={styles.form}>
            <div className={styles.field}>
              <label>Kodi</label>
              <input
                type="text"
                value={totpToken}
                onChange={(e) =>
                  setTotpToken(e.target.value.replace(/\D/g, ""))
                }
                maxLength={6}
                placeholder="000000"
                className={styles.codeInput}
                required
              />
            </div>

            <button className={styles.btn} disabled={totpLoading}>
              <span className={styles.btnIcon}>→</span>
              {totpLoading ? "Verifikim..." : "Verifiko"}
            </button>
          </form>

          <button
            className={styles.linkBtn}
            onClick={() => {
              setStep("login");
              setTotpToken("");
              setTotpError("");
            }}
          >
            ← Kthehu
          </button>
        </div>
      </div>
    );
  }
    /* ───────── LOGIN DEFAULT ───────── */
  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <LogoBlock />

        

        

        {error && (
          <div className={styles.error}>
            <span className={styles.iconWarn}>!</span>
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className={styles.form}>
          <div className={styles.field}>
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@2apharma.al"
              required
            />
          </div>

          <div className={styles.field}>
            <label>Passwordi</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>

          <button className={styles.btn} disabled={loading}>
            <span className={styles.btnIcon}>→</span>
            {loading ? "Duke Procesuar..." : "Hyr"}
          </button>
        </form>

        <div className={styles.divider}>
          <span>ose</span>
        </div>

        <button
          className={styles.linkBtn}
          onClick={() => {
            setResetMode(true);
            setResetEmail(email);
          }}
        >
          Kam harruar fjalëkalimin?
        </button>
      </div>
    </div>
  );
}

