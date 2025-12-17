import { defineConfig } from "vite";

import react from "@vitejs/plugin-react";

// https://vite.dev/config/

export default defineConfig({
  plugins: [react()],

  // base: "/safetydashboardportal/", // Subdirectory path for deployment

  build: {
    sourcemap: false, // Disable source maps in production to avoid warnings
  },
});
