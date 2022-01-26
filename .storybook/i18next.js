import { initReactI18next } from "react-i18next";
import i18n from "i18next";

const supportedLngs = ["en", "fi-FI"];

i18n.use(initReactI18next).init({
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
  defaultNS: "translation",
  supportedLngs,
  react: {
    useSuspense: false,
  },
});

supportedLngs.forEach((lang) => {
  i18n.addResourceBundle(
    lang,
    "translation",
    require(`../public/locales/${lang}/translation.json`)
  );
});

export { i18n };
