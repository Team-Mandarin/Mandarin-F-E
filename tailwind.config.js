/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "Default-Font",
          {
            fontWeight: {
              100: "Default-Font-Thin",
              300: "Default-Font-Light",
              400: "Default-Font",
              500: "Default-Font-Medium",
              600: "Default-Font-Medium",
              700: "Default-Font-Bold",
            },
          },
        ],
      },
    },
  },
  plugins: [],
};
