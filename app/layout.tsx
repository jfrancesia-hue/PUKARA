import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PUKARA 360 | Centro de Comando Territorial",
  description: "Plataforma Unificada de Seguridad, Transito y Respuesta Territorial desarrollada por Nativos Consultora Digital."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
