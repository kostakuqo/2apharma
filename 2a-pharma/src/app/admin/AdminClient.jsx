"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth, db } from "../../lib/firebase.js";
import { onAuthStateChanged, signOut } from "firebase/auth";
import {
  collection, getDocs, addDoc, deleteDoc,
  doc, updateDoc, orderBy, query
} from "firebase/firestore";
import { useLang } from "../../context/LangContext.jsx";
import styles from "./page.module.css";

const IconTrash = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14H6L5 6" /><path d="M10 11v6M14 11v6" /><path d="M9 6V4h6v2" /></svg>;
const IconCog = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" /></svg>;
const IconEnvelope = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>;
const IconEnvelopeOpen = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 13V6a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 2 6v12a2 2 0 0 0 2 2h7" /><path d="M22 13l-10-6L2 13" /><path d="M16 19h6m-3-3v6" /></svg>;

const adminTx = {
  al: {
    title: "Paneli Admin — 2A Pharma", logout: "Dil", products: "Produkte", messages: "Mesazhe", partners: "Partnerë",
    totalProducts: "Produkte gjithsej", inStock: "Në stok", outStock: "Pa stok", lowStock: "Stok i ulët",
    unread: "Mesazhe të palexuara", totalPartners: "Partnerë gjithsej",
    addProduct: "+ Shto produkt", editProduct: "Ndrysho produktin", newProduct: "Produkt i ri",
    save: "Ruaj ndryshimet", add: "Shto produkt", cancel: "Anulo", delete: "Fshi", edit: "Modifiko", refresh: "↻ Rifresko",
    loading: "Duke u ngarkuar...", loadingMessages: "Duke u ngarkuar mesazhet...",
    noMessages: "Nuk ka mesazhe të reja.", markRead: "Sheno si te lexuar",
    incomingMessages: "Mesazhe te ardhura", unreadLabel: "te palexuara",
    confirmDelete: "A je i sigurt që do ta fshish produktin?",
    confirmDeleteMsg: "A je i sigurt që do ta fshish këtë mesazh?",
    confirmDeletePartner: "A je i sigurt që do ta fshish këtë partner?",
    nameEN: "Emri EN", nameAL: "Emri AL", nameIT: "Emri IT",
    catEN: "Kategoria EN", catAL: "Kategoria AL", catIT: "Kategoria IT",
    descEN: "Përshkrimi EN", descAL: "Përshkrimi AL", descIT: "Përshkrimi IT",
    stock: "Stoku", icon: "Ikona (emoji)", image: "Imagine", uploading: "⏳ Duke ngarkuar...",
    photo: "Foto", name: "Emri", category: "Kategoria", actions: "Veprimet",
    addPartner: "+ Shto partner", newPartner: "Partner i ri", editPartner: "Ndrysho partnerin",
    partnerName: "Emri i partnerit", partnerLogo: "Logo (ngarko foto)", partnerWebsite: "Faqja web",
  },
  en: {
    title: "Admin Panel — 2A Pharma", logout: "Logout", products: "Products", messages: "Messages", partners: "Partners",
    totalProducts: "Total products", inStock: "In stock", outStock: "Out of stock", lowStock: "Low stock",
    unread: "Unread messages", totalPartners: "Total partners",
    addProduct: "+ Add product", editProduct: "Edit product", newProduct: "New product",
    save: "Save changes", add: "Add product", cancel: "Cancel", delete: "Delete", edit: "Edit", refresh: "↻ Refresh",
    loading: "Loading...", loadingMessages: "Loading messages...",
    noMessages: "No new messages.", markRead: "Mark as read",
    incomingMessages: "Incoming messages", unreadLabel: "unread",
    confirmDelete: "Are you sure you want to delete this product?",
    confirmDeleteMsg: "Are you sure you want to delete this message?",
    confirmDeletePartner: "Are you sure you want to delete this partner?",
    nameEN: "Name EN", nameAL: "Name AL", nameIT: "Name IT",
    catEN: "Category EN", catAL: "Category AL", catIT: "Category IT",
    descEN: "Description EN", descAL: "Description AL", descIT: "Description IT",
    stock: "Stock", icon: "Icon (emoji)", image: "Image", uploading: "⏳ Uploading...",
    photo: "Photo", name: "Name", category: "Category", actions: "Actions",
    addPartner: "+ Add partner", newPartner: "New partner", editPartner: "Edit partner",
    partnerName: "Partner name", partnerLogo: "Logo (upload photo)", partnerWebsite: "Website",
  },
  it: {
    title: "Pannello Admin — 2A Pharma", logout: "Esci", products: "Prodotti", messages: "Messaggi", partners: "Partner",
    totalProducts: "Prodotti totali", inStock: "Disponibile", outStock: "Non disponibile", lowStock: "Scorte basse",
    unread: "Messaggi non letti", totalPartners: "Partner totali",
    addProduct: "+ Aggiungi prodotto", editProduct: "Modifica prodotto", newProduct: "Nuovo prodotto",
    save: "Salva modifiche", add: "Aggiungi prodotto", cancel: "Annulla", delete: "Elimina", edit: "Modifica", refresh: "↻ Aggiorna",
    loading: "Caricamento...", loadingMessages: "Caricamento messaggi...",
    noMessages: "Nessun nuovo messaggio.", markRead: "Segna come letto",
    incomingMessages: "Messaggi in arrivo", unreadLabel: "non letti",
    confirmDelete: "Sei sicuro di voler eliminare questo prodotto?",
    confirmDeleteMsg: "Sei sicuro di voler eliminare questo messaggio?",
    confirmDeletePartner: "Sei sicuro di voler eliminare questo partner?",
    nameEN: "Nome EN", nameAL: "Nome AL", nameIT: "Nome IT",
    catEN: "Categoria EN", catAL: "Categoria AL", catIT: "Categoria IT",
    descEN: "Descrizione EN", descAL: "Descrizione AL", descIT: "Descrizione IT",
    stock: "Scorte", icon: "Icona (emoji)", image: "Immagine", uploading: "⏳ Caricamento...",
    photo: "Foto", name: "Nome", category: "Categoria", actions: "Azioni",
    addPartner: "+ Aggiungi partner", newPartner: "Nuovo partner", editPartner: "Modifica partner",
    partnerName: "Nome partner", partnerLogo: "Logo (carica foto)", partnerWebsite: "Sito web",
  },
};

