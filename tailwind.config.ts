import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        sx: {
          deep: "#020E0E",
          card: "#0C1618",
          border: "#003D3A",
          cream: "#FDFBED",
          accent: "#01DE82",
          "accent-hover": "#00C472",
          muted: "#7A8A8A",
        },
      },
      fontFamily: {
        heading: ["var(--font-space-grotesk)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
