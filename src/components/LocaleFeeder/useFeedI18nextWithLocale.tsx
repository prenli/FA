import { useEffect, useState } from "react";
import { initI18n } from "i18n";

export const useFeedI18nextWithLocale = (language: string | undefined) => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (language && !isReady) {
      const locale = language || "en-US-US";
      initI18n(locale.replace("_", "-"), () => {
        setIsReady(true);
      });
    }
  }, [language, isReady]);

  return { isReady };
};
