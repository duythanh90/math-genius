/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
      extend: {
        colors: {
          primary: "#000000",
          secondary: "#111111",
          tertiary: "#222222",
        },
      },
    },
    plugins: [],
  };