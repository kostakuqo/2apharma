"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { auth, db } from "../../lib/firebase.js";
import { onAuthStateChanged, signOut } from "firebase/auth";
import * as XLSX from "xlsx";
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc, orderBy, query, setDoc, getDoc } from "firebase/firestore";
import { useLang } from "../../context/LangContext.jsx";
import styles from "./page.module.css";


const iconProps = {
  width: 17,
  height: 17,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};
const IconDownload = (p) => (
  <svg {...iconProps} {...p}>
    <path d="M12 3v12" />
    <path d="m7 10 5 5 5-5" />
    <path d="M5 21h14" />
  </svg>
);


const IconUpload = (p) => (
  <svg {...iconProps} {...p}>
    <path d="M12 21V9" />
    <path d="m7 10 5-5 5 5" />
    <path d="M5 21h14" />
  </svg>
);

const IconImages = (p) => (
  <svg {...iconProps} {...p}>
    <rect x="3" y="3" width="14" height="14" rx="2" />
    <path d="M7 7h.01" />
    <path d="M3 13l3.5-3.5a1.5 1.5 0 0 1 2.1 0L13 14" />
    <path d="M21 8v9a2 2 0 0 1-2 2H8" />
  </svg>
);

const IconFilter = (p) => (
  <svg {...iconProps} {...p}>
    <path d="M4 6h16" />
    <path d="M7 12h10" />
    <path d="M10 18h4" />
  </svg>
);

const IconSearch = (p) => (
  <svg {...iconProps} {...p}>
    <circle cx="11" cy="11" r="7" />
    <path d="m21 21-4.3-4.3" />
  </svg>
);

const IconTrash = (p) => (
  <svg {...iconProps} {...p}>
    <path d="M4 7h16" /><path d="M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
    <path d="M6 7l1 13a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1l1-13" />
    <path d="M10 11v6M14 11v6" />
  </svg>
);

const IconEdit = (p) => (
  <svg {...iconProps} {...p}>
    <path d="M12 20h9" />
    <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
  </svg>
);

const IconMail = (p) => (
  <svg {...iconProps} {...p}>
    <rect x="3" y="5" width="18" height="14" rx="2.5" />
    <path d="M3.5 6.5 12 13l8.5-6.5" />
  </svg>
);

const IconMailOpen = (p) => (
  <svg {...iconProps} {...p}>
    <path d="M3 8.5 12 3l9 5.5V18a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z" />
    <path d="M3 8.5 12 14l9-5.5" />
  </svg>
);

const IconPackage = (p) => (
  <svg {...iconProps} {...p}>
    <path d="M21 8 12 3 3 8v8l9 5 9-5Z" /><path d="M3 8l9 5 9-5" />
    <path d="M12 13v8" />
  </svg>
);

const IconMessages = (p) => (
  <svg {...iconProps} {...p}>
    <path d="M4 4.5h13a2 2 0 0 1 2 2V13a2 2 0 0 1-2 2H10l-4.5 4V15H4a2 2 0 0 1-2-2V6.5a2 2 0 0 1 2-2Z" />
  </svg>
);

const IconHandshake = (p) => (
  <svg {...iconProps} {...p}>
    <path d="M2 12.5 6 9l4 3-1.5 1.7a1.4 1.4 0 0 0 2 2L14 12l3 2.5" />
    <path d="M22 12.5 18 9l-4.8 4" /><path d="M8 15.5 10.3 18a1.4 1.4 0 0 0 2-2" />
    <path d="M6 9 9 5.5h2.5L14 8" /><path d="M18 9l-3-3.5h-2.5" />
  </svg>
);

const IconSettings = (p) => (
  <svg {...iconProps} {...p}>
    <circle cx="12" cy="12" r="3.2" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z" />
  </svg>
);

const IconPlus = (p) => (
  <svg {...iconProps} {...p}><path d="M12 5v14M5 12h14" /></svg>
);

const IconRefresh = (p) => (
  <svg {...iconProps} {...p}>
    <path d="M3 12a9 9 0 0 1 15.3-6.4L21 8" /><path d="M21 3v5h-5" />
    <path d="M21 12a9 9 0 0 1-15.3 6.4L3 16" /><path d="M3 21v-5h5" />
  </svg>
);

const IconGlobe = (p) => (
  <svg {...iconProps} {...p}>
    <circle cx="12" cy="12" r="9" /><path d="M3 12h18" />
    <path d="M12 3a14 14 0 0 1 0 18a14 14 0 0 1 0-18Z" />
  </svg>
);

const IconLogOut = (p) => (
  <svg {...iconProps} {...p}>
    <path d="M9 21H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3" />
    <path d="M16 17l5-5-5-5" /><path d="M21 12H9" />
  </svg>
);

const IconCheck = (p) => (
  <svg {...iconProps} strokeWidth={2.4} {...p}><path d="M5 12.5 10 17 19 7" /></svg>
);

const IconAlert = (p) => (
  <svg {...iconProps} strokeWidth={2.4} {...p}>
    <path d="M12 8.5v5" /><circle cx="12" cy="16.3" r="0.4" fill="currentColor" stroke="none" />
    <path d="M10.6 3.9 2.8 18a1.6 1.6 0 0 0 1.4 2.4h15.6a1.6 1.6 0 0 0 1.4-2.4L13.4 3.9a1.6 1.6 0 0 0-2.8 0Z" />
  </svg>
);

const IconX = (p) => (
  <svg {...iconProps} {...p}><path d="M18 6 6 18M6 6l12 12" /></svg>
);

const IconPhoto = (p) => (
  <svg {...iconProps} {...p}>
    <rect x="3" y="4" width="18" height="16" rx="2.5" />
    <circle cx="9" cy="10" r="1.6" /><path d="M5.5 17 10 12.5l3 3 3-3.5 3.5 5" />
  </svg>
);

const IconBuilding = (p) => (
  <svg {...iconProps} {...p}>
    <rect x="4" y="3" width="10" height="18" rx="1" />
    <path d="M14 21V8l6 3v10" /><path d="M7.5 7h3M7.5 11h3M7.5 15h3" />
  </svg>
);

/* ──────────────────────────────────────────────────────────────── */

