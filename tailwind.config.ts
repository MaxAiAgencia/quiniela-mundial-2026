import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
    },
    extend: {
      colors: {
        // Paleta FIFA World Cup 2026
        'fifa-navy':  '#0D1B2A',
        'fifa-red':   '#C41230',
        'fifa-gold':  '#C9A84C',
        'fifa-white': '#F5F5F5',
        'fifa-blue':  '#00A8E8',
        // Variantes de la paleta
        'navy': {
          DEFAULT:  '#0D1B2A',
          light:    '#1a2e42',
          dark:     '#070f17',
        },
        'brand-red': {
          DEFAULT:  '#C41230',
          light:    '#e0193f',
          dark:     '#8e0d23',
        },
        'gold': {
          DEFAULT:  '#C9A84C',
          light:    '#dfc06d',
          dark:     '#9a8038',
        },
        // shadcn/ui tokens mapeados a la paleta FIFA
        border:      'hsl(var(--border))',
        input:       'hsl(var(--input))',
        ring:        'hsl(var(--ring))',
        background:  'hsl(var(--background))',
        foreground:  'hsl(var(--foreground))',
        primary: {
          DEFAULT:     'hsl(var(--primary))',
          foreground:  'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT:     'hsl(var(--secondary))',
          foreground:  'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT:     'hsl(var(--destructive))',
          foreground:  'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT:     'hsl(var(--muted))',
          foreground:  'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT:     'hsl(var(--accent))',
          foreground:  'hsl(var(--accent-foreground))',
        },
        card: {
          DEFAULT:     'hsl(var(--card))',
          foreground:  'hsl(var(--card-foreground))',
        },
      },
      fontFamily: {
        sans:    ['DM Sans', 'sans-serif'],
        display: ['Bebas Neue', 'sans-serif'],
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        pulse_red: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(196, 18, 48, 0.7)' },
          '50%':      { boxShadow: '0 0 0 8px rgba(196, 18, 48, 0)' },
        },
        'accordion-down': {
          from: { height: '0' },
          to:   { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to:   { height: '0' },
        },
      },
      animation: {
        'pulse-red':      'pulse_red 1.5s ease-in-out infinite',
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up':   'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [],
}

export default config
