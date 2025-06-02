/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      colors: {
        primary: {
          DEFAULT: '#00A79D',
          light: '#4DBDB5',
          dark: '#006B65',
        },
        secondary: {
          DEFAULT: '#2B3990',
          light: '#5561B9',
          dark: '#1A236B',
        },
        medical: {
          highlight: '#E3F2FD',
          success: '#4CAF50',
          warning: '#FFC107',
          danger: '#FF5252',
        }
      },
      boxShadow: {
        'soft': '0 2px 15px rgba(0, 167, 157, 0.08)',
        'medium': '0 4px 20px rgba(0, 167, 157, 0.12)',
        'strong': '0 8px 30px rgba(0, 167, 157, 0.15)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-medical': 'linear-gradient(135deg, #00A79D 0%, #2B3990 100%)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
      },
    },
  },
  plugins: [],
}