const adminTx = {
  al: {
    title: "Paneli Admin — 2A Pharma", logout: "Dil", products: "Produkte", messages: "Mesazhe", partners: "Partnerë",
    totalProducts: "Produkte gjithsej", inStock: "Në stok", outStock: "Pa stok", lowStock: "Stok i ulët",
    unread: "Mesazhe të palexuara", totalPartners: "Partnerë gjithsej",
    addProduct: "Shto produkt", editProduct: "Ndrysho produktin", newProduct: "Produkt i ri",
    save: "Ruaj ndryshimet", add: "Shto produkt", cancel: "Anulo", delete: "Fshi", edit: "Modifiko", refresh: "Rifresko",
    loading: "Duke u ngarkuar...", loadingMessages: "Duke u ngarkuar mesazhet...",
    noMessages: "Nuk ka mesazhe të reja.", markRead: "Sheno si te lexuar",
    incomingMessages: "Mesazhe te ardhura", unreadLabel: "te palexuara",
    confirmDelete: "A je i sigurt që do ta fshish produktin?",
    confirmDeleteMsg: "A je i sigurt që do ta fshish këtë mesazh?",
    confirmDeletePartner: "A je i sigurt që do ta fshish këtë partner?",
    codLabel: "Kodi i produktit",
    nameEN: "Emri EN", nameAL: "Emri AL", nameIT: "Emri IT",
    catEN: "Kategoria EN", catAL: "Kategoria AL", catIT: "Kategoria IT",
    descEN: "Përshkrimi EN", descAL: "Përshkrimi AL", descIT: "Përshkrimi IT",
    stock: "Stoku", icon: "Ikona (emoji)", image: "Imagine", uploading: "Duke ngarkuar...",
    photo: "Foto", name: "Emri", category: "Kategoria", actions: "Veprimet",
    addPartner: "Shto partner", newPartner: "Partner i ri", editPartner: "Ndrysho partnerin",
    partnerName: "Emri i partnerit", partnerLogo: "Logo (ngarko foto)", partnerWebsite: "Faqja web",
    settings: "Modifikime", siteLogo: "Logo e faqes", logoTypeLabel: "Lloji i logos",
    logoTypeText: "Tekst (2A / Pharma)", logoTypeImage: "Imagine (ngarko foto)",
    logoMarkLabel: "Shkurtim (p.sh. 2A)", logoTextLabel: "Emri (p.sh. Pharma)",
    logoImageLabel: "Imazhi i logos", currentLogo: "Logo aktuale", saveSettings: "Ruaj logo",
    toastProductSaved: "Produkti u ruajt me sukses!", toastProductDeleted: "Produkti u fshi.",
    toastPartnerSaved: "Partneri u ruajt me sukses!", toastPartnerDeleted: "Partneri u fshi.",
    toastSettingsSaved: "Logo u ruajt me sukses!", toastMessageDeleted: "Mesazhi u fshi.",
    toastMessageRead: "Mesazhi u shënua si i lexuar.", toastError: "Diçka shkoi keq. Provo përsëri.",
    savingLabel: "Duke ruajtur...", visit: "Shiko faqen",
    draft: "Draft", publishedLbl: "Publikuar",
    importExcel: "Importo Excel", exportExcel: "Eksporto Excel", importWithPhotos: "Importo me foto",
    importPanelTitle: "Import Excel + Foto (sipas kodit)",
    importExcelFileLbl: "Skedari Excel", importPhotosLbl: "Foto (zgjidh të gjitha njëherësh)",
    importSkuHint: "Çdo rresht duhet të ketë një kolonë 'cod' (ose 'sku') që përputhet me emrin e skedarit të fotos (p.sh. cod=PRD001 → PRD001.jpg).",
    startImport: "Fillo importin", importingLabel: "Duke importuar...",
    downloadTemplateUrl: "Shabllon (me URL)", downloadTemplatePhoto: "Shabllon (me foto)",
    checkingUrls: "Duke verifikuar imazhet...",
    previewTitle: "Shiko para se të importosh", previewCod: "Kodi", previewName: "Emri",
    previewUrl: "URL", previewStatus: "Statusi", previewAction: "Veprimi",
    statusUrlOk: "Imazhi u ngarkua ✓", statusUrlFail: "Imazhi nuk u ngarkua ✗", statusNoUrl: "Pa URL",
    actionCreate: "Shto të ri", actionUpdate: "Përditëso", actionSkip: "Kapërce (pa kod)",
    confirmImportBtn: "Konfirmo importin", closeBtn: "Mbyll",
    importReportTitle: "Rezultati i importit", statusPhotoFound: "Foto u gjet ✓", statusPhotoMissing: "Foto mungon ⚠",
    statusSkippedNoCode: "Kapërcyer — pa kod",
    toastExcelEmpty: "Skedari Excel është bosh.",
    toastSelectExcelFirst: "Zgjidh fillimisht skedarin Excel.",
    toastExcelFailed: "Importi Excel dështoi.",
    importSummary1: (created, updated, skipped, published, drafts) =>
      `Importi: ${created} shtuar, ${updated} përditësuar, ${skipped} kapërcyer (pa kod) — ${published} publikuar, ${drafts} draft.`,
    importSummary2: (created, updated, skipped, published, drafts) =>
      `Importi: ${created} shtuar, ${updated} përditësuar, ${skipped} kapërcyer — ${published} publikuar, ${drafts} draft.`,
    filterSearchPlaceholder: "Kërko sipas kodit ose emrit...",
    filterStockAll: "I gjithë stoku", filterStockIn: "Në stok", filterStockLow: "Stok i kufizuar", filterStockOut: "Pa stok",
    filterPublishAll: "Të gjitha", filterPublishPublished: "Të publikuara", filterPublishDraft: "Draft",
    filterCount: (shown, total) => `${shown} nga ${total} produkte`,
    noProductsMatchFilter: "Asnjë produkt nuk përputhet me filtrat e zgjedhur.",
  },
  en: {
    title: "Admin Panel — 2A Pharma", logout: "Logout", products: "Products", messages: "Messages", partners: "Partners",
    totalProducts: "Total products", inStock: "In stock", outStock: "Out of stock", lowStock: "Low stock",
    unread: "Unread messages", totalPartners: "Total partners",
    addProduct: "Add product", editProduct: "Edit product", newProduct: "New product",
    save: "Save changes", add: "Add product", cancel: "Cancel", delete: "Delete", edit: "Edit", refresh: "Refresh",
    loading: "Loading...", loadingMessages: "Loading messages...",
    noMessages: "No new messages.", markRead: "Mark as read",
    incomingMessages: "Incoming messages", unreadLabel: "unread",
    confirmDelete: "Are you sure you want to delete this product?",
    confirmDeleteMsg: "Are you sure you want to delete this message?",
    confirmDeletePartner: "Are you sure you want to delete this partner?",
    codLabel: "Product code",
    nameEN: "Name EN", nameAL: "Name AL", nameIT: "Name IT",
    catEN: "Category EN", catAL: "Category AL", catIT: "Category IT",
    descEN: "Description EN", descAL: "Description AL", descIT: "Description IT",
    stock: "Stock", icon: "Icon (emoji)", image: "Image", uploading: "Uploading...",
    photo: "Photo", name: "Name", category: "Category", actions: "Actions",
    addPartner: "Add partner", newPartner: "New partner", editPartner: "Edit partner",
    partnerName: "Partner name", partnerLogo: "Logo (upload photo)", partnerWebsite: "Website",
    settings: "Settings", siteLogo: "Site logo", logoTypeLabel: "Logo type",
    logoTypeText: "Text (2A / Pharma)", logoTypeImage: "Image (upload photo)",
    logoMarkLabel: "Short mark (e.g. 2A)", logoTextLabel: "Name (e.g. Pharma)",
    logoImageLabel: "Logo image", currentLogo: "Current logo", saveSettings: "Save logo",
    toastProductSaved: "Product saved successfully!", toastProductDeleted: "Product deleted.",
    toastPartnerSaved: "Partner saved successfully!", toastPartnerDeleted: "Partner deleted.",
    toastSettingsSaved: "Logo saved successfully!", toastMessageDeleted: "Message deleted.",
    toastMessageRead: "Message marked as read.", toastError: "Something went wrong. Please try again.",
    savingLabel: "Saving...", visit: "Visit site",
    draft: "Draft", publishedLbl: "Published",
    importExcel: "Import Excel", exportExcel: "Export Excel", importWithPhotos: "Import with photos",
    importPanelTitle: "Import Excel + Photos (by code)",
    importExcelFileLbl: "Excel file", importPhotosLbl: "Photos (select all at once)",
    importSkuHint: "Each row needs a 'cod' (or 'sku') column matching the photo filename (e.g. cod=PRD001 → PRD001.jpg).",
    startImport: "Start import", importingLabel: "Importing...",
    downloadTemplateUrl: "Template (with URL)", downloadTemplatePhoto: "Template (with photos)",
    checkingUrls: "Checking images...",
    previewTitle: "Preview before importing", previewCod: "Code", previewName: "Name",
    previewUrl: "URL", previewStatus: "Status", previewAction: "Action",
    statusUrlOk: "Image loaded ✓", statusUrlFail: "Image failed to load ✗", statusNoUrl: "No URL",
    actionCreate: "Create new", actionUpdate: "Update", actionSkip: "Skip (no code)",
    confirmImportBtn: "Confirm import", closeBtn: "Close",
    importReportTitle: "Import result", statusPhotoFound: "Photo found ✓", statusPhotoMissing: "Photo missing ⚠",
    statusSkippedNoCode: "Skipped — no code",
    toastExcelEmpty: "The Excel file is empty.",
    toastSelectExcelFirst: "Please choose the Excel file first.",
    toastExcelFailed: "Excel import failed.",
    importSummary1: (created, updated, skipped, published, drafts) =>
      `Import: ${created} added, ${updated} updated, ${skipped} skipped (no code) — ${published} published, ${drafts} draft.`,
    importSummary2: (created, updated, skipped, published, drafts) =>
      `Import: ${created} added, ${updated} updated, ${skipped} skipped — ${published} published, ${drafts} draft.`,
    filterSearchPlaceholder: "Search by code or name...",
    filterStockAll: "All stock", filterStockIn: "In stock", filterStockLow: "Low stock", filterStockOut: "Out of stock",
    filterPublishAll: "All", filterPublishPublished: "Published", filterPublishDraft: "Draft",
    filterCount: (shown, total) => `${shown} of ${total} products`,
    noProductsMatchFilter: "No product matches the selected filters.",
  },
  it: {
    title: "Pannello Admin — 2A Pharma", logout: "Esci", products: "Prodotti", messages: "Messaggi", partners: "Partner",
    totalProducts: "Prodotti totali", inStock: "Disponibile", outStock: "Non disponibile", lowStock: "Scorte basse",
    unread: "Messaggi non letti", totalPartners: "Partner totali",
    addProduct: "Aggiungi prodotto", editProduct: "Modifica prodotto", newProduct: "Nuovo prodotto",
    save: "Salva modifiche", add: "Aggiungi prodotto", cancel: "Annulla", delete: "Elimina", edit: "Modifica", refresh: "Aggiorna",
    loading: "Caricamento...", loadingMessages: "Caricamento messaggi...",
    noMessages: "Nessun nuovo messaggio.", markRead: "Segna come letto",
    incomingMessages: "Messaggi in arrivo", unreadLabel: "non letti",
    confirmDelete: "Sei sicuro di voler eliminare questo prodotto?",
    confirmDeleteMsg: "Sei sicuro di voler eliminare questo messaggio?",
    confirmDeletePartner: "Sei sicuro di voler eliminare questo partner?",
    codLabel: "Codice prodotto",
    nameEN: "Nome EN", nameAL: "Nome AL", nameIT: "Nome IT",
    catEN: "Categoria EN", catAL: "Categoria AL", catIT: "Categoria IT",
    descEN: "Descrizione EN", descAL: "Descrizione AL", descIT: "Descrizione IT",
    stock: "Scorte", icon: "Icona (emoji)", image: "Immagine", uploading: "Caricamento...",
    photo: "Foto", name: "Nome", category: "Categoria", actions: "Azioni",
    addPartner: "Aggiungi partner", newPartner: "Nuovo partner", editPartner: "Modifica partner",
    partnerName: "Nome partner", partnerLogo: "Logo (carica foto)", partnerWebsite: "Sito web",
    settings: "Impostazioni", siteLogo: "Logo del sito", logoTypeLabel: "Tipo di logo",
    logoTypeText: "Testo (2A / Pharma)", logoTypeImage: "Immagine (carica foto)",
    logoMarkLabel: "Sigla (es. 2A)", logoTextLabel: "Nome (es. Pharma)",
    logoImageLabel: "Immagine logo", currentLogo: "Logo attuale", saveSettings: "Salva logo",
    toastProductSaved: "Prodotto salvato con successo!", toastProductDeleted: "Prodotto eliminato.",
    toastPartnerSaved: "Partner salvato con successo!", toastPartnerDeleted: "Partner eliminato.",
    toastSettingsSaved: "Logo salvato con successo!", toastMessageDeleted: "Messaggio eliminato.",
    toastMessageRead: "Messaggio segnato come letto.", toastError: "Qualcosa è andato storto. Riprova.",
    savingLabel: "Salvataggio in corso...", visit: "Visita il sito",
    draft: "Bozza", publishedLbl: "Pubblicato",
    importExcel: "Importa Excel", exportExcel: "Esporta Excel", importWithPhotos: "Importa con foto",
    importPanelTitle: "Importa Excel + Foto (per codice)",
    importExcelFileLbl: "File Excel", importPhotosLbl: "Foto (seleziona tutte insieme)",
    importSkuHint: "Ogni riga deve avere una colonna 'cod' (o 'sku') corrispondente al nome del file foto (es. cod=PRD001 → PRD001.jpg).",
    startImport: "Avvia importazione", importingLabel: "Importazione in corso...",
    downloadTemplateUrl: "Modello (con URL)", downloadTemplatePhoto: "Modello (con foto)",
    checkingUrls: "Verifica immagini...",
    previewTitle: "Anteprima prima di importare", previewCod: "Codice", previewName: "Nome",
    previewUrl: "URL", previewStatus: "Stato", previewAction: "Azione",
    statusUrlOk: "Immagine caricata ✓", statusUrlFail: "Immagine non caricata ✗", statusNoUrl: "Nessun URL",
    actionCreate: "Crea nuovo", actionUpdate: "Aggiorna", actionSkip: "Salta (nessun codice)",
    confirmImportBtn: "Conferma importazione", closeBtn: "Chiudi",
    importReportTitle: "Risultato importazione", statusPhotoFound: "Foto trovata ✓", statusPhotoMissing: "Foto mancante ⚠",
    statusSkippedNoCode: "Saltato — nessun codice",
    toastExcelEmpty: "Il file Excel è vuoto.",
    toastSelectExcelFirst: "Scegli prima il file Excel.",
    toastExcelFailed: "Importazione Excel fallita.",
    importSummary1: (created, updated, skipped, published, drafts) =>
      `Importazione: ${created} aggiunti, ${updated} aggiornati, ${skipped} saltati (senza codice) — ${published} pubblicati, ${drafts} bozza.`,
    importSummary2: (created, updated, skipped, published, drafts) =>
      `Importazione: ${created} aggiunti, ${updated} aggiornati, ${skipped} saltati — ${published} pubblicati, ${drafts} bozza.`,
    filterSearchPlaceholder: "Cerca per codice o nome...",
    filterStockAll: "Tutte le scorte", filterStockIn: "Disponibile", filterStockLow: "Scorte basse", filterStockOut: "Non disponibile",
    filterPublishAll: "Tutti", filterPublishPublished: "Pubblicati", filterPublishDraft: "Bozza",
    filterCount: (shown, total) => `${shown} di ${total} prodotti`,
    noProductsMatchFilter: "Nessun prodotto corrisponde ai filtri selezionati.",
  },
};

