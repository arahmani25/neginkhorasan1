/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx}', './components/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        forest: { DEFAULT: '#0C2B29', deep: '#071E1D', mid: '#12403C', soft: '#1B5A52', mist: '#EAF1EE' },
        sand: { DEFAULT: '#F4EFE4', dark: '#E7DEC9' },
        amber: { DEFAULT: '#D9A441', light: '#EAC06B', dark: '#B98430' },
        cream: '#FBF8F1',
        ink: '#22302E'
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif']
      },
      keyframes: {
        kenburns: {
          '0%': { transform: 'scale(1) translateY(0)' },
          '100%': { transform: 'scale(1.12) translateY(-1.5%)' }
        },
        rise: {
          '0%': { opacity: '0', transform: 'translateY(28px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        fadein: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        }
      },
      animation: {
        kenburns: 'kenburns 8s ease-out forwards',
        rise: 'rise .8s cubic-bezier(.2,.7,.3,1) both',
        fadein: 'fadein 1.2s ease both'
      }
    }
  },
  plugins: []
};
