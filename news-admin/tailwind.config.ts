import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config: Config = {
  darkMode: ["class"],

  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  theme: {
    extend: {
      colors: {
        background: "#FFFFFF",
        foreground: "#222222",

        primary: {
          DEFAULT: "#0B57D0",
          foreground: "#FFFFFF",
          hover: "#0842A0",
          light: "#E8F0FE",
        },

        accent: {
          DEFAULT: "#D32F2F",
          foreground: "#FFFFFF",
          hover: "#B71C1C",
          light: "#FFEBEE",
        },

        border: "#E0E0E0",

        muted: {
          DEFAULT: "#F5F5F5",
          foreground: "#757575",
        },

        sidebar: {
          DEFAULT: "#FAFAFA",
          hover: "#F0F4FF",
          active: "#E8F0FE",
        },

        success: {
          DEFAULT: "#2E7D32",
          light: "#E8F5E9",
        },

        warning: {
          DEFAULT: "#E65100",
          light: "#FFF3E0",
        },
      },

      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Georgia", "serif"],
      },

      boxShadow: {
        card:
          "0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04)",
        dropdown: "0 4px 16px rgba(0,0,0,0.12)",
        sidebar: "1px 0 0 #E0E0E0",
      },

      borderRadius: {
        DEFAULT: "8px",
      },
    },
  },

  plugins: [typography],
};

export default config;