async function uploadImage(file, folder = "") {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "2a-pharma-upload");
  if (folder) formData.append("folder", folder);
  const res = await fetch("https://api.cloudinary.com/v1_1/diwmjt7aa/image/upload", { method: "POST", body: formData });
  const data = await res.json();
  return data.secure_url;
}

function isValidImageUrl(value) {
  if (!value || typeof value !== "string") return false;
  try {
    const u = new URL(value.trim());
    return u.protocol === "http:" || u.protocol === "https:";
  } catch {
    return false;
  }
}

// Actually tries to load the image in the browser (not just "looks like a URL").
// This is what catches links copied from other sites that block hotlinking,
// or links that point to an HTML page instead of a real image file.
function checkImageUrlLoads(url) {
  return new Promise((resolve) => {
    if (!isValidImageUrl(url)) {
      resolve(false);
      return;
    }
    const img = new window.Image();
    const timer = setTimeout(() => resolve(false), 8000);
    img.onload = () => { clearTimeout(timer); resolve(true); };
    img.onerror = () => { clearTimeout(timer); resolve(false); };
    img.src = url.trim();
  });
}

function normalizeCode(c) {
  return String(c || "").trim().toLowerCase();
}

// Finds an existing product with the same "cod" (case-insensitive, trimmed).
// This is the single source of truth for "should this row update or create".
function findProductByCode(products, cod) {
  const norm = normalizeCode(cod);
  if (!norm) return null;
  return products.find((p) => normalizeCode(p.cod) === norm) || null;
}

const DEFAULT_SITE_SETTINGS = { logoType: "text", logoMark: "2A", logoText: "Pharma", logoImageUrl: "" };

