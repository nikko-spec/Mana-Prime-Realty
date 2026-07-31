/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,jsx}",
    "./src/components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        banyan: "#16302B",
        "banyan-light": "#20463F",
        capiz: "#F1EAD9",
        cream: "#FBF8F2",
        gold: "#B0873E",
        "gold-light": "#D3AE6A",
        sienna: "#9C4A2C",
        ink: "#1B231F",
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "serif"],
        body: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
    },
  },
  plugins: [],
};
