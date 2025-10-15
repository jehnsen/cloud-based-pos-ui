import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
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
      backgroundImage: {
        "gradient-sari": "linear-gradient(135deg, #FF6B6B 0%, #FF8E53 25%, #FFA600 50%, #FFD93D 75%, #6BCF7F 100%)",
        "gradient-grocery": "linear-gradient(135deg, #4ECDC4 0%, #44A08D 50%, #093637 100%)",
        "gradient-primary": "linear-gradient(135deg, #FF8E53 0%, #FE6B8B 100%)",
        "gradient-accent": "linear-gradient(135deg, #FFD93D 0%, #6BCF7F 100%)",
        "gradient-vibrant": "linear-gradient(135deg, #FF6B6B 0%, #FF8E53 20%, #FFA600 40%, #FFD93D 60%, #6BCF7F 80%, #4ECDC4 100%)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
