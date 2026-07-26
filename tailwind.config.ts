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
        // Old Money Editorial palette: ivory, ink, terracotta, bottle green, navy
        ivory: {
          DEFAULT: "#F7F3EC",
          dark: "#EDE6D8",
        },
        ink: {
          DEFAULT: "#1A1A18",
          soft: "#3A3934",
        },
        brand: {
          DEFAULT: "#2E4638",
          dark: "#1E2E24",
          light: "#E6EAE3",
        },
        accent: {
          DEFAULT: "#A65E2E",
          dark: "#7C4620",
          light: "#F1E3D6",
        },
        gold: {
          DEFAULT: "#C9B48C",
          dark: "#A18B5F",
          light: "#F7F3EC",
        },
        salmon: {
          DEFAULT: "#D79683",
          dark: "#BD7562",
          light: "#F6E7E1",
        },
        egypt: {
          DEFAULT: "#A65E2E",
          dark: "#7C4620",
          light: "#F1E3D6",
        },
        vietnam: {
          DEFAULT: "#2E4638",
          dark: "#1E2E24",
          light: "#E6EAE3",
        },
        turkey: {
          DEFAULT: "#1F3864",
          dark: "#152747",
          light: "#E4E9F0",
        },
        hajj: {
          DEFAULT: "#3B3226",
          dark: "#241F19",
          light: "#E8E1D3",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        arabic: ["var(--font-arabic)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "var(--font-sans)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        xl: "0.4rem",
        "2xl": "0.6rem",
        "3xl": "0.85rem",
      },
    },
  },
  plugins: [],
};

export default config;
