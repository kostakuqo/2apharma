"use client";

import styles from "./Map.module.css";

export default function Map() {
  const goToMaps = () => {
    const url = "https://www.google.com/maps/dir/?api=1&destination=41.34511991545273,19.762055167049983";
    window.open(url, "_blank");
  };

  return (
    <div style={{ width: "100%", marginBottom: "4px", marginTop: "4px", position: "relative" }}>
      <div style={{ height: "400px" }}>
        <iframe
          width="100%"
          height="100%"
          style={{ border: 0, borderRadius: "12px" }}
          loading="lazy"
          allowFullScreen
          src="https://maps.google.com/maps?q=41.34511991545273,19.762055167049983&z=15&output=embed"
        />
      </div>
      <button onClick={goToMaps} className={styles.mapBtn}>
        Navigate with Maps
      </button>
    </div>
  );
}