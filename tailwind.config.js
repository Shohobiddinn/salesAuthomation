/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./app.vue",
  ],
  theme: {
    extend: {
      colors:{
        bluer:'#057CD1',
        blue:{
          10:'#299B9B',
          20:'#3EA4A4',
          50:'#F4F9F9',
        },

        gray:{
          30:'#E9EBF2',
          40:'#E1E4E4',
          50:'#E9F1F2'
        },
        green:{
          50:'#EAF2E9'
        },
        input:'#FAFDFD'
      },
      width:{
        buttonHeight: '44px',
      },
      fontFamily:{
        inter:['Inter']
      }
    },
    borderRadius: {
      large: "12px",
    },

  },
  plugins: [],
};
