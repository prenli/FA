const { createProxyMiddleware } = require("http-proxy-middleware");

const PROXY = process.env.REACT_APP_API_URL;

module.exports = function (app) {
  app.use(
    "/graphql",
    createProxyMiddleware({
      target: PROXY,
      changeOrigin: true,
    })
  );
  app.use(
    "/flowable/graphql",
    createProxyMiddleware({
      target: PROXY,
      changeOrigin: true,
    })
  );
};
