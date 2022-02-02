const path = require("path");
const WorkboxWebpackPlugin = require("workbox-webpack-plugin");

module.exports = {
  overrideWebpackConfig: ({ webpackConfig, context: { env } }) => {
    if (env === "development") {
      return {
        ...webpackConfig,
        plugins: [
          ...webpackConfig.plugins,
          new WorkboxWebpackPlugin.InjectManifest({
            swSrc: path.resolve(__dirname, "src/service-worker.ts"),
            dontCacheBustURLsMatching: /\.[0-9a-f]{8}\./,
            exclude: [/\.map$/, /asset-manifest\.json$/, /LICENSE/],
            maximumFileSizeToCacheInBytes: 5 * 1024 * 1024,
          }),
        ],
      };
    } else {
      return webpackConfig;
    }
    // Always return the config object.
  },
};
