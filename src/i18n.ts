import i18n from "i18next";
import Backend from "i18next-http-backend";
import { initReactI18next } from "react-i18next";
import { isDevelopment } from "./config";

export const initI18n = async (language: string, callback: () => void) => {
  await i18n
    .use(Backend)
    .use(initReactI18next)
    .init({
      lng: language,
      fallbackLng: "en-US",
      debug: isDevelopment,
      interpolation: {
        escapeValue: false,
      },
      defaultNS: "translation",
      backend: {
        loadPath: `${process.env.PUBLIC_URL}/locales/{{lng}}/{{ns}}.json`,
      },
    });
  callback();
};
