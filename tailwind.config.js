/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          light: "#A7F3D0",
          DEFAULT: "#54bd95",
          dark: "#3da97d",
        },
        secondary: {
          light: "#2b434e",
          DEFAULT: "#081c4e",
          dark: "#161c28",
        },
        gray: {
          light: "#F3F4F6",
          DEFAULT: "#9CA3AF",
          dark: "#111827",
        },
      },
    },
    screens: {
      sm: { max: "567px" },
      md: { min: "568px", max: "823px" },
      lg: { min: "824px", max: "1079px" },
      xl: { min: "1280px" },
    },
  },
  plugins: [],
};
