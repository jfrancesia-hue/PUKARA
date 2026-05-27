import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        cardon: "#123C2F",
        monte: "#1F6B4A",
        techno: "#18B7A4",
        copper: "#C8783A",
        arena: "#E7D3B0",
        night: "#071A2C",
        alert: "#D94141",
        emergency: "#F2B84B"
      },
      boxShadow: {
        glow: "0 0 32px rgba(24, 183, 164, 0.22)",
        copper: "0 0 28px rgba(200, 120, 58, 0.18)"
      }
    }
  },
  plugins: [typography]
};

export default config;
