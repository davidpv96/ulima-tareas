/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'soft-blue': '#AEE0F6',
        'pastel-lilac': '#E9C8F3',
        'soft-orange': '#FFD9A0',
        'light-green': '#C7F1C4',
        'soft-pink': '#FBC9CC',
        'cream': '#FFF9F3',
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
