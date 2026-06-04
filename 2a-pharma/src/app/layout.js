import "./globals.css";
import { LangProvider } from "../context/LangContext.jsx";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";

export const metadata = {
  title: "2A Pharma",
  description: "Pajisje Mjekësore Profesionale",
};

export default function RootLayout({ children }) {
  return (
    <html lang="al">
      <body suppressHydrationWarning>
        <LangProvider>
          <Navbar />

          <main style={{ flex: 1 }}>
            {children}
          </main>

          <Footer />
        </LangProvider>
      </body>
    </html>
  );
}