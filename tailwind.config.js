/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#f3eded",
        background: "#7c7c7c",
        secondary: "#1ebea5",
        backgroundSecondary: "#273443",
      },
      fonts: {
        $fontType: "Arial, Helvetica, sans-serif",
      },
      breakpoints: {
        $sm: "640px",
        $md: "641px",
        $lg: "769px",
        $xl: "1025px",
      },
    },
  },
  plugins: [],
};
