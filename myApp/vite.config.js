import legacy from "@vitejs/plugin-legacy";
import vue from "@vitejs/plugin-vue";
import { server } from "ionicons/icons";
import path from "path";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), legacy()],
  server: {
    host: "0.0.0.0",
    port: 8080,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
  },
  build: {
    outDir: "browser",
  },
});
