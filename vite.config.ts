import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Core React runtime — changes almost never
          "vendor-react": ["react", "react-dom", "react-router-dom"],
          // Data-fetching layer
          "vendor-query": ["@tanstack/react-query"],
          // Sanity SDK — large, but rarely updated
          "vendor-sanity": [
            "@sanity/client",
            "@sanity/image-url",
            "@sanity/block-content-to-react",
          ],
          // Icon libraries — large tree-shaken bundles
          "vendor-icons": ["lucide-react", "react-icons"],
        },
      },
    },
    // Warn when a single chunk exceeds 600 kB (Vite default is 500 kB)
    chunkSizeWarningLimit: 600,
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
