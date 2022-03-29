import { BaseReport } from "api/overview/types";
import { GainLoseColoring } from "components";
import { useTranslation } from "react-i18next";
import { DataCard } from "./DataCard";

export const TotalSummary = ({
  portfolio: {
    currency: { securityCode },
  },
  marketValue,
  valueChangeAbsolute,
}: BaseReport) => {
  const { t } = useTranslation();

  return (
    <>
      <DataCard
        colorScheme="black"
        label={t("portfolioSummary.currentMarketValue")}
        value={t("numberWithCurrencyRounded", {
          value: marketValue,
          currency: securityCode,
          maximumFractionDigits: 0,
        })}
      />
      <DataCard
        colorScheme="black"
        label={t("portfolioSummary.unrealizedProfits")}
        value={
          <GainLoseColoring value={valueChangeAbsolute}>
            {t("numberWithCurrencyRounded", {
              value: valueChangeAbsolute,
              currency: securityCode,
              formatParams: {
                value: { signDisplay: "always" },
              },
            })}
          </GainLoseColoring>
        }
      />
    </>
  );
};
