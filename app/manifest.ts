import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "PUKARA 360",
    short_name: "PUKARA 360",
    description: "Centro de comando territorial para seguridad, tránsito, emergencias y riesgo satelital.",
    start_url: "/dashboard",
    scope: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#071A2C",
    theme_color: "#123C2F",
    categories: ["government", "productivity", "utilities"],
    icons: [
      {
        src: "/icons/pukara-icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any"
      },
      {
        src: "/icons/pukara-maskable.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "maskable"
      }
    ],
    shortcuts: [
      { name: "Dashboard", short_name: "Dashboard", url: "/dashboard", icons: [{ src: "/icons/pukara-icon.svg", sizes: "any" }] },
      { name: "Mapa operativo", short_name: "Mapa", url: "/mapa", icons: [{ src: "/icons/pukara-icon.svg", sizes: "any" }] },
      { name: "Reportar", short_name: "Reportar", url: "/portal-ciudadano", icons: [{ src: "/icons/pukara-icon.svg", sizes: "any" }] }
    ]
  };
}
