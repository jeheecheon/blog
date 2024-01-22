/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
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
      'show-sidebar-overlay': 'show-sidebar-overlay 2s ease-in-out forwards',
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
  darkMode: 'class'
}
