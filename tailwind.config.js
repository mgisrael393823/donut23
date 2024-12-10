/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        lime: '#CCFF00',
        electric: '#00CFFF',
        cream: '#F2FFBB',
        timberwolf: '#BCBCBC',
        night: '#000000',
        onyx: '#464646',
        'eerie-black': '#1C1C1C',
        background: '#F8FDED',
      },
      fontFamily: {
        sans: ['BentonSans', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
