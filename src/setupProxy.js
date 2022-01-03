const { createProxyMiddleware } = require("http-proxy-middleware");

const PROXY = "https://fadev.fasolutions.com";

module.exports = function (app) {
  app.use(
    "/graphql",
    createProxyMiddleware({
      target: PROXY,
      changeOrigin: true,
    })
  );
};
