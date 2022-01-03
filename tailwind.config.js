const plugin = require("tailwindcss/plugin");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities({
        ".scroll-hidden::-webkit-scrollbar": {
          display: "none",
        },
        ".scroll-hidden": {
          "-ms-overflow-style": "none",
          "-scrollbar-width": "none",
        },
      });
    }),
  ],
};
