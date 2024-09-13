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
        up: 'rgb(0 169 110)',
        down: 'rgb(255 88 97)',
        hold: 'rgb(255 190 0)',
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
          "--border": "212, 212, 212",
          "--text": "10, 10, 10",
        },
      },
      {
        dark: {
          ...require("daisyui/src/theming/themes")["dark"],
          "--base-950": "10, 10, 10",
          "--border": "64, 64, 64",
          "--text": "245, 245, 245"
        },
      },
    ],
  },
};
