const cracoServiceWorkerConfig = require("./cracoServiceWorkerConfig");

module.exports = {
  plugins: process.env.WITH_SW ? [{ plugin: cracoServiceWorkerConfig }] : [],
};
