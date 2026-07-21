/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50:  '#f9f0ff',
          100: '#f1deff',
          200: '#e4c0fe',
          300: '#cc91fc',
          400: '#b966f5',
          500: '#a64bdf',   // Primary Purple
          600: '#9333c8',
          700: '#7a22a8',
          800: '#631988',
          900: '#4e1468',
        },
        lavender: {
          50:  '#f7f2fd',
          100: '#ede4fa',
          200: '#dccbf6',
          300: '#c8a9ef',
          400: '#b289d5',   // Secondary Lavender
          500: '#9e6ec0',
          600: '#8a58aa',
          700: '#724591',
          800: '#5c3676',
          900: '#48295c',
        },
        plum: '#1E1225',
        offwhite: '#FAF7FC',
      },
      fontFamily: {
        sans: ['Sora', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(135deg, #A64BDF 0%, #B289D5 100%)',
        'brand-gradient-dark': 'linear-gradient(135deg, #7a22a8 0%, #9333c8 100%)',
        'hero-mesh': 'radial-gradient(ellipse at 20% 50%, rgba(166,75,223,0.15) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(178,137,213,0.15) 0%, transparent 60%)',
      },
      boxShadow: {
        'glow':      '0 0 30px rgba(166,75,223,0.25)',
        'glow-sm':   '0 0 15px rgba(166,75,223,0.15)',
        'card':      '0 4px 24px rgba(30,18,37,0.08)',
        'card-hover':'0 8px 40px rgba(166,75,223,0.2)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4,0,0.6,1) infinite',
        'fade-in-down': 'fadeInDown 0.35s ease both',
        'marquee': 'marquee 25s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-12px)' },
        },
        fadeInDown: {
          '0%':   { opacity: '0', transform: 'translate(-50%, -16px)' },
          '100%': { opacity: '1', transform: 'translate(-50%, 0)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
      },
    },
  },
  plugins: [],
}
