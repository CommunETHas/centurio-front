import reactRefresh from "@vitejs/plugin-react-refresh";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import { esbuildCommonjs } from '@originjs/vite-plugin-commonjs'
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  build: {
    brotliSize: false,
    sourcemap: true
  },
  server: {
    watch: {
      usePolling: true
    }
  },
  plugins: [
    esbuildCommonjs(['@web3-react/abstract-connector']),
    tsconfigPaths(),
    reactRefresh(),
    VitePWA({
      workbox: {
        additionalManifestEntries: [
          // eslint-disable-next-line unicorn/no-null
          { url: "https://rsms.me/inter/inter.css", revision: null },
        ],
        cleanupOutdatedCaches: true,
        clientsClaim: true,
        skipWaiting: true,
        navigateFallback: undefined,
      },
      manifest: {
        name: "Centurio",
        short_name: "Centurio",
        theme_color: "#BD34FE",
        icons: [
          {
            src: "/android-chrome-192x192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any maskable",
          },
          {
            src: "/android-chrome-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],
});
