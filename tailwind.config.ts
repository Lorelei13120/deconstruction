/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Palette "Cocooning"
        brand: {
          light: '#fff0f5', // Lavender Blush (fond très doux)
          DEFAULT: '#fce7f3', // Rose 100
          dark: '#fbcfe8', // Rose 200
          accent: '#c084fc', // Violet 400 (pour les boutons/actions)
          deep: '#7e22ce', // Violet 700 (texte fort)
          text: '#4c1d95', // Violet 900 (texte principal)
        },
        // Surcharge des couleurs par défaut pour coller à la vibe
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        primary: {
          DEFAULT: '#db2777', // Rose 600
          foreground: '#ffffff',
        },
        secondary: {
          DEFAULT: '#f3e8ff', // Purple 100
          foreground: '#581c87', // Purple 900
        },
        muted: {
          DEFAULT: '#fdf2f8', // Rose 50
          foreground: '#be185d', // Pink 700
        },
        card: {
          DEFAULT: '#ffffff',
          foreground: '#1f2937',
        },
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem', // Coins très arrondis pour le côté doux
      },
      fontFamily: {
        sans: ['Barlow Condensed', 'sans-serif'], // Police compacte et lisible
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}