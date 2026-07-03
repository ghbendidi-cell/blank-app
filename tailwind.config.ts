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
        // Palette : Juniper, Napa, Cameo, Geraldine, Russett
        brand: {
          DEFAULT: "#6D9891",
          dark: "#4e6d68",
          light: "#e5eceb",
        },
        accent: {
          DEFAULT: "#F69F83",
          dark: "#b1725e",
          light: "#fdeee9",
        },
        gold: {
          DEFAULT: "#E0C1A5",
          dark: "#a18b77",
          light: "#f9f4ef",
        },
        egypt: {
          DEFAULT: "#F69F83",
          dark: "#b1725e",
          light: "#fdeee9",
        },
        vietnam: {
          DEFAULT: "#6D9891",
          dark: "#4e6d68",
          light: "#e5eceb",
        },
        turkey: {
          DEFAULT: "#AFAC9B",
          dark: "#7e7c70",
          light: "#f1f0ed",
        },
        hajj: {
          DEFAULT: "#76575D",
          dark: "#553f43",
          light: "#e6e1e2",
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
        kenburns: {
          "0%": { transform: "scale(1) translate(0, 0)" },
          "100%": { transform: "scale(1.12) translate(-1.5%, -1%)" },
        },
      },
      animation: {
        "fly-across": "fly-across 18s linear infinite",
        "drift-cloud": "drift-cloud 30s ease-in-out infinite alternate",
        float: "float 4s ease-in-out infinite",
        blob: "blob 16s ease-in-out infinite",
        kenburns: "kenburns 22s ease-in-out infinite alternate",
      },
    },
  },
  plugins: [],
};

export default config;
