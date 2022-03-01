// @preval
const resolveConfig = require("tailwindcss/resolveConfig");
const tailwindConfig = require("../tailwind.config.js");
const tailwindTheme = resolveConfig(tailwindConfig).theme;

// to limit bundle size we export only what we need
module.exports = {
  colors: {
    primary: tailwindTheme.colors.primary,
  },
};
