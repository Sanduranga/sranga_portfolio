import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        masthead: ["'Chomsky'", "'UnifrakturMaguntia'", "serif"],
        headline: ["'Playfair Display'", "Georgia", "serif"],
        body: ["'IM Fell English'", "Georgia", "serif"],
        deck: ["'Libre Baskerville'", "Georgia", "serif"],
        mono: ["'Special Elite'", "'Courier New'", "monospace"],
        label: ["'Josefin Sans'", "sans-serif"],
      },
      colors: {
        ink: "#1a1208",
        paper: "#f2ead8",
        "paper-dark": "#e8ddc0",
        "paper-aged": "#d4c9a8",
        rule: "#2c1f0e",
        fade: "#5c4a2a",
        accent: "#8b1a1a",
      },
      backgroundImage: {
        "paper-texture": "url('/paper-texture.svg')",
      },
    },
  },
  plugins: [],
};

export default config;
