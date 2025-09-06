/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html", "./src/**/*.{html,js}"],
  darkMode: 'class',
  theme: {
    extend: {
      boxShadow: {
        'neumorph-light': '8px 8px 15px #a3b1c6, -8px -8px 15px #ffffff',
        'neumorph-dark': '8px 8px 15px #1a1a1a, -8px -8px 15px #333333',
      },
      animation: {
        fadeIn: 'fadeIn 0.8s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};
