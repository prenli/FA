import { useEffect, useState } from "react";
import { initI18n } from "i18n";

export const useFeedI18nextWithLocale = (language: string | undefined) => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (language) {
      initI18n(language.replace("_", "-"), () => {
        setIsReady(true);
      });
    }
  }, [language]);

  return { isReady };
};
