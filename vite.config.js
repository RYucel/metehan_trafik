import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        short_name: "HaritaHız",
        name: "Harita & Hız Gözlem Uygulaması",
        icons: [
          {
            src: "/icon-192x192.png",
            type: "image/png",
            sizes: "192x192"
          },
          {
            src: "/icon-512x512.png",
            type: "image/png",
            sizes: "512x512"
          }
        ],
        start_url: ".",
        display: "standalone",
        background_color: "#ffffff",
        theme_color: "#2563eb"
      }
    })
  ]
});
