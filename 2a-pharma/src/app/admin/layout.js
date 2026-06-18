import "../../globals.css";

export default function AdminLayout({ children }) {
  return (
    <html lang="al">
      <body>
        {children}
      </body>
    </html>
  );
}