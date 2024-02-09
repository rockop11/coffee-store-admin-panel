import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      white: "#ffffff",
      black: "#000000",
      gray: "#6b7280",
      green: "#22c55e",
      darkGrenn: "#166534",
      blue: "#0ea5e9",
      blueHover: "#2563eb",
      darkBlue: "#1e40af",
      red: "#ef4444",
      darkRed: "#991b1b",
      yellow: "#eab308",
      darkYellow: "#a16207"
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;