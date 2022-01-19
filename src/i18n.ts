import i18n from "i18next";
import Backend from "i18next-http-backend";
import { initReactI18next } from "react-i18next";

i18n.use(Backend).use(initReactI18next);

export const initI18n = async (language: string, callback: () => void) => {
  await i18n.init({
    lng: language,
    fallbackLng: "en",
    debug: process.env.NODE_ENV === "development",
    interpolation: {
      escapeValue: false,
    },
  });
  callback();
};

export default i18n;
