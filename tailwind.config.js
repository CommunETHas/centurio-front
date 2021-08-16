const formsPlugin = require('@tailwindcss/forms');

module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'media',
  plugins: [formsPlugin],
  theme: {
    colors: {
      base: '#1EAB89',
      primary: '#20252E',
      secondary: '#FFFFFF',
      secondaryShadow: '#cdcdcd',
      ternary: '#BE7E7E',
      ternaryShadow: '#a06b6b',
      shader: '#797979',
    },
    borderColor: {
      primary: '#20252E',
      secondary: '#FFFFFF',
      ternary: '#BE7E7E',
    },
    fontFamily: {
      sans: ['Graphik', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
    },
    textColor: {
      primary: '#20252E',
      secondary: '#FFFFFF',
      ternary: '#BE7E7E',
      comment: '#A5A5A5',
      negative: '#b91c1c',
      black: '#000000',
    },
    extend: {
      fontSize: {
        '5xl': [
          '2.5rem',
          {
            lineHeight: '3.5rem',
          },
        ],
        '4xl': '2.5rem',
      },
      ringOffsetWidth: {
        18: '18px',
      },
      spacing: {
        0.1: '0.05rem',
        62: '17rem',
        65: '25rem',
        100: '26rem',
        110: '30rem',
        150: '40rem',
        200: '70rem',
        210: '100rem',
      },
      rotate: {
        60: '-60deg',
      },
      gap: {
        13: '3.25rem',
      },
    },
  },
};
