import { useEffect, useState } from "react";
import { initI18n } from "i18n";

export const useFeedI18nextWithLocale = (locale: string | undefined) => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (locale) {
      initI18n(locale.replace("_", "-"), () => {
        setIsReady(true);
      });
    }
  }, [locale]);

  return { isReady };
};
