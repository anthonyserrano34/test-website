import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        galano: ['var(--font-galano)', 'sans-serif'],
      },
      colors: {
        primary: "#00FF88",
        secondary: "#0f1713",
        background: "var(--background)",
        foreground: "var(--foreground)",
        accent: "var(--accent)",
        surface: "var(--surface)",
        "surface-muted": "var(--surface-muted)",
      },
      animation: {
        marquee: 'marquee var(--duration, 30s) linear infinite',
        'marquee-reverse': 'marquee-reverse var(--duration, 30s) linear infinite',
        "border-beam": "border-beam calc(var(--duration)*1s) infinite linear",
      },
      keyframes: {
        marquee: {
          from: { transform: 'translateX(0%)' },
          to: { transform: 'translateX(-33.333333%)' }
        },
        'marquee-reverse': {
          from: { transform: 'translateX(-33.333333%)' },
          to: { transform: 'translateX(0%)' }
        },
        "border-beam": {
          "100%": {
            "offset-distance": "100%",
          },
        },
      }
    },
  },
  plugins: [],
};
export default config;
