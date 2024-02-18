/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      primary: "#0D1741",
      pDark: "#1e1e1e",
      secondary: "#5BA600",
      pred: "#f84d42",
      dark: "#0f0f0f",
      darkLight: "#343434",
      light: "#f9f9f9",
    },
  },
  plugins: [require("flowbite/plugin")],
};
