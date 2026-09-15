import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#10171A",
        paper: "#F2F4F3",
        jade: {
          DEFAULT: "#1C9C8E",
          dark: "#157A70",
          light: "#4FC1B3",
        },
        amber: {
          DEFAULT: "#E8A33D",
        },
        brass: {
          DEFAULT: "#C08A2E",
          light: "#D4A84B",
          dark: "#A0722A",
          100: "#F3E7CE",
        },
        teal: {
          DEFAULT: "#0E7C7B",
          600: "#0A6362",
          100: "#D8ECEB",
        },
        surface: "#FFFFFF",
        mute: "#6B7F88",
        ok: "#1E7A4B",
        warn: "#B45309",
        stop: "#A32C2C",
        hairline: "#C4CDCB",
        text: {
          primary: "#12181A",
          onDark: "#EDF2F1",
          muted: "#5B6668",
        },
        line: "#DDE3E1",
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      borderRadius: {
        sm: "4px",
        md: "8px",
        lg: "14px",
        xl: "20px",
        slot: "4px",
        field: "8px",
        card: "14px",
        sheet: "20px",
      },
      maxWidth: {
        prose: "70ch",
      },
      boxShadow: {
        card: "0 1px 3px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.06)",
        "card-hover": "0 4px 12px rgba(0,0,0,0.08), 0 2px 4px rgba(0,0,0,0.04)",
        floating: "0 8px 30px rgba(0,0,0,0.12)",
        glow: "0 0 20px rgba(28,156,142,0.15)",
        raise: "0 1px 2px rgba(11,31,42,0.08)",
        float: "0 8px 24px -8px rgba(11,31,42,0.18)",
      },
      transitionTimingFunction: {
        spring: "cubic-bezier(0.34, 1.56, 0.64, 1)",
        smooth: "cubic-bezier(0.4, 0, 0.2, 1)",
        meridian: "cubic-bezier(0.2, 0.8, 0.2, 1)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [],
};

export default config;
