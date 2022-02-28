// @preval
const resolveConfig = require("tailwindcss/resolveConfig");
const tailwindConfig = require("../tailwind.config.js");
module.exports = resolveConfig(tailwindConfig).theme;
