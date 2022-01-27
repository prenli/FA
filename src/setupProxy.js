const { createProxyMiddleware } = require("http-proxy-middleware");

const PROXY = process.env.API_URL;

module.exports = function (app) {
  app.use(
    "/graphql",
    createProxyMiddleware({
      target: PROXY,
      changeOrigin: true,
    })
  );
};
