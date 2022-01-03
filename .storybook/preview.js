import "styles/tailwind.css";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  previewTabs: {
    "storybook/docs/panel": {
      hidden: true,
    },
  },
  viewport: {
    viewports: [
      {
        name: "base",
        styles: { width: "360px", height: "640px" },
        type: "mobile",
      },
      {
        name: "sm",
        styles: { width: "640px", height: "1024px" },
        type: "tablet",
      },
      {
        name: "md",
        styles: { width: "768px", height: "1024px" },
        type: "tablet",
      },
      {
        name: "lg",
        styles: { width: "1024px", height: "100%" },
        type: "desktop",
      },
      {
        name: "xl",
        styles: { width: "1280px", height: "100%" },
        type: "desktop",
      },
    ],
  },
};
