"use client";

import { createContext, useContext, useState } from "react";

export const translations = {
  al: {
    nav: {
      home: "Kryefaqja", about: "Rreth nesh",
      products: "Produktet", services: "Shërbimet", warehousing: "Magazinimi", pharmacovigilance: "Farmakovigjilenca", partners: "Partnerët",
      eventsNews: "Lajme & Evente", contact: "Kontakt"
    },
    hero: {
      badge: "Produkte Farmaceutike të Certifikuara",
      title1: "Distributori",
      title2: "juaj",
      title3: "Farmaceutik",
      sub: "Furnizuesi juaj i besueshëm i barnave dhe produkteve farmaceutike. Produkte të certifikuara për klinika, spitale dhe farmaci.",
      btnProducts: "Shiko Produktet",
      btnContact: "Na Kontaktoni",
    },
    products: {
      label: "Produktet Tona",
      title: "",
      sub: "Zgjidhje profesionale për çdo nevojë mjekësore.",
      viewAll: "Shiko të gjitha",
      details: "Detaje",
    },
    features: {
      label: "Pse Ne",
      title: "Avantazhet Tona",
      items: [
        { title: "Produkte të Certifikuara", desc: "Të gjitha produktet kanë certifikata ndërkombëtare të cilësisë dhe sigurisë." },
        { title: "Dërgim i Shpejtë", desc: "Dërgojmë në të gjithë Shqipërinë brenda 24-48 orësh." },
        { title: "Mbështetje 24/7", desc: "Ekipi ynë është gjithmonë i disponueshëm për ju." },
        { title: "Garanci & Servis", desc: "Ofrojmë garanci dhe shërbim pas shitjes për të gjitha produktet." },
      ],
    },
    partners: { label: "Partnerët", title: "Partnerët tane kryesore" },
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
      sub: "Kompani lider në furnizimin dhe distribucionin e barnave dhe produkteve farmaceutike në Shqipëri.",
    },
    // ── STATIK — pagina Shërbimet (/services) ──
    services: {
      label: "Shërbimet",
      sub: "Përveç shitjes, ofrojmë mbështetje të plotë gjatë gjithë procesit të furnizimit me barna dhe produkte farmaceutike.",
      gridTag: "Çfarë ofrojmë",
      gridTitle: "Shërbimet Tona Kryesore",
      items: [
        // SHTUAR (2026-09-28): la fel ca celelalte, are acum `href` propriu
        // — hap direkt pagina e dedikuar /distribution.
        { title: "Distribucion", desc: "Shpërndajmë ilace dhe produkte farmaceutike në të gjithë Shqipërinë, me logjistikë të shpejtë dhe të besueshme drejt klinikave, spitaleve dhe farmacive.", href: "/distribution" },
        // SHTUAR (2026-09-28): la fel ca celelalte, are acum `href` propriu
        // — hap direkt pagina e dedikuar /regulatory.
        { title: "Shërbime Rregullatore për Barna", desc: "Ofrojmë mbështetje të plotë rregullatore — regjistrim, dokumentacion dhe përputhshmëri me kërkesat ligjore — për produktet që përfaqësojmë.", href: "/regulatory" },
        // SHTUAR (2026-09-28): la fel ca Magazinimi/Farmakovigjilenca, are
        // acum `href` propriu — hap direkt pagina e dedikuar /marketing.
        { title: "Marketing dhe Shitje", desc: "Ekipi ynë komercial promovon dhe shet produktet me një qasje të orientuar te klienti, ndërtuar mbi njohuri të thella të tregut shqiptar.", href: "/marketing" },
        // SHTUAR (2026-09-28): la fel ca celelalte, are acum `href` propriu
        // — hap direkt pagina e dedikuar /online-shop.
        { title: "Dyqan Online", desc: "Porositni produktet tona direkt online, me katalog të përditësuar dhe dërgesë të shpejtë kudo në vend.", href: "/online-shop" },
        // SHTUAR (2026-09-28): al 5-lea shërbim — spre deosebim nga celelalte
        // 4 (care çelin /services), ky ka `href` propriu dhe hap direkt
        // pagina e dedikuar /warehousing (vezi components/ServicesGrid.jsx).
        { title: "Magazinimi", desc: "Ofrojmë shërbime të plota magazinimi dhe menaxhimi të stokut, me infrastrukturë moderne dhe respektim të standardeve ndërkombëtare të cilësisë.", href: "/warehousing" },
        { title: "Farmakovigjilenca", desc: "Menaxhojmë sigurinë e produktit përmes mbledhjes, zbulimit, vlerësimit, monitorimit, raportimit dhe parandalimit të rasteve të efekteve anësore.", href: "/pharmacovigilance" },
        // SHTUAR (2026-09-29): shërbimi i 7-të — hap direkt pagina e
        // dedikuar /quality-compliance (organigrama GDP, Responsible
        // Person, quarantine/release, FEFO, CAPA, etj.).
        { title: "Cilësia & Pajtueshmëria / GDP", desc: "Zbatojmë standardet GDP dhe ISO 9001:2015 në çdo hap — nga magazinimi te shpërndarja — për të garantuar cilësinë dhe sigurinë e produkteve.", href: "/quality-compliance" },
      ],
      ctaTitle: "Keni nevojë për një shërbim specifik?",
      ctaSub: "Na tregoni për çfarë keni nevojë dhe ekipi ynë do t'ju kontaktojë brenda 24 orësh.",
      ctaBtn: "Na kontaktoni",
    },
    // ── STATIK — pagina Lajme & Evente (/events-news) ──
    eventsNews: {
      label: "Lajme & Evente",
      sub: "Risitë, panairet dhe momentet e rëndësishme nga jeta e 2A Pharma.",
      gridTag: "Aktualitet",
      gridTitle: "Të Fundit nga 2A Pharma",
      items: [
        { type: "event", date: "Shtator 2026", tag: "Eveniment", title: "Pjesëmarrje në Panairin Shëndetësor Kombëtar", excerpt: "2A Pharma prezantoi gamën e re të produkteve farmaceutike në Panairin Shëndetësor Kombëtar në Tiranë." },
        { type: "news", date: "Gusht 2026", tag: "Lajm", title: "Rinovimi i Certifikimeve ISO dhe GDP", excerpt: "Kemi rinovuar me sukses certifikimet tona ISO dhe GDP (Praktika e Mirë e Shpërndarjes) për cilësi dhe standarde në furnizimin e barnave.", files: [
          { name: "Certifikata ISO Nr. 1", url: "/documents/iso-certificate-1.pdf", icon: "/images/icons/cert-iso.png" },
          { name: "Certifikata ISO Nr. 2", url: "/documents/iso-certificate-2.pdf", icon: "/images/icons/cert-iso.png" },
          { name: "Certifikata GDP", url: "/documents/gdp-certificate.pdf", icon: "/images/icons/cert-gdp.png" },
        ] },
        { type: "event", date: "Tetor 2026", tag: "Eveniment", title: "Simpoziumi Vjetor i Shoqatës Shqiptare të Distributorëve Farmaceutikë", excerpt: "2A Pharma mori pjesë si anëtare në simpoziumin vjetor organizuar nga Shoqata Shqiptare e Distributorëve Farmaceutikë, i dedikuar standardeve të reja në distribucionin e ilaceve." },
        { type: "news", date: "Korrik 2026", tag: "Lajm", title: "Partneritet i Ri me një Prodhues Evropian të Ilaçeve", excerpt: "Kemi nënshkruar një marrëveshje partneriteti me një prodhues të njohur evropian të ilaçeve, duke zgjeruar gamën e produkteve farmaceutike që ofrojmë në treg." },
      ],
      ctaTitle: "Dëshironi të merrni lajmet tona të para?",
      ctaSub: "Kontaktoni ekipin tonë dhe do t'ju mbajmë të informuar për çdo risi apo eveniment.",
      ctaBtn: "Na kontaktoni",
    },
    // ── STATIK — secțiunile noi de pe Home (2026-09-27) ──
    home: {
      servicesTitle: "Shërbimet",
      mission: {
        title: "Misioni Ynë",
        text: "Të ofrojmë barna dhe produkte farmaceutike të cilësisë së lartë për pacientet dhe institucionet shëndetësore në Shqipëri, duke kontribuar në përmirësimin e kujdesit shëndetësor.",
      },
      expertise: {
        title: "Ekspertiza dhe Gama Jonë e Shërbimeve",
        columns: [
          { title: "SHËRBIME TEKNIKE", items: ["Instalim & vënie në punë", "Mirëmbajtje parandaluese", "Riparime urgjente", "Kalibrim & testim", "Furnizim me pjesë këmbimi"] },
          { title: "SHITJE & KONSULENCË", items: ["Konsulencë për pajisje", "Vlerësim i nevojave", "Zgjidhje të personalizuara", "Opsione financimi fleksibël"] },
          { title: "TRAJNIM & MBËSHTETJE", items: ["Trajnim i stafit në terren", "Manuale dhe udhëzues", "Mbështetje teknike e vazhdueshme", "Diagnostikim në distancë"] },
          { title: "CILËSI & PËRPUTHSHMËRI", items: ["Vetëm produkte të certifikuara", "Përputhshmëri me rregullat lokale", "Dokumentacion CE", "Menaxhim garancie"] },
        ],
      },
      aboutCompany: {
        title: "Rreth Kompanisë",
        stats: [
          { num: "500+", label: "Produkte" },
          { num: "50+", label: "Partnerë" },
          { num: "10+", label: "Vjet Përvojë" },
        ],
      },
      // SCHIMBAT (2026-09-27): reproiectat ca "tabel" de 4 coloane × 3
      // rânduri me linii verticale de separare (design de referință
      // trimis de user) — fiecare celulă are un `type`:
      // "icon" ({icon, label}), "stat" ({num, label}),
      // "text" ({main, sub}) sau "flag" (fără date, randează steagul).
      // ADĂUGAT (2026-09-28): al 4-lea stat — "Since 2012" (userul a cerut
      // count-up animat pentru numere; "2012" se potrivește tiparului
      // "număr simplu" din CountUpNumber, deci se va anima și el).
      figures: {
        title: "2A Pharma në Shifra",
        stats: [
          { num: "500+", label: "Produkte në Stok" },
          { num: "24-48h", label: "Kohë Dërgese" },
          { num: "2012", label: "Që nga" },
        ],
      },
    },
    // ── STATIK — footer (2026-09-27) ──
    footer: {
      copySuffix: "2A Pharma. Të gjitha të drejtat e rezervuara.",
      privacy: "Politika e Privatësisë",
      terms: "Kushtet e Përdorimit",
      sitemap: "Harta e Faqes",
    },
  },
  en: {
    nav: {
      home: "Home", about: "About",
      products: "Products", services: "Services", warehousing: "Warehousing", pharmacovigilance: "Pharmacovigilance", partners: "Partners",
      eventsNews: "News & Events", contact: "Contact"
    },
    hero: {
      badge: "Certified Pharmaceutical Products",
      title1: "Your",
      title2: "Pharmaceutical",
      title3: "Distributor",
      sub: "Your trusted supplier of medicines and pharmaceutical products. Certified products for clinics, hospitals and pharmacies.",
      btnProducts: "View Products",
      btnContact: "Contact Us",
    },
    products: {
      label: "Our Products",
      title: "Pharmaceutical Products",
      sub: "Professional solutions for every medical need.",
      viewAll: "View all",
      details: "Details",
    },
    features: {
      label: "Why Us",
      title: "Our Advantages",
      items: [
        { title: "Certified Products", desc: "All products have international quality and safety certificates." },
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
      sub: "A leading company in the supply and distribution of medicines and pharmaceutical products in Albania.",
    },
    // ── STATIC — Services page (/services) ──
    services: {
      label: "Services",
      sub: "Beyond sales, we provide full support throughout the entire pharmaceutical supply process.",
      gridTag: "What we offer",
      gridTitle: "Our Core Services",
      items: [
        { title: "Distribution", desc: "We distribute medicines and pharmaceutical products across Albania, with fast, reliable logistics to clinics, hospitals and pharmacies.", href: "/distribution" },
        { title: "Medicine Regulatory Services", desc: "We provide full regulatory support — registration, documentation and compliance with legal requirements — for the products we represent.", href: "/regulatory" },
        { title: "Marketing and Sales", desc: "Our commercial team promotes and sells our products with a customer-focused approach, built on deep knowledge of the Albanian market.", href: "/marketing" },
        { title: "Online Shop", desc: "Order our products directly online, with an up-to-date catalogue and fast delivery anywhere in the country.", href: "/online-shop" },
        { title: "Warehousing", desc: "We provide full warehousing and stock management services, with modern infrastructure and compliance with international quality standards.", href: "/warehousing" },
        { title: "Pharmacovigilance", desc: "We manage product safety via the collection, detection, assessment, monitoring, reporting and prevention of adverse effect cases.", href: "/pharmacovigilance" },
        { title: "Quality & Compliance / GDP", desc: "We apply GDP and ISO 9001:2015 standards at every step — from warehousing to distribution — to guarantee product quality and safety.", href: "/quality-compliance" },
      ],
      ctaTitle: "Need a specific service?",
      ctaSub: "Tell us what you need and our team will contact you within 24 hours.",
      ctaBtn: "Contact us",
    },
    // ── STATIC — News & Events page (/events-news) ──
    eventsNews: {
      label: "News & Events",
      sub: "Updates, trade fairs and key moments from life at 2A Pharma.",
      gridTag: "Latest",
      gridTitle: "Latest from 2A Pharma",
      items: [
        { type: "event", date: "September 2026", tag: "Event", title: "Participation in the National Health Expo", excerpt: "2A Pharma presented its new range of pharmaceutical products at the National Health Expo in Tirana." },
        { type: "news", date: "August 2026", tag: "News", title: "ISO and GDP Certifications Renewed", excerpt: "We successfully renewed our ISO and GDP (Good Distribution Practice) certifications for quality and standards in medicines supply.", files: [
          { name: "ISO Certificate No. 1", url: "/documents/iso-certificate-1.pdf", icon: "/images/icons/cert-iso.png" },
          { name: "ISO Certificate No. 2", url: "/documents/iso-certificate-2.pdf", icon: "/images/icons/cert-iso.png" },
          { name: "GDP Certificate", url: "/documents/gdp-certificate.pdf", icon: "/images/icons/cert-gdp.png" },
        ] },
        { type: "event", date: "October 2026", tag: "Event", title: "Annual Symposium of the Albanian Pharmaceutical Distributors Association", excerpt: "2A Pharma took part as a member in the annual symposium organized by the Albanian Pharmaceutical Distributors Association, focused on new standards in medicine distribution." },
        { type: "news", date: "July 2026", tag: "News", title: "New Partnership with a European Medicines Manufacturer", excerpt: "We signed a partnership agreement with a well-known European medicines manufacturer, expanding the range of pharmaceutical products we offer on the market." },
      ],
      ctaTitle: "Want to be the first to know?",
      ctaSub: "Contact our team and we'll keep you posted on every update and event.",
      ctaBtn: "Contact us",
    },
    // ── STATIC — new Home sections (2026-09-27) ──
    home: {
      servicesTitle: "Services",
      mission: {
        title: "Our Mission",
        text: "To provide high-quality medicines and pharmaceutical products to patients and healthcare institutions across Albania, contributing to the improvement of healthcare.",
      },
      expertise: {
        title: "Our Expertise & Range of Services",
        columns: [
          { title: "TECHNICAL SERVICES", items: ["Installation & commissioning", "Preventive maintenance", "Emergency repairs", "Calibration & testing", "Spare parts supply"] },
          { title: "SALES & CONSULTANCY", items: ["Equipment consultancy", "Needs assessment", "Custom solutions", "Flexible financing options"] },
          { title: "TRAINING & SUPPORT", items: ["On-site staff training", "User manuals & guides", "Ongoing technical support", "Remote diagnostics"] },
          { title: "QUALITY & COMPLIANCE", items: ["Certified products only", "Local regulatory compliance", "CE documentation", "Warranty management"] },
        ],
      },
      aboutCompany: {
        title: "About the Company",
        stats: [
          { num: "500+", label: "Products" },
          { num: "50+", label: "Partners" },
          { num: "10+", label: "Years of Experience" },
        ],
      },
      figures: {
        title: "2A Pharma in Figures",
        stats: [
          { num: "500+", label: "Products in Stock" },
          { num: "24-48h", label: "Delivery Time" },
          { num: "2012", label: "Since" },
        ],
      },
    },
    // ── STATIC — footer (2026-09-27) ──
    footer: {
      copySuffix: "2A Pharma. All rights reserved.",
      privacy: "Privacy Policy",
      terms: "Terms of Service",
      sitemap: "Sitemap",
    },
  },
  it: {
    nav: {
      home: "Home", about: "Chi siamo",
      products: "Prodotti", services: "Servizi", warehousing: "Magazzinaggio", pharmacovigilance: "Farmacovigilanza", partners: "Partner",
      eventsNews: "Notizie & Eventi", contact: "Contatto"
    },
    hero: {
      badge: "Prodotti Farmaceutici Certificati",
      title1: "Il Vostro",
      title2: "Distributore",
      title3: "Farmaceutico",
      sub: "Il tuo fornitore affidabile di farmaci e prodotti farmaceutici. Prodotti certificati per cliniche, ospedali e farmacie.",
      btnProducts: "Vedi Prodotti",
      btnContact: "Contattaci",
    },
    products: {
      label: "I Nostri Prodotti",
      title: "Prodotti Farmaceutici",
      sub: "Soluzioni professionali per ogni esigenza medica.",
      viewAll: "Vedi tutti",
      details: "Dettagli",
    },
    features: {
      label: "Perché Noi",
      title: "I Nostri Vantaggi",
      items: [
        { title: "Prodotti Certificati", desc: "Tutti i prodotti hanno certificati internazionali di qualità e sicurezza." },
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
      sub: "Azienda leader nella fornitura e distribuzione di farmaci e prodotti farmaceutici in Albania",
    },
    // ── STATICA — pagina Servizi (/services) ──
    services: {
      label: "Servizi",
      sub: "Oltre alla vendita, offriamo supporto completo per tutto il processo di fornitura farmaceutica.",
      gridTag: "Cosa offriamo",
      gridTitle: "I Nostri Servizi Principali",
      items: [
        { title: "Distribuzione", desc: "Distribuiamo farmaci e prodotti farmaceutici in tutta l'Albania, con una logistica rapida e affidabile verso cliniche, ospedali e farmacie.", href: "/distribution" },
        { title: "Servizi Regolatori Farmaceutici", desc: "Offriamo supporto regolatorio completo — registrazione, documentazione e conformità normativa — per i prodotti che rappresentiamo.", href: "/regulatory" },
        { title: "Marketing e Vendite", desc: "Il nostro team commerciale promuove e vende i prodotti con un approccio orientato al cliente, basato su una conoscenza approfondita del mercato albanese.", href: "/marketing" },
        { title: "Negozio Online", desc: "Ordinate i nostri prodotti direttamente online, con un catalogo aggiornato e consegna rapida in tutto il paese.", href: "/online-shop" },
        { title: "Magazzinaggio", desc: "Offriamo servizi completi di magazzinaggio e gestione delle scorte, con infrastrutture moderne e conformità agli standard internazionali di qualità.", href: "/warehousing" },
        { title: "Farmacovigilanza", desc: "Gestiamo la sicurezza del prodotto attraverso la raccolta, il rilevamento, la valutazione, il monitoraggio, la segnalazione e la prevenzione dei casi di effetti avversi.", href: "/pharmacovigilance" },
        { title: "Qualità & Conformità / GDP", desc: "Applichiamo gli standard GDP e ISO 9001:2015 in ogni fase — dallo stoccaggio alla distribuzione — per garantire la qualità e la sicurezza dei prodotti.", href: "/quality-compliance" },
      ],
      ctaTitle: "Avete bisogno di un servizio specifico?",
      ctaSub: "Diteci di cosa avete bisogno e il nostro team vi contatterà entro 24 ore.",
      ctaBtn: "Contattaci",
    },
    // ── STATICA — pagina Notizie & Eventi (/events-news) ──
    eventsNews: {
      label: "Notizie & Eventi",
      sub: "Novità, fiere e momenti importanti della vita di 2A Pharma.",
      gridTag: "Ultime notizie",
      gridTitle: "Le Ultime da 2A Pharma",
      items: [
        { type: "event", date: "Settembre 2026", tag: "Evento", title: "Partecipazione alla Fiera Nazionale della Salute", excerpt: "2A Pharma ha presentato la nuova gamma di prodotti farmaceutici alla Fiera Nazionale della Salute a Tirana." },
        { type: "news", date: "Agosto 2026", tag: "Notizia", title: "Rinnovate le Certificazioni ISO e GDP", excerpt: "Abbiamo rinnovato con successo le nostre certificazioni ISO e GDP (Good Distribution Practice) per la qualità e gli standard nella fornitura di farmaci.", files: [
          { name: "Certificato ISO N. 1", url: "/documents/iso-certificate-1.pdf", icon: "/images/icons/cert-iso.png" },
          { name: "Certificato ISO N. 2", url: "/documents/iso-certificate-2.pdf", icon: "/images/icons/cert-iso.png" },
          { name: "Certificato GDP", url: "/documents/gdp-certificate.pdf", icon: "/images/icons/cert-gdp.png" },
        ] },
        { type: "event", date: "Ottobre 2026", tag: "Evento", title: "Simposio Annuale dell'Associazione Albanese dei Distributori Farmaceutici", excerpt: "2A Pharma ha partecipato come membro al simposio annuale organizzato dall'Associazione Albanese dei Distributori Farmaceutici, dedicato ai nuovi standard nella distribuzione dei farmaci." },
        { type: "news", date: "Luglio 2026", tag: "Notizia", title: "Nuova Partnership con un Produttore Europeo di Farmaci", excerpt: "Abbiamo firmato un accordo di partnership con un noto produttore europeo di farmaci, ampliando la gamma di prodotti farmaceutici offerti sul mercato." },
      ],
      ctaTitle: "Volete essere i primi a saperlo?",
      ctaSub: "Contattate il nostro team e vi terremo aggiornati su ogni novità ed evento.",
      ctaBtn: "Contattaci",
    },
    // ── STATICA — nuove sezioni Home (2026-09-27) ──
    home: {
      servicesTitle: "Servizi",
      mission: {
        title: "La Nostra Missione",
        text: "Fornire farmaci e prodotti farmaceutici di alta qualità a pazienti e istituzioni sanitarie in tutta l'Albania, contribuendo al miglioramento dell'assistenza sanitaria.",
      },
      expertise: {
        title: "La Nostra Competenza e Gamma di Servizi",
        columns: [
          { title: "SERVIZI TECNICI", items: ["Installazione e avviamento", "Manutenzione preventiva", "Riparazioni urgenti", "Calibrazione e test", "Fornitura pezzi di ricambio"] },
          { title: "VENDITE & CONSULENZA", items: ["Consulenza sulle apparecchiature", "Valutazione dei bisogni", "Soluzioni personalizzate", "Opzioni di finanziamento flessibili"] },
          { title: "FORMAZIONE & SUPPORTO", items: ["Formazione del personale in sede", "Manuali e guide utente", "Supporto tecnico continuo", "Diagnostica da remoto"] },
          { title: "QUALITÀ & CONFORMITÀ", items: ["Solo prodotti certificati", "Conformità normativa locale", "Documentazione CE", "Gestione della garanzia"] },
        ],
      },
      aboutCompany: {
        title: "Chi Siamo",
        stats: [
          { num: "500+", label: "Prodotti" },
          { num: "50+", label: "Partner" },
          { num: "10+", label: "Anni di Esperienza" },
        ],
      },
      figures: {
        title: "2A Pharma in Cifre",
        stats: [
          { num: "500+", label: "Prodotti in Stock" },
          { num: "24-48h", label: "Tempo di Consegna" },
          { num: "2012", label: "Dal" },
        ],
      },
    },
    // ── STATICA — footer (2026-09-27) ──
    footer: {
      copySuffix: "2A Pharma. Tutti i diritti riservati.",
      privacy: "Informativa sulla Privacy",
      terms: "Termini di Servizio",
      sitemap: "Mappa del Sito",
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