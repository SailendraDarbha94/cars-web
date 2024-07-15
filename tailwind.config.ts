import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      pLight: ["pLight", "sans-serif"],
      pMedium: ["pMedium", "sans-serif"],
      pBold: ["pBold", "sans-serif"],
      pSemiBold: ["pSemiBold", "sans-serif"],
      pExtraBold: ["pExtraBold", "sans-serif"]
    },
    extend: {
      colors: {
        primary: "#2560FF",
        primaryMore: "#174CDD",
        secondary: "#20D3FA",
        navbar: "#20D3FA"
      },
    },
  },
  plugins: [],
};
export default config;
