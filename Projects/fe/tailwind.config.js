/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'body-dark': 'rgb(24, 24, 27)',

        'default-1': 'rgb(255, 255, 255)',
        'default-2': 'rgb(250, 250, 250)',
        'default-3': 'rgb(245, 245, 245)',
        'default-4': 'rgb(240, 240, 240)',
        'default-5': 'rgb(235, 235, 235)',
        'default-6': 'rgb(230, 230, 230)',
        'default-7': 'rgb(225, 225, 225)',
        'default-8': 'rgb(220, 220, 220)',
        'default-9': 'rgb(215, 215, 215)',
        'default-10': 'rgb(210, 210, 210)',
        'default-11': 'rgb(205, 205, 205)',
        'default-12': 'rgb(200, 200, 200)',
        'default-13': 'rgb(195, 195, 195)',
        'default-14': 'rgb(190, 190, 190)',
        'default-15': 'rgb(185, 185, 185)',
        'default-16': 'rgb(180, 180, 180)',
        'default-17': 'rgb(175, 175, 175)',
        'default-18': 'rgb(170, 170, 170)',


        'default-1-dark': '#121212',
        'default-2-dark': '#171717',
        'default-3-dark': '#1c1c1c',
        'default-4-dark': '#212121',
        'default-5-dark': '#262626',
        'default-6-dark': '#2b2b2b',
        'default-7-dark': '#303030',
        'default-8-dark': '#353535',
        'default-9-dark': '#3a3a3a',
        'default-10-dark': '#3f3f3f',
        'default-11-dark': '#444444',
        'default-12-dark': '#494949',
        'default-13-dark': '#4e4e4e',
        'default-14-dark': '#535353',
        'default-15-dark': '#585858',
        'default-16-dark': '#5d5d5d',
        'default-17-dark': '#626262',
        'default-18-dark': '#676767',

      },
      keyframes: {
        'spin': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' }
        },
        'fade-out': {
          '0%': { opacity: '1' },
          '80%': { opacity: '1' },
          '100%': { opacity: '0' }
        },

        'hide-sidebar-overlay': {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' }
        },
        'show-sidebar-overlay': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },

        'hide-sidebar-content': {
          '0%': { translate: '0 0', transform: 'rotate(0)' },
          '100%': { translate: '-100vw 100vh', transform: 'rotate(-45deg)' }
        },
        'show-sidebar-content': {
          '0%': { translate: '-100vw 100vh', transform: 'rotate(-45deg)' },
          '100%': { translate: '0 0', transform: 'rotate(0)' }
        },
      },
    },
    animation: {
      'spin': 'spin 0.7s ease-in-out infinite',
      'fade-out-spinner': 'fade-out 2s ease-out forwards',

      'hide-sidebar-overlay': 'hide-sidebar-overlay 1s ease-in-out forwards',
      'show-sidebar-overlay': 'show-sidebar-overlay 1s ease-in-out forwards',
      'hide-sidebar-content1': 'hide-sidebar-content 0.7s ease-in-out forwards',
      'show-sidebar-content1': 'show-sidebar-content 0.7s ease-in-out forwards',
      'hide-sidebar-content2': 'hide-sidebar-content 1s ease-in-out forwards',
      'show-sidebar-content2': 'show-sidebar-content 1s ease-in-out forwards',
      'hide-sidebar-content3': 'hide-sidebar-content 1.3s ease-in-out forwards',
      'show-sidebar-content3': 'show-sidebar-content 1.3s ease-in-out forwards',
      'hide-sidebar-content4': 'hide-sidebar-content 1.6s ease-in-out forwards',
      'show-sidebar-content4': 'show-sidebar-content 1.6s ease-in-out forwards',
      'hide-sidebar-content5': 'hide-sidebar-content 1.9s ease-in-out forwards',
      'show-sidebar-content5': 'show-sidebar-content 1.9s ease-in-out forwards',
    }
  },
  plugins: [],
  darkMode: 'selector'
}
