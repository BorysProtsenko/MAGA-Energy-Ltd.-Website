/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-blue': '#003366',
        'brand-gold': '#FFD700',
        'brand-black': '#000000',
        'neon-green': '#39ff14',
        'neon-blue': '#00ffff',
        'neon-yellow': '#faff00',
      },
    },
  },
  plugins: [],
};
