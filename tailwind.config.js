
    /** @type {import('tailwindcss').Config} */
    module.exports = {
      content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
      ],
      'theme': {
        'extend': {
          'colors': {
            primary: '#ffffff',
            secondary: '#38e5b7'
          ,
        text: "#1f2937"
      },
          'backgroundImage': {
            'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
            'gradient-conic':
              'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
          },
        },
      },
      plugins: [require('tailwindcss-animate')],
    }