async function uploadImage(file) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "2a-pharma-upload");
  const res = await fetch("https://api.cloudinary.com/v1_1/diwmjt7aa/image/upload", { method: "POST", body: formData });
  const data = await res.json();
  return data.secure_url;
}

export default function AdminClient() {
  const { lang, toggle } = useLang();
  const router = useRouter();
  const tx = adminTx[lang];

  const [imageFile, setImageFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState("products");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editProduct, setEditProduct] = useState(null);

  const emptyForm = {
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

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, u => {
      if (u) setUser(u);
      else router.push("/login");
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    if (user) { loadProducts(); loadMessages(); loadPartners(); }
  }, [user]);

  async function loadProducts() {
    setLoading(true);
    const snap = await getDocs(collection(db, "products"));
    setProducts(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    setLoading(false);
  }

  async function handleSave() {
    setUploading(true);
    let imageUrl = form.image_url;
    if (imageFile) imageUrl = await uploadImage(imageFile);
    const finalData = { ...form, image_url: imageUrl };
    if (editProduct) {
      await updateDoc(doc(db, "products", editProduct.id), finalData);
    } else {
      await addDoc(collection(db, "products"), finalData);
    }
    setUploading(false);
    setShowForm(false);
    setEditProduct(null);
    setForm(emptyForm);
    setImageFile(null);
    loadProducts();
  }

  async function handleDelete(id) {
    if (!confirm(tx.confirmDelete)) return;
    await deleteDoc(doc(db, "products", id));
    loadProducts();
  }

  function handleEdit(product) {
    setEditProduct(product);
    setForm(product);
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
    await updateDoc(doc(db, "messages", id), { read: true });
    setMessages(prev => prev.map(m => m.id === id ? { ...m, read: true } : m));
  }

  async function deleteMessage(id) {
    if (!confirm(tx.confirmDeleteMsg)) return;
    await deleteDoc(doc(db, "messages", id));
    setMessages(prev => prev.filter(m => m.id !== id));
  }

  async function loadPartners() {
    setLoadingPartners(true);
    const snap = await getDocs(collection(db, "partners"));
    setPartners(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    setLoadingPartners(false);
  }

  async function handleSavePartner() {
    setUploadingPartner(true);
    let logoUrl = partnerForm.logo_url;
    if (partnerImageFile) logoUrl = await uploadImage(partnerImageFile);
    const finalData = { ...partnerForm, logo_url: logoUrl };
    if (editPartner) {
      await updateDoc(doc(db, "partners", editPartner.id), finalData);
    } else {
      await addDoc(collection(db, "partners"), finalData);
    }
    setUploadingPartner(false);
    setShowPartnerForm(false);
    setEditPartner(null);
    setPartnerForm(emptyPartnerForm);
    setPartnerImageFile(null);
    loadPartners();
  }

  async function handleDeletePartner(id) {
    if (!confirm(tx.confirmDeletePartner)) return;
    await deleteDoc(doc(db, "partners", id));
    loadPartners();
  }

  function handleEditPartner(partner) {
    setEditPartner(partner);
    setPartnerForm(partner);
    setShowPartnerForm(true);
  }

  function formatDate(ts) {
    if (!ts) return "—";
    const d = ts.toDate ? ts.toDate() : new Date(ts);
    return d.toLocaleString("ro-RO");
  }

  async function handleLogout() {
    await signOut(auth);
    router.push("/login");
  }

  const unreadCount = messages.filter(m => !m.read).length;
  const getName = p => lang === "al" ? p.name_al : lang === "it" ? p.name_it : p.name_en;
  const getCat = p => lang === "al" ? p.category_al : lang === "it" ? p.category_it : p.category_en;
  const getStock = s => s === "in" ? tx.inStock : s === "out" ? tx.outStock : tx.lowStock;

  const STATS_DATA = [
    { num: products.length, lbl: tx.totalProducts, icon: "📦", color: "#0F2A52", bg: "#E8EDF5" },
    { num: products.filter(p => p.stock === "in").length, lbl: tx.inStock, icon: "✅", color: "#1A8A3C", bg: "#EDFBF3" },
    { num: products.filter(p => p.stock === "out").length, lbl: tx.outStock, icon: "❌", color: "#C53030", bg: "#FFF0F0" },
    { num: products.filter(p => p.stock === "low").length, lbl: tx.lowStock, icon: "⚠️", color: "#B7791F", bg: "#FFFBEA" },
    { num: unreadCount, lbl: tx.unread, icon: "💬", color: unreadCount > 0 ? "#ef4444" : "#6b7280", bg: unreadCount > 0 ? "#FFF0F0" : "#F4F6FA" },
    { num: partners.length, lbl: tx.totalPartners, icon: "🤝", color: "#0F2A52", bg: "#E8EDF5" },
  ];

  if (loading) return <div className={styles.loading}>{tx.loading}</div>;

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
          <a href="/" target="_blank" className={styles.visitBtn}>
            🌐 Visit site
          </a>
          <span className={styles.userEmail}>{user?.email}</span>
          <button className={styles.logoutBtn} onClick={handleLogout}>{tx.logout}</button>
        </div>
      </div>

      <div className={styles.tabs}>
        <button className={`${styles.tab} ${activeTab === "products" ? styles.tabActive : ""}`} onClick={() => setActiveTab("products")}>
          📦 {tx.products}
        </button>
        <button className={`${styles.tab} ${activeTab === "messages" ? styles.tabActive : ""}`} onClick={() => setActiveTab("messages")}>
          💬 {tx.messages}
          {unreadCount > 0 && <span className={styles.badge_unread}>{unreadCount}</span>}
        </button>
        <button className={`${styles.tab} ${activeTab === "partners" ? styles.tabActive : ""}`} onClick={() => setActiveTab("partners")}>
          🤝 {tx.partners}
        </button>
      </div>

      {activeTab === "products" && (
        <>
          <div className={styles.toolbar}>
            <h2 className={styles.subtitle}>{tx.products}</h2>
            <button className={styles.addBtn} onClick={() => { setShowForm(true); setEditProduct(null); setForm(emptyForm); }}>
              {tx.addProduct}
            </button>
          </div>

          {showForm && (
            <div className={styles.formCard}>
              <h3>{editProduct ? tx.editProduct : tx.newProduct}</h3>
              <div className={styles.formGrid}>
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
                  {uploading ? tx.uploading : `✅ ${editProduct ? tx.save : tx.add}`}
                </button>
                <button className={styles.cancelBtn} onClick={() => { setShowForm(false); setEditProduct(null); }}>
                  ✖️ {tx.cancel}
                </button>
              </div>
            </div>
          )}

          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>{tx.photo}</th><th>{tx.name}</th><th>{tx.category}</th><th>{tx.stock}</th><th>{tx.actions}</th>
                </tr>
              </thead>
              <tbody>
                {products.map(p => (
                  <tr key={p.id}>
                    <td className={styles.iconCell}>
                      {p.image_url
                        ? <img src={p.image_url} alt={p.name_en} className={styles.productThumb} />
                        : <span style={{ fontSize: "1.5rem" }}>{p.icon}</span>
                      }
                    </td>
                    <td className={styles.productName}>{getName(p)}</td>
                    <td className={styles.productCat}>{getCat(p)}</td>
                    <td><span className={`${styles.badge} ${styles[`badge_${p.stock}`]}`}>{getStock(p.stock)}</span></td>
                    <td>
                      <div className={styles.actions}>
                        <button className={styles.editBtn} onClick={() => handleEdit(p)} title={tx.edit}>
                          <IconCog /><span className={styles.btnText}>{tx.edit}</span>
                        </button>
                        <button className={styles.deleteBtn} onClick={() => handleDelete(p.id)} title={tx.delete}>
                          <IconTrash /><span className={styles.btnText}>{tx.delete}</span>
                        </button>
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
              {unreadCount > 0 && (
                <span style={{ marginLeft: "10px", fontSize: "14px", color: "#ef4444", fontWeight: 400 }}>
                  ({unreadCount} {tx.unreadLabel})
                </span>
              )}
            </h2>
            <button className={styles.addBtn} onClick={loadMessages}>{tx.refresh}</button>
          </div>

          {loadingMessages ? (
            <div className={styles.loading}>{tx.loadingMessages}</div>
          ) : messages.length === 0 ? (
            <div className={styles.emptyMessages}>
              <IconEnvelopeOpen style={{ fontSize: "2rem", opacity: 0.3 }} />
              <p>{tx.noMessages}</p>
            </div>
          ) : (
            <div className={styles.messagesList}>
              {messages.map(msg => (
                <div key={msg.id} className={`${styles.messageCard} ${!msg.read ? styles.messageCardUnread : ""}`}>
                  <div className={styles.messageHeader}>
                    <div className={styles.messageSender}>
                      {msg.read ? <IconEnvelopeOpen /> : <IconEnvelope />}
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
                          <IconEnvelopeOpen /><span>{tx.markRead}</span>
                        </button>
                      )}
                      <button className={styles.deleteBtn} onClick={() => deleteMessage(msg.id)}>
                        <IconTrash /><span className={styles.btnText}>{tx.delete}</span>
                      </button>
                    </div>
                  </div>
                  <p className={styles.messageBody}>{msg.message}</p>
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
              {tx.addPartner}
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
                  {uploadingPartner ? tx.uploading : `✅ ${editPartner ? tx.save : tx.addPartner}`}
                </button>
                <button className={styles.cancelBtn} onClick={() => { setShowPartnerForm(false); setEditPartner(null); }}>
                  ✖️ {tx.cancel}
                </button>
              </div>
            </div>
          )}

          {loadingPartners ? (
            <div className={styles.loading}>{tx.loading}</div>
          ) : (
            <div className={styles.tableWrap}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>{tx.photo}</th><th>{tx.partnerName}</th><th>{tx.partnerWebsite}</th><th>{tx.actions}</th>
                  </tr>
                </thead>
                <tbody>
                  {partners.length === 0 ? (
                    <tr><td colSpan={4} style={{ textAlign: "center", padding: "40px", color: "#9ca3af" }}>{tx.noMessages}</td></tr>
                  ) : partners.map(p => (
                    <tr key={p.id}>
                      <td className={styles.iconCell}>
                        {p.logo_url
                          ? <img src={p.logo_url} alt={p.name} className={styles.productThumb} />
                          : <span style={{ opacity: 0.3, fontSize: "1.5rem" }}>🏢</span>
                        }
                      </td>
                      <td className={styles.productName}>{p.name}</td>
                      <td>
                        {p.website
                          ? <a href={p.website} target="_blank" rel="noreferrer" style={{ color: "var(--green)" }}>{p.website}</a>
                          : "—"
                        }
                      </td>
                      <td>
                        <div className={styles.actions}>
                          <button className={styles.editBtn} onClick={() => handleEditPartner(p)}>
                            <IconCog /><span className={styles.btnText}>{tx.edit}</span>
                          </button>
                          <button className={styles.deleteBtn} onClick={() => handleDeletePartner(p.id)}>
                            <IconTrash /><span className={styles.btnText}>{tx.delete}</span>
                          </button>
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

      <div className={styles.stats}>
        {STATS_DATA.map((s, i) => (
          <div className={styles.statCard} key={i}>
            <div className={styles.statIcon} style={{ background: s.bg }}>
              <span style={{ fontSize: "18px" }}>{s.icon}</span>
            </div>
            <div>
              <div className={styles.statNum} style={{ color: s.color }}>{s.num}</div>
              <div className={styles.statLbl}>{s.lbl}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}