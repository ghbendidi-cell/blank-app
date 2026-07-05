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
    },
  },
  plugins: [],
};

export default config;
