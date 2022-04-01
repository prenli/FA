import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";
import { initReactI18next } from "react-i18next";

export const initI18n = async (language: string, callback: () => void) => {
  await i18n
    .use(Backend)
    .use(initReactI18next)
    .init({
      lng: language,
      fallbackLng: "en-US",
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

// used when we can't get language from API, then we use i18 with language detection
export const initI18nWithLanguageDetection = async (callback?: () => void) => {
  await i18n
    .use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      fallbackLng: "en-US",
      interpolation: {
        escapeValue: false,
      },
      defaultNS: "translation",
      backend: {
        loadPath: `${process.env.PUBLIC_URL}/locales/{{lng}}/{{ns}}.json`,
      },
    });
  callback?.();
};
