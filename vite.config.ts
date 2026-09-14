import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  build: {
    rollupOptions: {
      external: ["pg-schema-classifier"]
    }
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src")
    }
  },
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "Traveler.Dev",
        short_name: "Traveler",
        theme_color: "#0f172a",
        icons: [{ src: "/pwa-192x192.png", sizes: "192x192", type: "image/png" }]
      }
    })
  ]
});
