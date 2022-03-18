const colors = require("tailwindcss/colors");
const plugin = require("tailwindcss/plugin");
const theme = require("./theme.config.js");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/contact.html"],
  safelist: [
    "md:grid-cols-1",
    "md:grid-cols-2",
    "md:grid-cols-3",
    "md:grid-cols-4",
    "md:grid-cols-5",
    "md:grid-cols-6",
    "md:grid-cols-7",
  ],
  theme: {
    extend: {
      colors: {
        primary: theme.primaryColor || colors.blue,
      },
      fontSize: {
        xs: ["0.75rem", "150%"],
        sm: ["0.875rem", "150%"],
        base: ["1rem", "150%"],
        lg: ["1.125rem", "150%"],
        xl: ["1.125rem", "150%"],
        "2xl": ["1.5rem", "150%"],
        "3xl": ["1.875rem", "150%"],
      },
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "system-ui",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "Noto Sans",
          "sans-serif",
          "Apple Color Emoji",
          "Segoe UI Emoji",
          "Segoe UI Symbol",
          "Noto Color Emoji",
        ],
        body: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "system-ui",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "Noto Sans",
          "sans-serif",
          "Apple Color Emoji",
          "Segoe UI Emoji",
          "Segoe UI Symbol",
          "Noto Color Emoji",
        ],
        mono: [
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "Monaco",
          "Consolas",
          "Liberation Mono",
          "Courier New",
          "monospace",
        ],
      },
      transitionProperty: {
        width: "width",
      },
      textDecoration: ["active"],
    },
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
    require("flowbite/plugin"),
  ],
};
