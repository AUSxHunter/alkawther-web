import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: "#C8A96E",
          light: "#DEC99A",
          dark: "#A8873E",
          muted: "#C8A96E33",
        },
        cream: {
          DEFAULT: "#F5F2EE",
          dark: "#EDE8E0",
        },
        charcoal: {
          DEFAULT: "#2A2825",
          light: "#3D3A36",
          dark: "#1A1816",
        },
        "warm-gray": {
          DEFAULT: "#8C8078",
          light: "#B0A89E",
          dark: "#5C5650",
        },
        ink: "#111010",
      },
      fontFamily: {
        display: ["var(--font-cormorant)", "Georgia", "serif"],
        sans: ["var(--font-manrope)", "system-ui", "sans-serif"],
      },
      fontSize: {
        "display-2xl": ["clamp(3rem, 6vw, 5.5rem)", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
        "display-xl": ["clamp(2.25rem, 4.5vw, 4rem)", { lineHeight: "1.1", letterSpacing: "-0.015em" }],
        "display-lg": ["clamp(1.75rem, 3vw, 2.75rem)", { lineHeight: "1.15", letterSpacing: "-0.01em" }],
      },
      spacing: {
        "section": "5rem",
        "section-sm": "3rem",
      },
      boxShadow: {
        "gold": "0 0 0 1px rgba(200, 169, 110, 0.3)",
        "gold-lg": "0 8px 32px rgba(200, 169, 110, 0.15)",
        "card": "0 2px 12px rgba(17, 16, 16, 0.08)",
        "card-hover": "0 8px 32px rgba(17, 16, 16, 0.15)",
      },
      backgroundImage: {
        "gold-gradient": "linear-gradient(135deg, #C8A96E 0%, #A8873E 100%)",
        "dark-gradient": "linear-gradient(180deg, #111010 0%, #2A2825 100%)",
        "cream-gradient": "linear-gradient(180deg, #F5F2EE 0%, #EDE8E0 100%)",
        "hero-overlay": "linear-gradient(to bottom, rgba(17,16,16,0.65) 0%, rgba(17,16,16,0.45) 50%, rgba(17,16,16,0.75) 100%)",
      },
      transitionTimingFunction: {
        "smooth": "cubic-bezier(0.4, 0, 0.2, 1)",
      },
      keyframes: {
        "fade-up": {
          from: { opacity: "0", transform: "translateY(16px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "slide-in-right": {
          from: { transform: "translateX(100%)" },
          to: { transform: "translateX(0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.5s ease forwards",
        "fade-in": "fade-in 0.3s ease forwards",
        "slide-in-right": "slide-in-right 0.35s cubic-bezier(0.4, 0, 0.2, 1) forwards",
      },
    },
  },
  plugins: [],
};

export default config;
