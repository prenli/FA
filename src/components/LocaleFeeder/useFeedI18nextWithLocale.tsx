import { useEffect, useState } from "react";
import { ContactInfoQuery } from "api/initial/useGetContactInfo";
import { initI18n } from "i18n";

export const useFeedI18nextWithLocale = (
  data: ContactInfoQuery | undefined
) => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (data && !isReady) {
      const locale = data?.contact.language.locale || "en-US";
      initI18n(locale.replace("_", "-"), () => {
        setIsReady(true);
      });
    }
  }, [data, isReady]);

  return { isReady };
};
