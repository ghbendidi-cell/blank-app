import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        cream: {
          DEFAULT: "#F8F4EC",
          soft: "#F1EAD9",
        },
        ink: {
          DEFAULT: "#2B2620",
          light: "#5C5548",
        },
        olive: {
          DEFAULT: "#6B6E39",
          dark: "#52542C",
          light: "#DEDFC4",
        },
      },
      fontFamily: {
        serif: ["Fraunces", "Georgia", "serif"],
        sans: ["Work Sans", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        widest2: "0.28em",
      },
      borderRadius: {
        soft: "10px",
      },
      maxWidth: {
        prose: "68ch",
      },
    },
  },
  plugins: [],
};

export default config;
