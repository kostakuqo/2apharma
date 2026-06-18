import "./globals.css";
import { LangProvider } from "../context/LangContext.jsx";
import LayoutShell from "../components/LayoutShell.jsx";

export const metadata = {
  title: "2A Pharma",
  description: "Pajisje Mjekësore Profesionale",
};

export default function RootLayout({ children }) {
  return (
    <html lang="al" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <LangProvider>
          <LayoutShell>
            {children}
          </LayoutShell>
        </LangProvider>
      </body>
    </html>
  );
}