import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#080b11",
        card: "#0d121d",
        "card-alt": "#121927",
        surface: "#161f31",
        gold: {
          DEFAULT: "#f59e0b",
          bright: "#fbbf24",
          border: "rgba(234, 179, 8, 0.55)",
          glow: "rgba(234, 179, 8, 0.28)",
          muted: "rgba(234, 179, 8, 0.15)",
        },
        muted: "#94a3b8",
        dim: "#64748b",
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Cinzel", "serif"],
        sans: ["var(--font-sans)", "Inter", "sans-serif"],
        mono: ["var(--font-mono)", "JetBrains Mono", "monospace"],
      },
      boxShadow: {
        gold: "0 0 25px rgba(245, 158, 11, 0.25)",
        "gold-lg": "0 0 45px rgba(245, 158, 11, 0.35)",
        card: "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
      },
      backgroundImage: {
        "gold-gradient": "linear-gradient(135deg, #fbbf24 0%, #d97706 100%)",
        "card-gradient": "linear-gradient(180deg, rgba(18, 25, 39, 0.7) 0%, rgba(13, 18, 29, 0.9) 100%)",
      },
    },
  },
  plugins: [],
};
export default config;
