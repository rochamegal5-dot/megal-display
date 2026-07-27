import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Megal Display",
  description: "Resultados en vivo - Quiniela - Tómbola - 5 de Oro",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
