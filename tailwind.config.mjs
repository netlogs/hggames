/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#FF4D4D',
          dark: '#CC3D3D'
        },
        secondary: {
          DEFAULT: '#1A1A1A',
          light: '#2A2A2A'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Orbitron', 'sans-serif']
      }
    },
  },
  plugins: [],
}