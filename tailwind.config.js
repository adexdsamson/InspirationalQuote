/** @type {import('tailwindcss').Config} */
// tailwind.config.js

module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./<custom directory>/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#C38370",
        secondary: "#A45C40",
        accent: "#F6EEE0",
      },
      fontSize: {
        header: "",
        title: "",
        body: "",
        caption: "",
      },
    },
  },
  plugins: [],
};
