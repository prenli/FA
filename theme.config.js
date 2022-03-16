const colors = require("tailwindcss/colors");

const primaryColor = "blue";

const toTailwindColor = (color) => {
  if (typeof color === "string") {
    return colors[color.toLowerCase()];
  }
  return color;
};

module.exports = {
  primaryColor: toTailwindColor(primaryColor),
};
