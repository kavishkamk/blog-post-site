/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'wild-sand': '#F7F7F7',
        'mercury': '#E2E2E2',
        'pgray': '#ccc',
        'dustygray': '#979797',
        'mine-shaft': '#282828',
      },
    },
  },
  plugins: [],
}