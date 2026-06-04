"use client";

import { createContext, useContext, useState } from "react";

export const translations = {
  al: {
    nav: {
      home: "Kryefaqja", about: "Rreth nesh",
      products: "Produktet", partners: "Partnerët", contact: "Kontakt"
    },
    hero: {
      badge: "Pajisje Mjekësore të Certifikuara",
      title1: "Pajisje Mjekësore",
      title2: "Cilësore",
      title3: "për Shqipërinë",
      sub: "Furnizuesi juaj i besueshëm i pajisjeve mjekësore profesionale. Produkte të certifikuara për klinika, spitale dhe farmaci.",
      btnProducts: "Shiko Produktet",
      btnContact: "Na Kontaktoni",
    },
    products: {
      label: "Produktet Tona",
      title: "Pajisje Mjekësore",
      sub: "Zgjidhje profesionale për çdo nevojë mjekësore.",
      viewAll: "Shiko të gjitha",
      details: "Detaje",
    },
    features: {
      label: "Pse Ne",
      title: "Avantazhet Tona",
      items: [
        { title: "Produkte të Certifikuara", desc: "Të gjitha pajisjet kanë certifikata ndërkombëtare të cilësisë dhe sigurisë." },
        { title: "Dërgim i Shpejtë", desc: "Dërgojmë në të gjithë Shqipërinë brenda 24-48 orësh." },
        { title: "Mbështetje 24/7", desc: "Ekipi ynë është gjithmonë i disponueshëm për ju." },
        { title: "Garanci & Servis", desc: "Ofrojmë garanci dhe shërbim pas shitjes për të gjitha produktet." },
      ],
    },
    partners: { label: "Partnerët", title: "ORGANIZATA KRYESORE SHËNDETËSORE NA BESOJNË" },
    stock: { in: "Në stok", out: "Pa stok", low: "Stok i ulët" },
    contact: {
      label: "Kontakt", title: "Na Kontaktoni",
      sub: "Jemi këtu për t'ju ndihmuar.",
      name: "Emri", email: "Email", phone: "Telefon",
      message: "Mesazhi", send: "Dërgo Mesazhin", sending: "Duke dërguar...",
      success: "Mesazhi u dërgua me sukses!", error: "Ndodhi një gabim. Provoni përsëri.",
    },
    about: {
      label: "Rreth Nesh", title: "Kush Jemi Ne",
      sub: "Kompani lider në furnizimin e pajisjeve mjekësore profesionale në Shqipëri.",
    },
  },
  en: {
    nav: {
      home: "Home", about: "About",
      products: "Products", partners: "Partners", contact: "Contact"
    },
    hero: {
      badge: "Certified Medical Equipment",
      title1: "Quality Medical",
      title2: "Equipment",
      title3: "for Albania",
      sub: "Your trusted supplier of professional medical equipment. Certified products for clinics, hospitals and pharmacies.",
      btnProducts: "View Products",
      btnContact: "Contact Us",
    },
    products: {
      label: "Our Products",
      title: "Medical Equipment",
      sub: "Professional solutions for every medical need.",
      viewAll: "View all",
      details: "Details",
    },
    features: {
      label: "Why Us",
      title: "Our Advantages",
      items: [
        { title: "Certified Products", desc: "All devices have international quality and safety certificates." },
        { title: "Fast Delivery", desc: "We deliver across Albania within 24-48 hours." },
        { title: "24/7 Support", desc: "Our team is always available for you." },
        { title: "Warranty & Service", desc: "We offer warranty and after-sales service for all products." },
      ],
    },
    partners: { label: "Partners", title: "LEADING HEALTHCARE ORGANIZATIONS TRUST US" },
    stock: { in: "In stock", out: "Out of stock", low: "Low stock" },
    contact: {
      label: "Contact", title: "Contact Us",
      sub: "We are here to help you.",
      name: "Name", email: "Email", phone: "Phone",
      message: "Message", send: "Send Message", sending: "Sending...",
      success: "Message sent successfully!", error: "An error occurred. Please try again.",
    },
    about: {
      label: "About Us", title: "Who We Are",
      sub: "Leading company in supplying professional medical equipment in Albania.",
    },
  },
  it: {
    nav: {
      home: "Home", about: "Chi siamo",
      products: "Prodotti", partners: "Partner", contact: "Contatto"
    },
    hero: {
      badge: "Apparecchiature Mediche Certificate",
      title1: "Apparecchiature",
      title2: "Mediche di Qualità",
      title3: "per l'Albania",
      sub: "Il tuo fornitore affidabile di apparecchiature mediche professionali. Prodotti certificati per cliniche, ospedali e farmacie.",
      btnProducts: "Vedi Prodotti",
      btnContact: "Contattaci",
    },
    products: {
      label: "I Nostri Prodotti",
      title: "Apparecchiature Mediche",
      sub: "Soluzioni professionali per ogni esigenza medica.",
      viewAll: "Vedi tutti",
      details: "Dettagli",
    },
    features: {
      label: "Perché Noi",
      title: "I Nostri Vantaggi",
      items: [
        { title: "Prodotti Certificati", desc: "Tutti i dispositivi hanno certificati internazionali di qualità e sicurezza." },
        { title: "Consegna Rapida", desc: "Consegniamo in tutta l'Albania entro 24-48 ore." },
        { title: "Supporto 24/7", desc: "Il nostro team è sempre disponibile per voi." },
        { title: "Garanzia e Servizio", desc: "Offriamo garanzia e assistenza post-vendita per tutti i prodotti." },
      ],
    },
    partners: { label: "Partner", title: "LE PRINCIPALI ORGANIZZAZIONI SANITARIE SI FIDANO DI NOI" },
    stock: { in: "Disponibile", out: "Non disponibile", low: "Scorte basse" },
    contact: {
      label: "Contatto", title: "Contattaci",
      sub: "Siamo qui per aiutarti.",
      name: "Nome", email: "Email", phone: "Telefono",
      message: "Messaggio", send: "Invia Messaggio", sending: "Invio...",
      success: "Messaggio inviato con successo!", error: "Si è verificato un errore. Riprova.",
    },
    about: {
      label: "Chi Siamo", title: "Chi Siamo",
      sub: "Azienda leader nella fornitura di apparecchiature mediche professionali in Albania.",
    },
  },
};

const LangContext = createContext(null);

export function LangProvider({ children }) {
  const [lang, setLang] = useState("al");
  const toggle = (code) => setLang(code);
  return (
    <LangContext.Provider value={{ lang, setLang, toggle, tx: translations[lang] }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  return useContext(LangContext);
}