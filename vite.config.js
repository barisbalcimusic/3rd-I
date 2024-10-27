import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      devOptions: {
        enabled: true,
      },
      manifest: {
        name: "3rd-I",
        short_name: "3rd-I",
        description: "A simple PWA with Vite and React",
        theme_color: "#ffffff",
        icons: [
          {
            src: "/icon-192px.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/icon-512px.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],
});
