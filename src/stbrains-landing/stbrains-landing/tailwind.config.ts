import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        crimson: {
          DEFAULT: '#DA3743',
          deep:    '#B82030',
          light:   '#F04455',
          soft:    '#FFF0F1',
          muted:   '#FDDCE0',
        },
        navy: {
          DEFAULT: '#0B1220',
          mid:     '#1B3B6F',
          light:   '#2D5AA0',
          soft:    '#EEF3FB',
        },
        gold: {
          DEFAULT: '#C9A257',
          light:   '#E5C580',
          muted:   '#FBF4E4',
        },
        ink: {
          DEFAULT: '#0D0C0A',
          '2':     '#3A3632',
          '3':     '#7A756F',
          '4':     '#B5B0AA',
        },
        canvas: {
          DEFAULT: '#F8F6F2',
          white:   '#FFFFFF',
          border:  '#E6E2DC',
        },
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        sans:    ['"Jost"', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        '2xs': ['0.65rem', { lineHeight: '1rem' }],
      },
      borderRadius: {
        none: '0',
        sm:   '3px',
        DEFAULT: '6px',
        md:   '8px',
        lg:   '12px',
        xl:   '16px',
        '2xl':'24px',
        full: '9999px',
      },
      boxShadow: { none: 'none' },
      animation: {
        'fade-up':    'fadeUp 0.6s ease-out both',
        'fade-in':    'fadeIn 0.4s ease-out both',
        'slide-left': 'slideLeft 0.4s ease-out both',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4,0,0.6,1) infinite',
      },
      keyframes: {
        fadeUp:    { from: { opacity: '0', transform: 'translateY(24px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        fadeIn:    { from: { opacity: '0' }, to: { opacity: '1' } },
        slideLeft: { from: { opacity: '0', transform: 'translateX(24px)' }, to: { opacity: '1', transform: 'translateX(0)' } },
      },
      backgroundImage: {
        'hero-grad': 'linear-gradient(135deg, rgba(11,18,32,0.92) 0%, rgba(27,59,111,0.75) 50%, rgba(218,55,67,0.30) 100%)',
        'navy-grad': 'linear-gradient(160deg, #0B1220 0%, #1B3B6F 100%)',
        'red-grad':  'linear-gradient(135deg, #DA3743 0%, #B82030 100%)',
        'glass':     'linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.04) 100%)',
      },
    },
  },
  plugins: [],
}
export default config
