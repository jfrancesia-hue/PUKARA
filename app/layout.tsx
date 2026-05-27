import type { Metadata } from "next";
import { PwaRegister } from "@/components/pwa-register";
import "./globals.css";

export const metadata: Metadata = {
  title: "PUKARA 360 | Centro de Comando Territorial",
  description: "Plataforma Unificada de Seguridad, Transito y Respuesta Territorial desarrollada por Nativos Consultora Digital.",
  applicationName: "PUKARA 360",
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    title: "PUKARA 360",
    statusBarStyle: "black-translucent"
  },
  formatDetection: {
    telephone: false
  },
  icons: {
    icon: "/icons/pukara-icon.svg",
    apple: "/icons/pukara-icon.svg"
  }
};

export const viewport = {
  themeColor: "#123C2F",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body>
        <PwaRegister />
        {children}
      </body>
    </html>
  );
}
