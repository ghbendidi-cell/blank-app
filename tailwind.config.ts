import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#0e7c86",
          dark: "#0a4f57",
          light: "#e5f5f6",
        },
        accent: {
          DEFAULT: "#ff6b35",
          dark: "#e2501c",
          light: "#ffe8de",
        },
        gold: {
          DEFAULT: "#c9a227",
          dark: "#9c7d1c",
          light: "#faf3dd",
        },
        egypt: {
          DEFAULT: "#c9772d",
          dark: "#8f4e17",
          light: "#faf0e2",
        },
        vietnam: {
          DEFAULT: "#0e9f6e",
          dark: "#046c4e",
          light: "#e3f9f1",
        },
        turkey: {
          DEFAULT: "#1a8fd1",
          dark: "#0b5a86",
          light: "#e5f4fc",
        },
        hajj: {
          DEFAULT: "#3d2e6b",
          dark: "#221a42",
          light: "#f1edf9",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        arabic: ["var(--font-arabic)", "system-ui", "sans-serif"],
      },
      keyframes: {
        "fly-across": {
          "0%": { transform: "translate(-10%, 10%) rotate(3deg)", opacity: "0" },
          "10%": { opacity: "1" },
          "90%": { opacity: "1" },
          "100%": { transform: "translate(110%, -15%) rotate(3deg)", opacity: "0" },
        },
        "drift-cloud": {
          "0%": { transform: "translateX(-5%)" },
          "100%": { transform: "translateX(10%)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        blob: {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "33%": { transform: "translate(6%, -8%) scale(1.1)" },
          "66%": { transform: "translate(-5%, 6%) scale(0.95)" },
        },
      },
      animation: {
        "fly-across": "fly-across 18s linear infinite",
        "drift-cloud": "drift-cloud 30s ease-in-out infinite alternate",
        float: "float 4s ease-in-out infinite",
        blob: "blob 16s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
