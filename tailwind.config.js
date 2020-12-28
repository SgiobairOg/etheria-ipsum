// Color scheme adapted from http://www.mattshanks.com.au/colour-palette-reference-she-ra-and-the-princesses-of-power/

module.exports = {
  darkMode: 'media',
  theme: {
    colors: {
      transparent: 'transparent',
      purple: {
        DEFAULT: 'rgb(170, 105, 147)',
        darker: 'rgb(88, 40, 60)',
        darkest: 'rgb(55, 32, 43)',
      },
      orange: {
        DEFAULT: 'rgb(226, 141, 115)',
        darkest: 'rgb(216, 123, 104)',
      },
      rose: 'rgb(228, 32, 90)',
      base: 'rgb(237, 215, 215)',
    },
    extend: {
      gridTemplateRows: {
       'layout': 'minmax(150px, min-content) 1fr 100px',
      }
    },
    fontFamily: {
      'sans': ['ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'Noto Sans', 'sans-serif', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'],
      'title': ['Shera']

    }
  },
  plugins: [
    require('@tailwindcss/custom-forms'),
  ]
}
