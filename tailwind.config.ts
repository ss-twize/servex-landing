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
          card: "#0E1C1F",
          border: "#1E4A46",
          cream: "#F0F6F6",
          accent: "#01DE82",
          "accent-hover": "#00C472",
          muted: "#8EAFAD",
          subtle: "#3D6662",
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
