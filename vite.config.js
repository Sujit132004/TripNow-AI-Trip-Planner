import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    headers: {
      // Remove unnecessary headers to avoid conflicts
      "Cross-Origin-Opener-Policy": "unsafe-none", // Disables strict cross-origin isolation
      "Cross-Origin-Embedder-Policy": "unsafe-none", // Disables embedding restrictions
    },
  },
});
