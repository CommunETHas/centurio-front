const formsPlugin = require('@tailwindcss/forms');

module.exports = {
  mode: 'jit',
  purge: ['index.html', 'src/**/*.tsx'],
  darkMode: 'media',
  plugins: [formsPlugin],
  theme: {
    colors: {
      base: '#1EAB89',
      white: '#FFFFFF',
      primary: '#20252E',
      secondary: '#20252E',
      ternary: '#BE7E7E',
      shader: '#797979',
    },
    borderColor: {
      white: '#FFFFFF',
      primary: '#20252E',
      secondary: '#20252E',
      ternary: '#BE7E7E',
    },
    borderRadius: {
      sm: '0.125rem',
      md: '0.375rem',
      lg: '2rem',
      full: '9999px',
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
        secondary: '#FFFFFF',
        ternary: '#BE7E7E',
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
        divider: '0.05rem',
        'button-started': '4rem',
        'shield-logo': '17rem',
        'battle-logo': '25rem',
        'socrate-logo': '25rem',
        logo: '3rem',
        'logo-token': '2.5rem',
      },
      width: {
        divbg: '70rem',
        title: '26rem',
        'button-started': '26rem',
        modal: '30rem',
        para: '30rem',
      },
      translate: {
        3: '0.75rem',
        90: '-20rem',
        100: '-30rem',
        socrate: '-1rem',
      },
      rotate: {
        60: '-60deg',
      },
      gap: {
        11: '2.75rem',
        13: '3.25rem',
      },
      gridTemplateRows: {
        info: 'auto 0fr',
      },
    },
  },
};
