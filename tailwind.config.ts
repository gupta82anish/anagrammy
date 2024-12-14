import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      animation:{
        'slideIn': 'slideIn 0.7s ease-in-out forwards'
      },
      keyframes: {
        slideIn: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(50px)' },
        }
      }
    },
  },
  plugins: [],
} satisfies Config;
