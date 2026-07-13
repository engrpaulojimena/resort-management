/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // "Tide" — deep volcanic-sea teal. Replaces the generic bright-cyan
        // resort blue with something moodier and closer to Zambales' actual
        // dusk-colored coastline.
        ocean: {
          50:  '#EEF6F4',
          100: '#D3E7E2',
          200: '#A7CFC5',
          300: '#79B3A5',
          400: '#4F9587',
          500: '#2F7A6C',
          600: '#246058',
          700: '#1D4C46',
          800: '#183D38',
          900: '#12302C',
        },
        // "Ember" — warm lantern-glow amber, the color of the string lights
        // strung between the A-frame villas at night. Replaces flat "sand gold".
        sand: {
          50:  '#FDF6E9',
          100: '#FAEACB',
          200: '#F5D89C',
          300: '#EFC066',
          400: '#E7A93D',
          500: '#DB8F23',
          600: '#B8721A',
          700: '#8F5714',
          800: '#6E4310',
          900: '#4F300B',
        },
        // "Moss" — muted tropical foliage green, earthier than a neon success-green.
        palm: {
          50:  '#EFF5EC',
          200: '#C6DBBB',
          400: '#8FB87A',
          500: '#6B9C55',
          600: '#537B42',
        },
        // "Clay" — the rust-terracotta of Zambales' lahar soil, used sparingly
        // as an alert/secondary accent instead of a stock bright coral-red.
        coral: {
          400: '#D68257',
          500: '#C1602F',
          600: '#9C4A22',
        },
        // "Basalt" — warm near-black volcanic-rock ink, for dark sections,
        // footer, and body copy. Warmer than a neutral gray-900.
        ink: {
          50:  '#F5F2ED',
          100: '#E7E1D6',
          200: '#CFC5B5',
          400: '#8B8071',
          600: '#4A4136',
          800: '#2A241D',
          900: '#1E1914',
        },
        // "Ash paper" — warm light background, deliberately grayer than a
        // cream/off-white so it reads as sand-and-stone, not bakery packaging.
        paper: {
          DEFAULT: '#EDE6D8',
          light: '#F5F1E7',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        body: ['var(--font-body)', 'system-ui', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'fadeIn': 'fadeIn 0.5s ease-out both',
        'lantern-glow': 'lanternGlow 3.2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        lanternGlow: {
          '0%, 100%': { opacity: '0.55', filter: 'brightness(1)' },
          '50%': { opacity: '1', filter: 'brightness(1.35)' },
        },
      },
    },
  },
  plugins: [],
}
