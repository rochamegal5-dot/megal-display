import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Megal Display",
  description: "Pantalla profesional de resultados oficiales del Uruguay",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="bg-slate-950 text-white antialiased">
        {children}
      </body>
    </html>
  );
}
