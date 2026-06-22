"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "../../../lib/firebase.js";
import { onAuthStateChanged } from "firebase/auth";
import { generateSecret, getSecret, enableTotp, getOtpAuthUrl } from "../../../lib/totp.js";
import QRCode from "qrcode";

export default function Setup2FA() {
  const router = useRouter();
  const [qrUrl, setQrUrl] = useState("");
  const [token, setToken] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(true);
  const [uid, setUid] = useState(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (!user) { router.push("/login"); return; }
      setUid(user.uid);

      const data = await getSecret(user.uid);
      let sec = data?.secret;

      if (!sec) {
        sec = await generateSecret(user.uid);
      }

      const otpUrl = getOtpAuthUrl(sec, user.email);
      const qr = await QRCode.toDataURL(otpUrl);
      setQrUrl(qr);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  async function handleVerify() {
    setError("");
    try {
      const res = await fetch("/api/verify-2fa", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ uid, token }),
      });
      const data = await res.json();
      if (!data.ok) {
        setError("Kodi gabim! Provo përsëri.");
        return;
      }
      await enableTotp(uid);
      setSuccess(true);
      setTimeout(() => router.push("/admin"), 2000);
    } catch (err) {
      setError("Gabim serveri. Provo përsëri.");
    }
  }

  if (loading) return <div style={{ padding: 40 }}>Duke ngarkuar...</div>;

  if (success) return (
    <div style={{ padding: 40, textAlign: "center" }}>
      <h2>✅ 2FA u aktivizua me sukses!</h2>
      <p>Po të ridrejtojmë te paneli...</p>
    </div>
  );

  return (
    <div style={{ maxWidth: 400, margin: "60px auto", padding: 32, border: "1px solid #ddd", borderRadius: 16 }}>
      <h2 style={{ marginBottom: 8 }}>Aktivizo 2FA</h2>
      <p style={{ fontSize: 14, color: "#666", marginBottom: 24 }}>
        Skano kodin QR me <strong>Google Authenticator</strong> dhe fut kodin 6-shifror për të konfirmuar.
      </p>

      {qrUrl && (
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <img src={qrUrl} alt="QR Code" style={{ width: 200, height: 200 }} />
        </div>
      )}

      <input
        type="text"
        placeholder="Kodi 6-shifror"
        value={token}
        onChange={e => setToken(e.target.value.replace(/\D/g, ""))}
        maxLength={6}
        style={{ width: "100%", padding: "10px 14px", borderRadius: 10, border: "1px solid #ccc", fontSize: 18, textAlign: "center", letterSpacing: 6, boxSizing: "border-box", marginBottom: 12 }}
      />

      {error && <div style={{ color: "red", marginBottom: 12, fontSize: 14 }}>{error}</div>}

      <button
        onClick={handleVerify}
        style={{ width: "100%", padding: "12px", background: "#112E59", color: "#fff", border: "none", borderRadius: 10, fontSize: 15, fontWeight: 600, cursor: "pointer" }}
      >
        Konfirmo dhe Aktivizo
      </button>
    </div>
  );
}