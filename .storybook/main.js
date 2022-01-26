module.exports = {
  stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/preset-create-react-app",
    "storybook-react-i18next",
  ],
  framework: "@storybook/react",
  core: {
    builder: "webpack5",
  },
  previewHead: (head) => `
    <link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico"/>
    <link rel="icon" type="image/png" href="%PUBLIC_URL%/logo192.png" sizes="192x192">
    ${head}
  `,
};
