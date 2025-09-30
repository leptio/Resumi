/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',     
  content: ["./**/*.html"], 
  safelist: ['dark:bg-gray-800', 'dark:text-white'],
  theme: {
    extend: {},           
  },
  corePlugins: {},       
  plugins: [],            
};