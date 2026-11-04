/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx,html}'],
  darkMode: 'class',
  theme: { extend: { colors: { territory_mapping_dashboard: { light: '##8b5cf6', dark: '##a78bfa' } } } }
};
