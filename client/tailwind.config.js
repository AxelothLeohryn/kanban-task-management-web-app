/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [require("rippleui")],

  /** @type {import('rippleui').Config} */
  rippleui: {
    themes: [
      {
        themeName: "light",
        colorScheme: "light",
        colors: {
          main: "#635fc7",
          mainHover: "#a8a4ff",
          red: "#ea5555",
          redHover: "#ff9898",
          content1: "000112",
          content2: "#828fa3",
          lines: "#e4ebfa",
          backgroundPrimary: "#f4f7fd",
          backgroundSecondary: "#ffffff",
          
          
        },
      },
      {
        themeName: "dark",
        colorScheme: "dark",
        colors: {
          main: "#635fc7",
          mainHover: "#a8a4ff",
          red: "#ea5555",
          redHover: "#ff9898",
          content1: "#ffffff",
          content2: "#828fa3",
          lines: "#3e3f4e",
          backgroundPrimary: "#20212c",
          backgroundSecondary: "#2b2c37",
        },
      },
    ],
  },
};