export default function AdminClient() {
  const { lang, toggle } = useLang();
  const router = useRouter();
  const tx = adminTx[lang];
  const [imageFile, setImageFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [user, setUser] = useState(null);
  const [sessionChecked, setSessionChecked] = useState(false);
  const [activeTab, setActiveTab] = useState("products");
  const [products, setProducts] = useState([]);
  const [productSearch, setProductSearch] = useState("");
  const [stockFilter, setStockFilter] = useState("all");
  const [publishFilter, setPublishFilter] = useState("all");



  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editProduct, setEditProduct] = useState(null);

  const emptyForm = {
    cod: "",
    name_en: "", name_al: "", name_it: "",
    desc_en: "", desc_al: "", desc_it: "",
    category_en: "", category_al: "", category_it: "",
    stock: "in", icon: "", image_url: ""
  };
  const [form, setForm] = useState(emptyForm);
  const [messages, setMessages] = useState([]);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [partners, setPartners] = useState([]);
  const [loadingPartners, setLoadingPartners] = useState(false);
  const [showPartnerForm, setShowPartnerForm] = useState(false);
  const [editPartner, setEditPartner] = useState(null);
  const [partnerImageFile, setPartnerImageFile] = useState(null);
  const [uploadingPartner, setUploadingPartner] = useState(false);
  const emptyPartnerForm = { name: "", website: "", logo_url: "" };
  const [partnerForm, setPartnerForm] = useState(emptyPartnerForm);
  const [siteSettings, setSiteSettings] = useState(DEFAULT_SITE_SETTINGS);
  const [logoImageFile, setLogoImageFile] = useState(null);
  const [savingSettings, setSavingSettings] = useState(false);

  // ── Import Excel cu URL (Format 1) ──
  const [checkingUrls, setCheckingUrls] = useState(false);
  const [importPreview, setImportPreview] = useState(null); // { fileName, rows: [...] }
  const [confirmingImport, setConfirmingImport] = useState(false);

  // ── Import Excel + Poze (Format 2) ──
  const [showPhotoImport, setShowPhotoImport] = useState(false);
  const [importExcelFile, setImportExcelFile] = useState(null);
  const [importPhotoFiles, setImportPhotoFiles] = useState([]);
  const [importingWithPhotos, setImportingWithPhotos] = useState(false);
  const [importReport, setImportReport] = useState(null); // [{cod, status}]

  const [toast, setToast] = useState(null); // { message, type: "success" | "error" }
  const toastTimerRef = useRef(null);
  const [busy, setBusy] = useState(false);
  const filteredProducts = products.filter((p) => {
    const search = productSearch.toLowerCase();

    const matchSearch =
      !search ||
      p.cod?.toLowerCase().includes(search) ||
      p.name_en?.toLowerCase().includes(search) ||
      p.name_al?.toLowerCase().includes(search) ||
      p.name_it?.toLowerCase().includes(search);

    const matchStock =
      stockFilter === "all" ||
      p.stock === stockFilter;

    const matchPublish =
      publishFilter === "all" ||
      (publishFilter === "published" && p.published) ||
      (publishFilter === "draft" && !p.published);

    return matchSearch && matchStock && matchPublish;
  }); // true în timpul oricărei salvări/ștergeri

  function exportProductsExcel() {
    const excelData = products.map((p) => ({
      cod: p.cod || "",
      id: p.id,
      name_en: p.name_en || "",
      name_al: p.name_al || "",
      name_it: p.name_it || "",
      category_en: p.category_en || "",
      category_al: p.category_al || "",
      category_it: p.category_it || "",
      desc_en: p.desc_en || "",
      desc_al: p.desc_al || "",
      desc_it: p.desc_it || "",
      icon: p.icon || "",
      image_url: p.image_url || "",
      stock: p.stock || "",
      published: p.published ? "true" : "false",
    }));

    const worksheet = XLSX.utils.json_to_sheet(excelData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Products");
    XLSX.writeFile(workbook, "products.xlsx");
  }

  function downloadTemplate(withUrl) {
    const cols = withUrl
      ? ["cod", "name_en", "name_al", "name_it", "category_en", "category_al", "category_it", "desc_en", "desc_al", "desc_it", "icon", "image_url", "stock"]
      : ["cod", "name_en", "name_al", "name_it", "category_en", "category_al", "category_it", "desc_en", "desc_al", "desc_it", "icon", "stock"];
    const exampleRow = Object.fromEntries(cols.map((c) => [c, c === "cod" ? "PRD001" : c === "stock" ? "in" : ""]));
    const ws = XLSX.utils.json_to_sheet([exampleRow]);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Template");
    XLSX.writeFile(wb, withUrl ? "template_cu_url.xlsx" : "template_cu_foto.xlsx");
  }

  // ── Format 1, pasul 1: citește Excel-ul și verifică fiecare URL înainte de a scrie orice în baza de date ──
  async function handleImportExcelFile(e) {
    const file = e.target.files[0];
    if (!file) return;
    setCheckingUrls(true);
    setImportPreview(null);

    try {
      const data = await file.arrayBuffer();
      const workbook = XLSX.read(data);
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const rows = XLSX.utils.sheet_to_json(worksheet);
      if (!rows.length) {
        showToast(tx.toastExcelEmpty, "error");
        return;
      }

      const checked = await Promise.all(
        rows.map(async (row) => {
          const cod = String(row.cod || row.sku || "").trim();
          const url = row.image_url ? String(row.image_url).trim() : "";
          const hasUrl = !!url;
          const urlLoads = hasUrl ? await checkImageUrlLoads(url) : false;
          const existing = cod ? findProductByCode(products, cod) : null;

          let status;
          if (!hasUrl) status = tx.statusNoUrl;
          else status = urlLoads ? tx.statusUrlOk : tx.statusUrlFail;

          const action = !cod ? "skip" : existing ? "update" : "create";

          return {
            cod,
            name: row.name_en || row.name_al || row.name_it || "—",
            url,
            urlLoads,
            status,
            action,
            row,
          };
        })
      );

      setImportPreview({ fileName: file.name, rows: checked });
    } catch (err) {
      console.error(err);
      showToast(tx.toastExcelFailed, "error");
    } finally {
      setCheckingUrls(false);
      e.target.value = "";
    }
  }

  // ── Format 1, pasul 2: după ce ai văzut previzualizarea, confirmi și abia atunci se scrie în Firestore ──
  async function handleConfirmImportExcel() {
    if (!importPreview) return;
    setConfirmingImport(true);
    setBusy(true);

    try {
      let created = 0, updated = 0, skipped = 0, published = 0, drafts = 0;

      for (const item of importPreview.rows) {
        if (item.action === "skip") { skipped++; continue; }
        const row = item.row;

        const productData = {
          cod: item.cod,
          name_en: row.name_en || "",
          name_al: row.name_al || "",
          name_it: row.name_it || "",
          category_en: row.category_en || "",
          category_al: row.category_al || "",
          category_it: row.category_it || "",
          desc_en: row.desc_en || "",
          desc_al: row.desc_al || "",
          desc_it: row.desc_it || "",
          icon: row.icon || "",
          image_url: item.urlLoads ? item.url : "",
          stock: row.stock || "in",
          published: item.urlLoads,
        };

        const existing = findProductByCode(products, item.cod);
        if (existing) {
          await updateDoc(doc(db, "products", existing.id), productData);
          updated++;
        } else {
          await addDoc(collection(db, "products"), productData);
          created++;
        }

        if (item.urlLoads) published++; else drafts++;
      }

      await loadProducts();
      showToast(tx.importSummary1(created, updated, skipped, published, drafts), "success");
      setImportPreview(null);
    } catch (err) {
      console.error(err);
      showToast(tx.toastExcelFailed, "error");
    } finally {
      setConfirmingImport(false);
      setBusy(false);
    }
  }

  // ── Format 2: Excel fără URL + poze încărcate separat, potrivite după coloana "cod" / "sku" ──
  async function handleImportWithPhotos() {
    if (!importExcelFile) {
      showToast(tx.toastSelectExcelFirst, "error");
      return;
    }
    setImportingWithPhotos(true);
    setBusy(true);
    setImportReport(null);

    try {
      const data = await importExcelFile.arrayBuffer();
      const workbook = XLSX.read(data);
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const rows = XLSX.utils.sheet_to_json(worksheet);
      if (!rows.length) {
        showToast("Excel file is empty.", "error");
        return;
      }

      let created = 0, updated = 0, published = 0, drafts = 0, skipped = 0;
      const report = [];

      for (const row of rows) {
        const cod = String(row.cod || row.sku || "").trim();

        if (!cod) {
          skipped++;
          report.push({ cod: "—", status: tx.statusSkippedNoCode });
          continue;
        }

        const matchFile = importPhotoFiles.find((f) => {
          const baseName = f.name.replace(/\.[^/.]+$/, "").trim();
          return baseName.toLowerCase() === cod.toLowerCase();
        });

        let imageUrl = "";
        if (matchFile) {
          imageUrl = await uploadImage(matchFile, "products");
        }
        const isPublished = Boolean(imageUrl);

        const productData = {
          cod,
          name_en: row.name_en || "",
          name_al: row.name_al || "",
          name_it: row.name_it || "",
          category_en: row.category_en || "",
          category_al: row.category_al || "",
          category_it: row.category_it || "",
          desc_en: row.desc_en || "",
          desc_al: row.desc_al || "",
          desc_it: row.desc_it || "",
          icon: row.icon || "",
          image_url: imageUrl,
          stock: row.stock || "in",
          published: isPublished,
        };

        const existing = findProductByCode(products, cod);
        if (existing) {
          await updateDoc(doc(db, "products", existing.id), productData);
          updated++;
        } else {
          await addDoc(collection(db, "products"), productData);
          created++;
        }

        if (isPublished) published++; else drafts++;
        report.push({ cod, status: matchFile ? tx.statusPhotoFound : tx.statusPhotoMissing });
      }

      await loadProducts();
      setImportReport(report);
      showToast(
        `Import: ${created} adăugate, ${updated} actualizate, ${skipped} sărite — ${published} publicate, ${drafts} draft.`,
        "success"
      );
      setShowPhotoImport(false);
      setImportExcelFile(null);
      setImportPhotoFiles([]);
    } catch (err) {
      console.error(err);
      showToast("Excel import failed.", "error");
    } finally {
      setImportingWithPhotos(false);
      setBusy(false);
    }
  }

  function showToast(message, type = "success") {
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    setToast({ message, type });
    toastTimerRef.current = setTimeout(() => setToast(null), 3200);
  }

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      if (!u) {
        router.push("/login");
        return;
      }
      try {
        const res = await fetch("/api/check-session");
        if (!res.ok) {
          await signOut(auth);
          router.push("/login");
          return;
        }
      } catch {
        await signOut(auth);
        router.push("/login");
        return;
      }
      setUser(u);
      setSessionChecked(true);
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    if (user && sessionChecked) {
      loadProducts();
      loadMessages();
      loadPartners();
      loadSiteSettings();
    }
  }, [user, sessionChecked]);

  async function loadProducts() {
    setLoading(true);
    const snap = await getDocs(collection(db, "products"));
    setProducts(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    setLoading(false);
  }

  async function handleSave() {
    setUploading(true);
    setBusy(true);
    try {
      let imageUrl = form.image_url;
      if (imageFile) imageUrl = await uploadImage(imageFile, "products");
      const finalData = { ...form, image_url: imageUrl, published: Boolean(imageUrl) };

      // Chiar și la salvarea manuală, dacă a fost introdus un cod care se potrivește
      // cu alt produs existent (diferit de cel editat acum), evităm crearea unui duplicat.
      const existingByCode = form.cod ? findProductByCode(products, form.cod) : null;
      const targetId = editProduct
        ? editProduct.id
        : (existingByCode ? existingByCode.id : null);

      if (targetId) {
        await updateDoc(doc(db, "products", targetId), finalData);
      } else {
        await addDoc(collection(db, "products"), finalData);
      }
      setShowForm(false);
      setEditProduct(null);
      setForm(emptyForm);
      setImageFile(null);
      loadProducts();
      showToast(tx.toastProductSaved, "success");
    } catch (err) {
      console.error(err);
      showToast(tx.toastError, "error");
    } finally {
      setUploading(false);
      setBusy(false);
    }
  }

  async function handleDelete(id) {
    if (!confirm(tx.confirmDelete)) return;
    setBusy(true);
    try {
      await deleteDoc(doc(db, "products", id));
      loadProducts();
      showToast(tx.toastProductDeleted, "success");
    } catch (err) {
      console.error(err);
      showToast(tx.toastError, "error");
    } finally {
      setBusy(false);
    }
  }

  function handleEdit(product) {
    setEditProduct(product);
    setForm({ ...emptyForm, ...product });
    setShowForm(true);
  }

  async function loadMessages() {
    setLoadingMessages(true);
    try {
      const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
      const snap = await getDocs(q);
      setMessages(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingMessages(false);
    }
  }

  async function markAsRead(id) {
    setBusy(true);
    try {
      await updateDoc(doc(db, "messages", id), { read: true });
      setMessages(prev => prev.map(m => m.id === id ? { ...m, read: true } : m));
      showToast(tx.toastMessageRead, "success");
    } catch (err) {
      console.error(err);
      showToast(tx.toastError, "error");
    } finally {
      setBusy(false);
    }
  }

  async function deleteMessage(id) {
    if (!confirm(tx.confirmDeleteMsg)) return;
    setBusy(true);
    try {
      await deleteDoc(doc(db, "messages", id));
      setMessages(prev => prev.filter(m => m.id !== id));
      showToast(tx.toastMessageDeleted, "success");
    } catch (err) {
      console.error(err);
      showToast(tx.toastError, "error");
    } finally {
      setBusy(false);
    }
  }

  async function loadPartners() {
    setLoadingPartners(true);
    const snap = await getDocs(collection(db, "partners"));
    setPartners(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    setLoadingPartners(false);
  }

  async function handleSavePartner() {
    setUploadingPartner(true);
    setBusy(true);
    try {
      let logoUrl = partnerForm.logo_url;
      if (partnerImageFile) logoUrl = await uploadImage(partnerImageFile, "partners");
      const finalData = { ...partnerForm, logo_url: logoUrl };
      if (editPartner) {
        await updateDoc(doc(db, "partners", editPartner.id), finalData);
      } else {
        await addDoc(collection(db, "partners"), finalData);
      }
      setShowPartnerForm(false);
      setEditPartner(null);
      setPartnerForm(emptyPartnerForm);
      setPartnerImageFile(null);
      loadPartners();
      showToast(tx.toastPartnerSaved, "success");
    } catch (err) {
      console.error(err);
      showToast(tx.toastError, "error");
    } finally {
      setUploadingPartner(false);
      setBusy(false);
    }
  }

  async function handleDeletePartner(id) {
    if (!confirm(tx.confirmDeletePartner)) return;
    setBusy(true);
    try {
      await deleteDoc(doc(db, "partners", id));
      loadPartners();
      showToast(tx.toastPartnerDeleted, "success");
    } catch (err) {
      console.error(err);
      showToast(tx.toastError, "error");
    } finally {
      setBusy(false);
    }
  }

  function handleEditPartner(partner) {
    setEditPartner(partner);
    setPartnerForm(partner);
    setShowPartnerForm(true);
  }

  // ── Site settings (logo) handlers ──
  async function loadSiteSettings() {
    try {
      const snap = await getDoc(doc(db, "settings", "site"));
      if (snap.exists()) {
        setSiteSettings({ ...DEFAULT_SITE_SETTINGS, ...snap.data() });
      }
    } catch (err) {
      console.error(err);
    }
  }

  async function handleSaveSettings() {
    setSavingSettings(true);
    setBusy(true);
    try {
      let logoImageUrl = siteSettings.logoImageUrl;
      if (logoImageFile) logoImageUrl = await uploadImage(logoImageFile, "logo");
      const finalData = { ...siteSettings, logoImageUrl };
      await setDoc(doc(db, "settings", "site"), finalData, { merge: true });
      setSiteSettings(finalData);
      setLogoImageFile(null);
      showToast(tx.toastSettingsSaved, "success");
    } catch (err) {
      console.error(err);
      showToast(tx.toastError, "error");
    } finally {
      setSavingSettings(false);
      setBusy(false);
    }
  }

  function formatDate(ts) {
    if (!ts) return "—";
    const d = ts.toDate ? ts.toDate() : new Date(ts);
    return d.toLocaleString("ro-RO");
  }

  async function handleLogout() {
    await fetch("/api/logout", { method: "POST" });
    await signOut(auth);
    router.push("/login");
  }

  const unreadCount = messages.filter(m => !m.read).length;
  const draftCount = products.filter(p => !p.published).length;

  const getName = p => lang === "al" ? p.name_al : lang === "it" ? p.name_it : p.name_en;
  const getCat = p => lang === "al" ? p.category_al : lang === "it" ? p.category_it : p.category_en;
  const getStock = s => s === "in" ? tx.inStock : s === "out" ? tx.outStock : tx.lowStock;

  const STATS_DATA = [
    { num: products.length, lbl: tx.totalProducts, Icon: IconPackage, tone: "navy" },
    { num: products.filter(p => p.stock === "in").length, lbl: tx.inStock, Icon: IconCheck, tone: "green" },
    { num: products.filter(p => p.stock === "out").length, lbl: tx.outStock, Icon: IconX, tone: "red" },
    { num: draftCount, lbl: tx.draft, Icon: IconAlert, tone: draftCount > 0 ? "amber" : "muted" },
    { num: unreadCount, lbl: tx.unread, Icon: IconMail, tone: unreadCount > 0 ? "red" : "muted" },
    { num: partners.length, lbl: tx.totalPartners, Icon: IconHandshake, tone: "navy" },
  ];

  if (!sessionChecked || loading) {
    return (
      <div className={styles.loading}>
        <span className={styles.loadingSpinner} />
        {tx.loading}
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>{tx.title}</h1>
        <div className={styles.headerRight}>
          <div className={styles.langSwitcher}>
            {["al", "en", "it"].map(l => (
              <button key={l} className={`${styles.langBtn} ${lang === l ? styles.langActive : ""}`} onClick={() => toggle(l)}>
                {l.toUpperCase()}
              </button>
            ))}
          </div>
          <a href="/" target="_blank" className={styles.visitBtn}><IconGlobe width={14} height={14} /><span>{tx.visit}</span></a>
          <span className={styles.userEmail}>{user?.email}</span>
          <button className={styles.logoutBtn} onClick={handleLogout}><IconLogOut width={14} height={14} /><span>{tx.logout}</span></button>
        </div>
      </div>

      <div className={styles.tabs}>
        <button className={`${styles.tab} ${activeTab === "products" ? styles.tabActive : ""}`} onClick={() => setActiveTab("products")}>
          <IconPackage /> {tx.products}
        </button>
        <button className={`${styles.tab} ${activeTab === "messages" ? styles.tabActive : ""}`} onClick={() => setActiveTab("messages")}>
          <IconMessages /> {tx.messages}
          {unreadCount > 0 && <span className={styles.badge_unread}>{unreadCount}</span>}
        </button>
        <button className={`${styles.tab} ${activeTab === "partners" ? styles.tabActive : ""}`} onClick={() => setActiveTab("partners")}>
          <IconHandshake /> {tx.partners}
        </button>
        <button className={`${styles.tab} ${activeTab === "settings" ? styles.tabActive : ""}`} onClick={() => setActiveTab("settings")}>
          <IconSettings /> {tx.settings}
        </button>
      </div>

      {activeTab === "products" && (
        <>
          <div className={styles.toolbar}>
            <h2 className={styles.subtitle}>{tx.products}</h2>
            <div className={styles.toolbarActions}>
              <input
                id="excelImport"
                type="file"
                accept=".xlsx,.xls"
                style={{ display: "none" }}
                onChange={handleImportExcelFile}
              />

              <button
                className={`${styles.excelBtn} ${styles.excelBtnBlue}`}
                onClick={() => document.getElementById("excelImport").click()}
                disabled={checkingUrls}
              >
                <IconDownload width={15} height={15} />
                {checkingUrls ? tx.checkingUrls : tx.importExcel}
              </button>

              <button className={`${styles.excelBtn} ${styles.excelBtnPurple}`} onClick={() => setShowPhotoImport(true)}>
                <IconImages width={15} height={15} />
                {tx.importWithPhotos}
              </button>

              <button className={`${styles.excelBtn} ${styles.excelBtnGreen}`} onClick={exportProductsExcel}>
                <IconUpload width={15} height={15} />
                {tx.exportExcel}
              </button>

              <button className={`${styles.excelBtn} ${styles.excelBtnTeal}`} onClick={() => downloadTemplate(true)}>
                <IconDownload width={15} height={15} />
                {tx.downloadTemplateUrl}
              </button>

              <button className={`${styles.excelBtn} ${styles.excelBtnAmber}`} onClick={() => downloadTemplate(false)}>
                <IconDownload width={15} height={15} />
                {tx.downloadTemplatePhoto}
              </button>

              <button
                className={styles.addBtn}
                onClick={() => { setShowForm(true); setEditProduct(null); setForm(emptyForm); }}
              >
                <IconPlus width={15} height={15} />
                {tx.addProduct}
              </button>
            </div>
          </div>

          <div className={styles.filtersBar}>
            <span className={styles.filterTitle}><IconFilter width={16} height={16} /></span>

            <div className={styles.filterSearchWrap}>
              <IconSearch width={15} height={15} className={styles.filterSearchIcon} />
              <input
                className={styles.filterInput}
                placeholder={tx.filterSearchPlaceholder}
                value={productSearch ?? ""}
                onChange={(e) => setProductSearch(e.target.value)}
              />
            </div>

            <select
              className={styles.filterSelect}
              value={stockFilter}
              onChange={(e) => setStockFilter(e.target.value)}
            >
              <option value="all">{tx.filterStockAll}</option>
              <option value="in">{tx.filterStockIn}</option>
              <option value="low">{tx.filterStockLow}</option>
              <option value="out">{tx.filterStockOut}</option>
            </select>

            <select
              className={styles.filterSelect}
              value={publishFilter}
              onChange={(e) => setPublishFilter(e.target.value)}
            >
              <option value="all">{tx.filterPublishAll}</option>
              <option value="published">{tx.filterPublishPublished}</option>
              <option value="draft">{tx.filterPublishDraft}</option>
            </select>

            <span className={styles.filterCount}>
              {tx.filterCount(filteredProducts.length, products.length)}
            </span>
          </div>

          {importPreview && (
            <div className={styles.formCard}>
              <h3>{tx.previewTitle} — {importPreview.fileName}</h3>

              <div className={styles.tableWrap}>


                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>{tx.previewCod}</th>
                      <th>{tx.previewName}</th>
                      <th>{tx.previewUrl}</th>
                      <th>{tx.previewStatus}</th>
                      <th>{tx.previewAction}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {importPreview.rows.map((item, idx) => (
                      <tr key={idx}>
                        <td>{item.cod || "—"}</td>
                        <td>{item.name}</td>
                        <td style={{ maxWidth: 220, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                          {item.url || "—"}
                        </td>
                        <td>{item.status}</td>
                        <td>
                          {item.action === "create" && tx.actionCreate}
                          {item.action === "update" && tx.actionUpdate}
                          {item.action === "skip" && tx.actionSkip}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className={styles.formActions}>
                <button className={styles.saveBtn} onClick={handleConfirmImportExcel} disabled={confirmingImport}>
                  {confirmingImport ? tx.importingLabel : <><IconCheck width={15} height={15} /> {tx.confirmImportBtn}</>}
                </button>
                <button className={styles.cancelBtn} onClick={() => setImportPreview(null)}>
                  <IconX width={15} height={15} /> {tx.closeBtn}
                </button>
              </div>
            </div>
          )}

          {showPhotoImport && (
            <div className={styles.formCard}>
              <h3>{tx.importPanelTitle}</h3>
              <p className={styles.importHint}>{tx.importSkuHint}</p>
              <div className={styles.formGrid}>
                <div className={styles.formGroup}>
                  <label>{tx.importExcelFileLbl}</label>
                  <input
                    type="file"
                    accept=".xlsx,.xls"
                    onChange={(e) => setImportExcelFile(e.target.files[0] || null)}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>{tx.importPhotosLbl}</label>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) => setImportPhotoFiles(Array.from(e.target.files || []))}
                  />
                  {importPhotoFiles.length > 0 && (
                    <span className={styles.fileCountHint}>{importPhotoFiles.length} foto selectate</span>
                  )}
                </div>
              </div>
              <div className={styles.formActions}>
                <button className={styles.saveBtn} onClick={handleImportWithPhotos} disabled={importingWithPhotos}>
                  {importingWithPhotos ? tx.importingLabel : <><IconCheck width={15} height={15} /> {tx.startImport}</>}
                </button>
                <button
                  className={styles.cancelBtn}
                  onClick={() => { setShowPhotoImport(false); setImportExcelFile(null); setImportPhotoFiles([]); }}
                >
                  <IconX width={15} height={15} /> {tx.cancel}
                </button>
              </div>
            </div>
          )}

          {importReport && (
            <div className={styles.formCard}>
              <h3>{tx.importReportTitle}</h3>
              <div className={styles.tableWrap}>
                <table className={styles.table}>
                  <thead>
                    <tr><th>{tx.previewCod}</th><th>{tx.previewStatus}</th></tr>
                  </thead>
                  <tbody>
                    {importReport.map((r, idx) => (
                      <tr key={idx}><td>{r.cod}</td><td>{r.status}</td></tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className={styles.formActions}>
                <button className={styles.cancelBtn} onClick={() => setImportReport(null)}>
                  <IconX width={15} height={15} /> {tx.closeBtn}
                </button>
              </div>
            </div>
          )}

          {showForm && (
            <div className={styles.formCard}>
              <h3>{editProduct ? tx.editProduct : tx.newProduct}</h3>
              <div className={styles.formGrid}>
                <div className={styles.formGroup}><label>{tx.codLabel}</label><input value={form.cod} onChange={e => setForm({ ...form, cod: e.target.value })} placeholder="PRD001" /></div>
                <div className={styles.formGroup}><label>{tx.nameEN}</label><input value={form.name_en} onChange={e => setForm({ ...form, name_en: e.target.value })} /></div>
                <div className={styles.formGroup}><label>{tx.nameAL}</label><input value={form.name_al} onChange={e => setForm({ ...form, name_al: e.target.value })} /></div>
                <div className={styles.formGroup}><label>{tx.nameIT}</label><input value={form.name_it} onChange={e => setForm({ ...form, name_it: e.target.value })} /></div>
                <div className={styles.formGroup}><label>{tx.catEN}</label><input value={form.category_en} onChange={e => setForm({ ...form, category_en: e.target.value })} /></div>
                <div className={styles.formGroup}><label>{tx.catAL}</label><input value={form.category_al} onChange={e => setForm({ ...form, category_al: e.target.value })} /></div>
                <div className={styles.formGroup}><label>{tx.catIT}</label><input value={form.category_it} onChange={e => setForm({ ...form, category_it: e.target.value })} /></div>
                <div className={styles.formGroup}><label>{tx.descEN}</label><textarea value={form.desc_en} onChange={e => setForm({ ...form, desc_en: e.target.value })} /></div>
                <div className={styles.formGroup}><label>{tx.descAL}</label><textarea value={form.desc_al} onChange={e => setForm({ ...form, desc_al: e.target.value })} /></div>
                <div className={styles.formGroup}><label>{tx.descIT}</label><textarea value={form.desc_it} onChange={e => setForm({ ...form, desc_it: e.target.value })} /></div>
                <div className={styles.formGroup}>
                  <label>{tx.stock}</label>
                  <select value={form.stock} onChange={e => setForm({ ...form, stock: e.target.value })}>
                    <option value="in">{tx.inStock}</option>
                    <option value="out">{tx.outStock}</option>
                    <option value="low">{tx.lowStock}</option>
                  </select>
                </div>
                <div className={styles.formGroup}><label>{tx.icon}</label><input value={form.icon} onChange={e => setForm({ ...form, icon: e.target.value })} /></div>
                <div className={styles.formGroup}><label>{tx.image}</label><input type="file" accept="image/*" onChange={e => setImageFile(e.target.files[0])} /></div>
              </div>
              <div className={styles.formActions}>
                <button className={styles.saveBtn} onClick={handleSave} disabled={uploading}>
                  {uploading ? tx.uploading : <><IconCheck width={15} height={15} /> {editProduct ? tx.save : tx.add}</>}
                </button>
                <button className={styles.cancelBtn} onClick={() => { setShowForm(false); setEditProduct(null); }}>
                  <IconX width={15} height={15} /> {tx.cancel}
                </button>
              </div>
            </div>
          )}

          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr><th>{tx.photo}</th><th>{tx.codLabel}</th><th>{tx.name}</th><th>{tx.category}</th><th>{tx.stock}</th><th>{tx.actions}</th></tr>
              </thead>
              <tbody>
                {filteredProducts.length === 0 ? (
                  <tr><td colSpan={6} className={styles.emptyCell}>{tx.noProductsMatchFilter}</td></tr>
                ) : filteredProducts.map(p => (
                  <tr key={p.id}>
                    <td className={styles.iconCell}>
                      {p.image_url
                        ? <img src={p.image_url} alt={p.name_en} className={styles.productThumb} />
                        : <span className={styles.thumbPlaceholderWarning} title="Fără poză — produs Draft"><IconAlert width={18} height={18} /></span>}
                    </td>
                    <td>{p.cod || "—"}</td>
                    <td className={styles.productName}>
                      {getName(p)}
                      {!p.published && <span className={styles.draftBadge}>{tx.draft}</span>}
                    </td>
                    <td className={styles.productCat}>{getCat(p)}</td>
                    <td><span className={`${styles.badge} ${styles[`badge_${p.stock}`]}`}>{getStock(p.stock)}</span></td>
                    <td>
                      <div className={styles.actions}>
                        <button className={styles.editBtn} onClick={() => handleEdit(p)} title={tx.edit}><IconEdit /><span className={styles.btnText}>{tx.edit}</span></button>
                        <button className={styles.deleteBtn} onClick={() => handleDelete(p.id)} title={tx.delete}><IconTrash /><span className={styles.btnText}>{tx.delete}</span></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {activeTab === "messages" && (
        <div className={styles.messagesSection}>
          <div className={styles.toolbar}>
            <h2 className={styles.subtitle}>
              {tx.incomingMessages}
              {unreadCount > 0 && <span className={styles.unreadHint}>({unreadCount} {tx.unreadLabel})</span>}
            </h2>
            <button className={styles.addBtn} onClick={loadMessages}><IconRefresh width={15} height={15} /> {tx.refresh}</button>
          </div>


          {loadingMessages ? (
            <div className={styles.loading}><span className={styles.loadingSpinner} />{tx.loadingMessages}</div>
          ) : messages.length === 0 ? (
            <div className={styles.emptyMessages}>
              <IconMailOpen width={40} height={40} />
              <p>{tx.noMessages}</p>
            </div>
          ) : (
            <div className={styles.messagesList}>
              {messages.map((msg, idx) => (
                <div key={msg.id} className={styles.messageRow}>
                  <span className={styles.timelineDot} />
                  <span className={styles.timelineArrow}>
                    <svg width="30" height="16" viewBox="0 0 56 14" fill="none">
                      <path d="M2 0V5Q2 7 8 7H44" stroke="currentColor" strokeWidth="4.2" strokeLinecap="round" />
                      <polygon points="44,1.5 56,7 44,12.5" fill="currentColor" />
                    </svg>
                  </span>
                  <div
                    className={`${styles.messageCard} ${idx % 2 === 0 ? styles.messageCardOdd : styles.messageCardEven} ${!msg.read ? styles.messageCardUnread : ""}`}
                  >
                    <div className={styles.messageHeader}>
                      <div className={styles.messageSender}>
                        <span className={styles.messageIcon}>{msg.read ? <IconMailOpen /> : <IconMail />}</span>
                        <div>
                          <strong className={styles.messageName}>{msg.name}</strong>
                          {!msg.read && <span className={styles.newBadge}>New</span>}
                          <div className={styles.messageMeta}>
                            <a href={`mailto:${msg.email}`} className={styles.messageEmail}>{msg.email}</a>
                            {msg.phone && (<><span className={styles.metaSep}>•</span><a href={`tel:${msg.phone}`} className={styles.messagePhone}>{msg.phone}</a></>)}
                            <span className={styles.metaSep}>•</span>
                            <span className={styles.messageDate}>{formatDate(msg.createdAt)}</span>
                          </div>
                        </div>
                      </div>
                      <div className={styles.messageActions}>
                        {!msg.read && (
                          <button className={styles.markReadBtn} onClick={() => markAsRead(msg.id)}>
                            <IconMailOpen width={14} height={14} /><span>{tx.markRead}</span>
                          </button>
                        )}
                        <button className={styles.deleteBtn} onClick={() => deleteMessage(msg.id)}>
                          <IconTrash /><span className={styles.btnText}>{tx.delete}</span>
                        </button>
                      </div>
                    </div>
                    <p className={styles.messageBody}>{msg.message}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === "partners" && (
        <>
          <div className={styles.toolbar}>
            <h2 className={styles.subtitle}>{tx.partners}</h2>
            <button className={styles.addBtn} onClick={() => { setShowPartnerForm(true); setEditPartner(null); setPartnerForm(emptyPartnerForm); }}>
              <IconPlus width={15} height={15} /> {tx.addPartner}
            </button>
          </div>

          {showPartnerForm && (
            <div className={styles.formCard}>
              <h3>{editPartner ? tx.editPartner : tx.newPartner}</h3>
              <div className={styles.formGrid}>
                <div className={styles.formGroup}>
                  <label>{tx.partnerName}</label>
                  <input value={partnerForm.name} onChange={e => setPartnerForm({ ...partnerForm, name: e.target.value })} placeholder="Ex: Siemens Healthineers" />
                </div>
                <div className={styles.formGroup}>
                  <label>{tx.partnerWebsite}</label>
                  <input value={partnerForm.website} onChange={e => setPartnerForm({ ...partnerForm, website: e.target.value })} placeholder="https://..." />
                </div>
                <div className={styles.formGroup}>
                  <label>{tx.partnerLogo}</label>
                  <input type="file" accept="image/*" onChange={e => setPartnerImageFile(e.target.files[0])} />
                </div>
              </div>
              <div className={styles.formActions}>
                <button className={styles.saveBtn} onClick={handleSavePartner} disabled={uploadingPartner}>
                  {uploadingPartner ? tx.uploading : <><IconCheck width={15} height={15} /> {editPartner ? tx.save : tx.addPartner}</>}
                </button>
                <button className={styles.cancelBtn} onClick={() => { setShowPartnerForm(false); setEditPartner(null); }}>
                  <IconX width={15} height={15} /> {tx.cancel}
                </button>
              </div>
            </div>
          )}

          {loadingPartners ? (
            <div className={styles.loading}><span className={styles.loadingSpinner} />{tx.loading}</div>
          ) : (
            <div className={styles.tableWrap}>
              <table className={styles.table}>
                <thead>
                  <tr><th>{tx.photo}</th><th>{tx.partnerName}</th><th>{tx.partnerWebsite}</th><th>{tx.actions}</th></tr>
                </thead>
                <tbody>
                  {partners.length === 0 ? (
                    <tr><td colSpan={4} className={styles.emptyCell}>{tx.noMessages}</td></tr>
                  ) : partners.map(p => (
                    <tr key={p.id}>
                      <td className={styles.iconCell}>
                        {p.logo_url ? <img src={p.logo_url} alt={p.name} className={styles.productThumb} /> : <span className={styles.thumbPlaceholder}><IconBuilding width={18} height={18} /></span>}
                      </td>
                      <td className={styles.productName}>{p.name}</td>
                      <td>
                        {p.website ? <a href={p.website} target="_blank" rel="noreferrer" className={styles.websiteLink}>{p.website}</a> : "—"}
                      </td>
                      <td>
                        <div className={styles.actions}>
                          <button className={styles.editBtn} onClick={() => handleEditPartner(p)}><IconEdit /><span className={styles.btnText}>{tx.edit}</span></button>
                          <button className={styles.deleteBtn} onClick={() => handleDeletePartner(p.id)}><IconTrash /><span className={styles.btnText}>{tx.delete}</span></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}

      {activeTab === "settings" && (
        <>
          <div className={styles.toolbar}>
            <h2 className={styles.subtitle}>{tx.settings}</h2>
          </div>

          <div className={styles.formCard}>
            <h3>{tx.siteLogo}</h3>

            <div className={styles.formGroup} style={{ marginBottom: "16px" }}>
              <label>{tx.logoTypeLabel}</label>
              <select
                value={siteSettings.logoType}
                onChange={e => setSiteSettings({ ...siteSettings, logoType: e.target.value })}
              >
                <option value="text">{tx.logoTypeText}</option>
                <option value="image">{tx.logoTypeImage}</option>
              </select>
            </div>

            {siteSettings.logoType === "text" ? (
              <div className={styles.formGrid}>
                <div className={styles.formGroup}>
                  <label>{tx.logoMarkLabel}</label>
                  <input
                    value={siteSettings.logoMark}
                    onChange={e => setSiteSettings({ ...siteSettings, logoMark: e.target.value })}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>{tx.logoTextLabel}</label>
                  <input
                    value={siteSettings.logoText}
                    onChange={e => setSiteSettings({ ...siteSettings, logoText: e.target.value })}
                  />
                </div>
              </div>
            ) : (
              <div className={styles.formGroup}>
                <label>{tx.logoImageLabel}</label>
                {siteSettings.logoImageUrl && (
                  <div className={styles.currentLogoPreview}>
                    <div className={styles.currentLogoLabel}>{tx.currentLogo}:</div>
                    <img src={siteSettings.logoImageUrl} alt="Logo curent" />
                  </div>
                )}
                <input type="file" accept="image/*" onChange={e => setLogoImageFile(e.target.files[0])} />
              </div>
            )}

            <div className={styles.formActions}>
              <button className={styles.saveBtn} onClick={handleSaveSettings} disabled={savingSettings}>
                {savingSettings ? tx.uploading : <><IconCheck width={15} height={15} /> {tx.saveSettings}</>}
              </button>
            </div>
          </div>
        </>
      )}

      <div className={styles.stats}>
        {STATS_DATA.map((s, i) => (
          <div className={styles.statCard} key={i}>
            <div className={`${styles.statIcon} ${styles[`tone_${s.tone}`]}`}>
              <s.Icon width={19} height={19} />
            </div>
            <div>
              <div className={`${styles.statNum} ${styles[`toneText_${s.tone}`]}`}>{s.num}</div>
              <div className={styles.statLbl}>{s.lbl}</div>
            </div>
          </div>
        ))}
      </div>

      {busy && (
        <div className={styles.overlay}>
          <div className={styles.modalCard}>
            <span className={styles.spinner} />
            <span className={styles.modalLabel}>{tx.savingLabel}</span>
          </div>
        </div>
      )}

      {toast && !busy && (
        <div className={styles.overlay} onClick={() => setToast(null)}>
          <div
            className={`${styles.toastCard} ${toast.type === "error" ? styles.toastError : ""}`}
            onClick={(e) => e.stopPropagation()}
          >
            <span className={styles.toastIcon}>
              {toast.type === "success" ? <IconCheck width={22} height={22} /> : <IconAlert width={22} height={22} />}
            </span>
            <span className={styles.toastMessage}>{toast.message}</span>
            <button className={styles.toastClose} onClick={() => setToast(null)}>
              <IconX width={13} height={13} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}