import tailwindcss from "@tailwindcss/vite";
import tsconfigPath from "vite-tsconfig-paths";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), tsconfigPath()],
  css: {
    modules: {
      generateScopedName: "[name]_[local]_[hash:base64:5]",
    },
  },
  test: {
    globals: true,
    coverage: {
      provider: "v8",
    },
    environment: "jsdom",
    setupFiles: "./vitest.setup.ts",
  },
});
