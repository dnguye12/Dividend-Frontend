/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "base-950": "rgba(var(--base-950), <alpha-value>)",
        "border": "rgba(var(--border), <alpha-value>)",
        "text": "rgba(var(--text), <alpha-value>)",
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        light: {
          ...require("daisyui/src/theming/themes")["light"],
          "--base-950": "245, 245, 245",
          "--border": "229, 229, 229",
          "--text": "10, 10, 10",
        },
      },
      {
        dark: {
          ...require("daisyui/src/theming/themes")["dark"],
          "--base-950": "10, 10, 10",
          "--border": "38, 38, 38",
          "--text": "245, 245, 245"
        },
      },
    ],
  },
};
