import { BaseReport } from "api/overview/types";
import { GainLoseColoring } from "components";
import { useModifiedTranslation } from "hooks/useModifiedTranslation";
import { DataCard } from "./DataCard";

export const TotalSummary = ({
  portfolio: {
    currency: { securityCode },
  },
  marketValue,
  valueChangeAbsolute,
}: BaseReport) => {
  const { t } = useModifiedTranslation();

  return (
    <>
      <DataCard
        colorScheme="black"
        label={t("portfolioSummary.currentMarketValue")}
        value={t("numberWithCurrencyRounded", {
          value: marketValue,
          currency: securityCode,
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
