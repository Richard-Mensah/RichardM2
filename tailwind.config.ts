import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // CFI "Navy + Teal" system — mirror of the @theme tokens in globals.css
        // (Tailwind v4 reads @theme; this keeps the legacy config in sync).
        navy: {
          950: '#0A1A30',
          900: '#122A4E',
          800: '#1B3A66',
          700: '#264B82',
        },
        accent: {
          DEFAULT: '#2BA8B4',
          strong: '#1E8A95',
          soft: '#7FD6D2',
          tint: '#E6F5F5',
          // legacy aliases re-pointed to teal
          cyan: '#3BC4C9',
          'cyan-light': '#7FD6D2',
          'blue-dark': '#155E66',
        },
        // CFI red brand + legacy brand-* aliases (re-pointed to teal) in one object
        brand: {
          DEFAULT: '#DA1E3C',
          strong: '#B81733',
          tint: '#FBE7EB',
          primary: '#2BA8B4',
          'primary-light': '#3BC4C9',
          'primary-lighter': '#7FD6D2',
          'primary-dark': '#1E8A95',
          'primary-darker': '#176E78',
          'primary-accent': '#2BA8B4',
        },
        'brand-spark': '#DA1E3C',
        surface: {
          DEFAULT: '#F4F7FA',
          card: '#FFFFFF',
          muted: '#EEF3F7',
        },
        ink: '#16273B',
        body: '#5A6B7D',
        'on-dark': '#E8EEF4',
        'on-dark-muted': '#9FB0C2',
        line: '#E2E8F0',
        up: { DEFAULT: '#16A34A', tint: '#E9F7EF' },
        down: { DEFAULT: '#E5484D', tint: '#FDECEC' },
        sdg: {
          footer: '#0B1B2D',
          'climate': '#3F7E44',
          'data-science': '#0A97D9',
          'community': '#FCC30B',
          'open-source': '#FD6925',
          'portfolio': '#A21942',
        },
      },
    },
  },
  plugins: [],
};

export default config;
