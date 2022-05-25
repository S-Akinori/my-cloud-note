module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    {
      pattern: /flex/,
      variants: ['sm', 'md', 'lg', 'xl'],
    },
    {
      pattern: /justify-(start|center|end|between|around)/,
    },
    {
      pattern: /items-(start|center|end|between|around)/,
    },
  ],
  theme: {
    extend: {
      colors: {
        'base': '#FCFCFC',
        'base-color': '#FCFCFC',
        'base-transparent': '#FCFCFC',
        'base-text': '#080D1B',
        'base-cont': '#080D1B',
        'main': '#F73117',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography')
  ],
}