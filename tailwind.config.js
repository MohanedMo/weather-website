

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}",
],
  theme: {
    extend: {
      animation: {
        'l1': 'l1 1s linear infinite alternate',
      },
      keyframes: {
        l1: {
          'to': { opacity: '0' },
        }
    },
  },
  plugins: [],
}
}
