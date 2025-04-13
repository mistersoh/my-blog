/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '100%',
          },
        },
      },
      fontSize: {
        h1: ['2rem', '3rem'],
        h2: ['1.8rem', '2.7rem'],
        h3: ['1.6rem', '2.4rem'],
        h4: ['1.4rem', '2.1rem'],
        h5: ['1.2rem', '1.8rem'],
        h6: ['1.1rem', '1.65rem'],
        b1: ['1rem', '1.6rem'],
        b2: ['0.9rem', '1.44rem'],
      },
      spacing: {
        'global-navigation': '56px',
        'body-mt': '76px',
        'container': '1200px',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('tailwindcss-view-transitions'),
  ],
} 