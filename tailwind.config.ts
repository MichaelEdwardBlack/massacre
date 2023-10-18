import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        neon: "neon",
      },
      colors: {
        primary: {
          100: "#e1d0f6",
          200: "#c2a1ed",
          300: "#a471e4",
          400: "#8542db",
          500: "#6713d2",
          600: "#520fa8",
          700: "#3e0b7e",
          800: "#290854",
          900: "#15042a",
        },
        secondary: {
          100: "#dcf5e5",
          200: "#b9ebcc",
          300: "#96e0b2",
          400: "#73d699",
          500: "#50cc7f",
          600: "#40a366",
          700: "#307a4c",
          800: "#205233",
          900: "#102919",
        },
        accent: {
          100: "#f5d2e8",
          200: "#eba6d2",
          300: "#e079bb",
          400: "#d64da5",
          500: "#cc208e",
          600: "#a31a72",
          700: "#7a1355",
          800: "#520d39",
          900: "#29061c",
        },
      },
      animation: {
        flicker: "flicker 1.5s infinite alternate",
        borderFlicker: "borderFlicker 1.5s infinite alternate",
        glow: "glow 2s ease-in-out infinite alternate",
      },
      keyframes: {
        flicker: {
          "0%, 18%, 22%, 25%, 53%, 57%, 100%": {
            textShadow:
              "0 0 15px currentColor, 0 0 20px currentColor, 0 0 25px currentColor, 0 0 30px currentColor",
          },
          "20%, 24%, 55%": {
            textShadow: "none",
          },
        },
        borderFlicker: {
          "0%, 18%, 22%, 25%, 53%, 57%, 100%": {
            boxShadow:
              "0 0 1px currentColor, 0 0 2px currentColor, 0 0 3px currentColor, 0 0 4px currentColor",
          },
          "20%, 24%, 55%": {
            boxShadow: "none",
          },
        },
        glow: {
          from: {
            textShadow:
              "0 0 15px #fff, 0 0 20px var(--tw-gradient-from), 0 0 25px var(--tw-gradient-from), 0 0 30px var(--tw-gradient-from)",
          },
          to: {
            textShadow:
              "0 0 15px #fff, 0 0 20px var(--tw-gradient-to), 0 0 25px var(--tw-gradient-to), 0 0 30px var(--tw-gradient-to), 0 0 35px var(--tw-gradient-to)",
          },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [require("@headlessui/tailwindcss")],
};
export default config;
