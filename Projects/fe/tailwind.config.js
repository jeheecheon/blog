/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        'hide-sidebar-overlay': {
          '0%': { opacity: '1', right: '0%' },
          '100%': { opacity: '0', right: '100%'}
        },
        'show-sidebar-overlay': {
          '0%': { opacity: '0', right: '100%' },
          '100%': { opacity: '1', right: '0%'}
        },

        'hide-sidebar-content1': {
          '0%': { translate: '0 0', transform: 'rotate(0)' },
          '100%': { translate: '-100vw 100vh', transform: 'rotate(-45deg)'}
        },
        'show-sidebar-content1': {
          '0%': { translate: '-100vw 100vh', transform: 'rotate(-45deg)' },
          '100%': { translate: '0 0', transform: 'rotate(0)'}
        },
        'hide-sidebar-content2': {
          '0%': { translate: '0 0', transform: 'rotate(0)' },
          '100%': { translate: '-100vw 100vh', transform: 'rotate(-45deg)'}
        },
        'show-sidebar-content2': {
          '0%': { translate: '-100vw 100vh', transform: 'rotate(-45deg)' },
          '100%': { translate: '0 0', transform: 'rotate(0)'}
        },
        'hide-sidebar-content3': {
          '0%': { translate: '0 0', transform: 'rotate(0)' },
          '100%': { translate: '-100vw 100vh', transform: 'rotate(-45deg)'}
        },
        'show-sidebar-content3': {
          '0%': { translate: '-100vw 100vh', transform: 'rotate(-45deg)' },
          '100%': { translate: '0 0', transform: 'rotate(0)'}
        },
      },
    },
    animation: {
      'hide-sidebar-overlay': 'hide-sidebar-overlay 3s ease-in-out forwards',
      'show-sidebar-overlay': 'show-sidebar-overlay 3s ease-in-out forwards',

      'hide-sidebar-content1': 'hide-sidebar-content1 1.3s ease-in-out forwards',
      'show-sidebar-content1': 'show-sidebar-content1 1.3s ease-in-out forwards',
      'hide-sidebar-content2': 'hide-sidebar-content2 1.6s ease-in-out forwards',
      'show-sidebar-content2': 'show-sidebar-content2 1.6s ease-in-out forwards',
      'hide-sidebar-content3': 'hide-sidebar-content3 1.9s ease-in-out forwards',
      'show-sidebar-content3': 'show-sidebar-content3 1.9s ease-in-out forwards',
    }
  },
  plugins: [],
  darkMode: 'class'
}
