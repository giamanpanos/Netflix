/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        "sharp-sans": ["Sharp Sans", "sans-serif"],
      },
      backgroundColor: {
        "custom-dark": "#141414",
      },
      screens: {
        // We created the below brealpoints because in i-pads there was a big space between the Hero section and the carousels
        "i-pad": { raw: "(min-height: 1000px) and (max-height: 1300px)" },
        "i-pad-mini": { raw: "(min-height: 900px) and (max-height: 1000px)" },
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        ".scrollbar-none": {
          "scrollbar-width": "none",
        },
        "scrollbar-hide::-webkit-scrollbar": {
          display: "none",
        },
      });
    },
  ],
};
