import { ReactNode, useEffect, useState } from "react";
import { LoadingIndicator } from "components";
import { initI18nWithLanguageDetection } from "../i18n";

interface DetectedLanguageProviderProps {
  children: ReactNode;
}

// used when we can't get language from API, then we use i18 with language detection
export const DetectedLanguageProvider = ({
  children,
}: DetectedLanguageProviderProps) => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // we can't get language from API, so we use i18 with language detection
    initI18nWithLanguageDetection(() => {
      setIsReady(true);
    });
  }, []);

  if (!isReady) {
    return (
      <div className="h-screen">
        <LoadingIndicator center />
      </div>
    );
  }

  return <>{children}</>;
};
