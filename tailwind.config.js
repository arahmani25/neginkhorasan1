/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx}', './components/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        forest: { DEFAULT: '#163E40', deep: '#0C292D', mid: '#245356', soft: '#3F756C', mist: '#EDF0E8' },
        sand: { DEFAULT: '#FBE5CD', dark: '#E9BE96' },
        amber: { DEFAULT: '#F28B45', light: '#FFD5B0', dark: '#91451D' },
        cream: '#FFF5E9',
        ink: '#233F3E'
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
