import "styles/tailwind.css";
import { i18n } from "./i18next.js";

export const parameters = {
  i18n,
  locale: "en-US",
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
  backgrounds: {
    default: "light",
    values: [
      {
        name: "dark",
        value: "#333333",
      },
      {
        name: "light",
        value: "#FFFFFF",
      },
    ],
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
