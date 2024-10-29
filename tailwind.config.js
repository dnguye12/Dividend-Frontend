/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", 'sans-serif'],
      },
      colors: {
        "base-900": "rgba(var(--base-900), <alpha-value>)",
        "base-950": "rgba(var(--base-950), <alpha-value>)",
        "font-color": "rgba(var(--font-color), <alpha-value>)",
        "avatar": "rgba(var(--avatar), <alpha-value>)",
        border: "rgba(var(--border), <alpha-value>)",
        text: "rgba(var(--text), <alpha-value>)",
        up: "rgba(var(--up), <alpha-value>)",
        down: "rgb(255 88 97)",
        hold: "rgb(255 190 0)",
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        light: {
          ...require("daisyui/src/theming/themes")["light"],
          "--base-900": "229, 229, 229",
          "--base-950": "245, 245, 245",
          "--avatar": "24, 24, 27",
          "--font-color": "100, 116, 139",
          "--border": "212, 212, 212",
          "--text": "15, 23, 42",
          "--up": "0, 168, 62"
        },
      },
      {
        dark: {
          ...require("daisyui/src/theming/themes")["dark"],
          "--base-900": "24, 24, 27",
          "--base-950": "10, 10, 10",
          "--avatar": "24, 24, 27",
          "--font-color": "166, 173, 187",
          "--border": "64, 64, 64",
          "--text": "245, 245, 245",
          "--up": "0, 169, 110"
        },
      },
    ],
  },
};
