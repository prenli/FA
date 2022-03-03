import preval from "babel-plugin-preval/macro";

interface TailwindTheme {
  colors: {
    primary: Record<string, string>;
  };
  screens: Record<string, string>;
}

const theme: TailwindTheme = preval`
const resolveConfig = require("tailwindcss/resolveConfig");
const tailwindConfig = require("../tailwind.config.js");
const tailwindTheme = resolveConfig(tailwindConfig).theme;

// to limit bundle size we export only what we need
module.exports = {
  colors: {
    primary: tailwindTheme.colors.primary,
  },
  screens: tailwindTheme.screens,
};
`;

export default theme;
