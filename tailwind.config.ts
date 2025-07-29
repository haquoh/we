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