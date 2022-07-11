import { useCallback } from "react";
import { StringMap, TOptions } from "i18next";
import { useTranslation } from "react-i18next";

export const useModifiedTranslation = () => {
  const { i18n, t } = useTranslation();

  // for all languages currencies are displayed as ISO code at the end of value - business decision
  const modifiedT = useCallback(
    (key: string, options?: TOptions<StringMap>) => {
      if (key === "numberWithCurrency") {
        if (options?.currency) {
          const { currency, ...optionsWOCurrency } = options;
          return `${t("number", {
            maximumFractionDigits: 2,
            ...optionsWOCurrency,
          })}\xa0${currency}`;
        }
      }

      if (key === "numberWithCurrencyRounded") {
        if (options?.currency) {
          const { currency, ...optionsWOCurrency } = options;
          return `${t("numberRounded", optionsWOCurrency)}\xa0${currency}`;
        }
      }

      return t(key, options);
    },
    [t]
  );

  return { i18n, t: modifiedT };
};
