import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'pastel-pink': '#FFD6E8',
        'pastel-purple': '#E8D5FF',
        'romantic-gradient': 'linear-gradient(135deg, #FFD6E8 0%, #E8D5FF 100%)',
        'dark-bg': '#1a1a2e',
        'dark-secondary': '#16213e',
        // Enhanced Pink Palette
        'pink': {
          25: '#FEF7F7',
          50: '#FDF2F8',
          100: '#FCE7F3',
          150: '#FBCFE8',
          200: '#F9A8D4',
          250: '#F472B6',
          300: '#EC4899',
          350: '#E879B9',
          400: '#DB2777',
          450: '#C1185C',
          500: '#BE185D',
          600: '#9D174D',
          700: '#831843',
          800: '#6B1D3A',
          900: '#4C1D3B',
        },
        'rose': {
          25: '#FFF7F5',
          50: '#FFF1F2',
          100: '#FFE4E6',
          150: '#FECDD3',
          200: '#FBB6CE',
          250: '#F9A8D4',
          300: '#FB7185',
          350: '#F97389',
          400: '#F43F5E',
          450: '#E53E60',
          500: '#E11D48',
          600: '#BE123C',
          700: '#9F1239',
          800: '#881337',
          900: '#4C0519',
        },
        'romantic': {
          'light': '#FFE4E6',
          'medium': '#FBB6CE',
          'dark': '#E11D48',
          'purple': '#E8D5FF',
          'lavender': '#DDA0DD',
        }
      },
      fontFamily: {
        'noto-serif': ['Noto Serif KR', 'serif'],
      },
      animation: {
        'heart-beat': 'heartBeat 1.5s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
        'petal-fall': 'petalFall 10s linear infinite',
        'twinkle': 'twinkle 3s ease-in-out infinite',
      },
      keyframes: {
        heartBeat: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        petalFall: {
          '0%': { transform: 'translateY(-100px) rotate(0deg)', opacity: '1' },
          '100%': { transform: 'translateY(100vh) rotate(360deg)', opacity: '0' },
        },
        twinkle: {
          '0%, 100%': { opacity: '0.3' },
          '50%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
  darkMode: 'class',
}
export default config