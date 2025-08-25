/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // 👈 important
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // 👈 make sure these are correct
  ],
  theme: {
    extend: {
      fontFamilty: {
        poppins: ['Poppins', 'sans-serif']
      }
    },
  },
  plugins: [],
}
