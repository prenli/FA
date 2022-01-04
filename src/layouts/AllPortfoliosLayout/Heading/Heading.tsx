import React from "react";
import { Heading as HeadingComponent } from "components";
import { useTranslation } from "react-i18next";

export const Heading = () => {
  const { t } = useTranslation();

  return <HeadingComponent>{t("navTab.title")}</HeadingComponent>;
};
