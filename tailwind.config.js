/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        mitr: ["Mitr", "sans-serif"],
      },
      colors: {
        sk: {
          bg: "#0f172a", // slate-900
          panel: "#1e293b", // slate-800
          sky: "#38bdf8", // sky-400
          gold: "#facc15", // yellow-400
          magic: "#a855f7", // purple-500
          danger: "#fb7185", // rose-400
        },
      },
    },
  },
  plugins: [],
};
