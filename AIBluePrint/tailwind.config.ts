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
        brand: {
          50: "#f3f0ff",
          100: "#ede8fd",
          200: "#d4c8fc",
          300: "#b49dfa",
          400: "#9171f5",
          500: "#6c3cef",
          600: "#5a28d6",
          700: "#4a1fb3",
          800: "#3d1a93",
          900: "#331678",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
