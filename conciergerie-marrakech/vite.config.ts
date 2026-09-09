import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ command }) => ({
  // The production build is served from a GitHub Pages project subpath
  // (ghbendidi-cell.github.io/blank-app/), so every asset and route needs an
  // absolute base rooted there — a relative base breaks as soon as a nested
  // route (e.g. /blank-app/services/menage-linge) is loaded directly, since
  // relative URLs then resolve against that deeper path instead of the site
  // root. Dev mode keeps the simple "/" base for convenience.
  base: command === "build" ? "/blank-app/" : "/",
  plugins: [react()],
}));
