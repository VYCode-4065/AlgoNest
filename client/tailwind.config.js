/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // 👈 allows toggling with "dark" class
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
