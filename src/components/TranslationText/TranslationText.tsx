import React from "react";
import { useTranslation } from "react-i18next";

interface Props {
  translationKey: string;
}

export const TranslationText = ({ translationKey }: Props) => {
  const { t } = useTranslation();

  return <>{t(translationKey)}</>;
};
