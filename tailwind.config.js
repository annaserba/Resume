import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
          950: '#082f49',
        },
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.gray.800'),
            h2: {
              color: theme('colors.blue.700'),
              fontWeight: '600',
            },
            h3: {
              color: theme('colors.blue.600'),
              fontWeight: '500',
            },
            a: {
              color: theme('colors.blue.600'),
              '&:hover': {
                color: theme('colors.blue.800'),
              },
            },
          },
        },
        dark: {
          css: {
            color: theme('colors.gray.100'),
            h2: {
              color: theme('colors.blue.300'),
              fontWeight: '600',
            },
            h3: {
              color: theme('colors.blue.200'),
              fontWeight: '500',
            },
            a: {
              color: theme('colors.blue.300'),
              '&:hover': {
                color: theme('colors.blue.200'),
              },
            },
          },
        },
      }),
    },
  },
  plugins: [
    typography,
  ],
}
