/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "node_modules/flowbite-react/lib/esm/**/*.js"
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        anxpurple: {
          100: "#C5B8DA",
          300: "#AA99C4",
          500: "#8B80AB",
          700: "#70568B",
        },
        anxblue: {
          100: "#8EA6DB",
          300: "#445C93",
          500: "#4B6180",
          700: "#2D3D57",
        },
        anxgreen: {
          300: "#A5C7A3",
        },
        anxred: {
          300: "#F56180",
        },
        anxyellow: {
          300: "#F2E141",
        },
        anxorange: {
          300: "#FD9D45",
        },
        anxwhite: {
          300: "#F5F5F5",
        },
      },
      fontFamily: {
        montserrat: ["Montserrat"],
      },
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}
