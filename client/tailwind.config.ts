import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./index.html",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        cream: "hsl(48, 29%, 96%)",
        sage: "hsl(84, 8%, 39%)",
        "sage-light": "hsl(84, 8%, 75%)",
        "sage-dark": "hsl(84, 8%, 30%)",
        forest: {
          50: "hsl(120, 20%, 97%)",
          100: "hsl(120, 25%, 90%)",
          200: "hsl(120, 30%, 80%)",
          300: "hsl(120, 35%, 70%)",
          400: "hsl(120, 40%, 60%)",
          500: "hsl(120, 45%, 50%)",
          600: "hsl(120, 50%, 40%)",
          700: "hsl(120, 55%, 30%)",
          800: "hsl(120, 60%, 20%)",
          900: "hsl(120, 65%, 10%)",
        },
        ocean: {
          50: "hsl(200, 30%, 97%)",
          100: "hsl(200, 35%, 90%)",
          200: "hsl(200, 40%, 80%)",
          300: "hsl(200, 45%, 70%)",
          400: "hsl(200, 50%, 60%)",
          500: "hsl(200, 55%, 50%)",
          600: "hsl(200, 60%, 40%)",
          700: "hsl(200, 65%, 30%)",
          800: "hsl(200, 70%, 20%)",
          900: "hsl(200, 75%, 10%)",
        },
        "comic-orange": "hsl(25, 95%, 53%)",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
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
      fontFamily: {
        comic: ["Comic Neue", "cursive"],
        nunito: ["Nunito", "sans-serif"],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;