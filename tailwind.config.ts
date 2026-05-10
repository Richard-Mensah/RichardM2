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
        brand: {
          primary: '#0077FF',
          'primary-light': '#00A6FF',
          'primary-lighter': '#02D1FF',
          'primary-dark': '#006DE5',
          'primary-darker': '#006FA6',
          'primary-accent': '#009EDB',
        },
        accent: {
          cyan: '#26BDE2',
          'cyan-light': '#62E8FF',
          'blue-dark': '#00689D',
        },
        sdg: {
          footer: '#021B4D',
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
