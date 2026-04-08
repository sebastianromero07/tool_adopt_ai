import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "tertiary-container": "#d0a600",
        "on-tertiary-container": "#4f3e00",
        "on-secondary-container": "#586378",
        "on-primary-fixed": "#001d32",
        "on-primary-container": "#fdfcff",
        "tertiary": "#745b00",
        "error": "#ba1a1a",
        "inverse-primary": "#95ccff",
        "on-secondary-fixed-variant": "#3c475b",
        "error-container": "#ffdad6",
        "secondary-fixed": "#d7e3fc",
        "on-tertiary": "#ffffff",
        "on-background": "#191c1e",
        "primary-fixed-dim": "#95ccff",
        "outline-variant": "#bfc7d2",
        "surface-tint": "#006399",
        "surface-container-highest": "#e0e3e5",
        "surface-bright": "#f7f9fb",
        "on-primary-fixed-variant": "#004a75",
        "surface": "#f7f9fb",
        "primary-fixed": "#cde5ff",
        "primary-container": "#007abc",
        "surface-container-high": "#e6e8ea",
        "surface-container-low": "#f2f4f6",
        "surface-variant": "#e0e3e5",
        "surface-dim": "#d8dadc",
        "tertiary-fixed": "#ffe08a",
        "on-tertiary-fixed-variant": "#574400",
        "on-secondary-fixed": "#101c2e",
        "secondary": "#535f74",
        "on-tertiary-fixed": "#241a00",
        "background": "#f7f9fb",
        "primary": "#006196",
        "on-surface": "#191c1e",
        "surface-container-lowest": "#ffffff",
        "on-primary": "#ffffff",
        "surface-container": "#eceef0",
        "inverse-surface": "#2d3133",
        "outline": "#707881",
        "secondary-fixed-dim": "#bbc7df",
        "inverse-on-surface": "#eff1f3",
        "secondary-container": "#d4e0f9",
        "on-secondary": "#ffffff",
        "on-surface-variant": "#404850",
        "on-error": "#ffffff",
        "tertiary-fixed-dim": "#f0c116",
        "on-error-container": "#93000a"
      },
      fontFamily: {
        headline: ["Manrope", "sans-serif"],
        body: ["Inter", "sans-serif"],
        label: ["Inter", "sans-serif"]
      }
    },
  },
  plugins: [],
};

export default config;