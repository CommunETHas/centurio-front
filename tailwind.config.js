const colors = require('tailwindcss/colors');
const formsPlugin = require('@tailwindcss/forms');

module.exports = {
  mode: 'jit',
  purge: ['index.html', 'src/**/*.tsx'],
  darkMode: 'media',
  plugins: [formsPlugin],
  theme: {
    colors: {
      base: '#1EAB89',
      gray: colors.coolGray,
      blue: colors.lightBlue,
      red: colors.rose,
      pink: colors.fuchsia,
      white: '#FFFFFF',
      primary: '#20252E',
      secondary: '#20252E',
      ternary: '#BE7E7E',
    },
    fontFamily: {
      sans: ['Graphik', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
    },
    extend: {
      backgroundColor: (theme) => ({
        ...theme('colors'),
        primary: '#20252E',
        secondary: '#FFFFFF',
        ternary: '#BE7E7E',
      }),
      colors: {
        white: '#FFFFFF',
        primary: '#20252E',
        secondary: '#20252E',
        ternary: '#BE7E7E',
      },
      textColor: {
        primary: '#FFFFFF',
        secondary: '#20252E',
        ternary: '#BE7E7E',
        comment: '#A5A5A5',
      },
      fontSize: {
        'title-home': [
          '2.5rem',
          {
            lineHeight: '3.5rem',
          },
        ],
        'button-text': '2.5rem',
      },
      spacing: {
        128: '32rem',
        144: '36rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      ringOffsetWidth: {
        18: '18px',
      },
      height: {
        divbg: '70rem',
        divbg2: '100rem',
        'button-started': '4rem',
      },
      width: {
        divbg: '70rem',
        title: '26rem',
        'button-started': '26rem',
      },
      translate: {
        90: '-20rem',
        100: '-30rem',
      },
      rotate: {
        60: '-60deg',
      },
      gap: {
        11: '2.75rem',
        13: '3.25rem',
      },
    },
  },
};
