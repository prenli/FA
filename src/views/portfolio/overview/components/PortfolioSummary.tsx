import { BaseReport } from "api/overview/types";
import { GainLoseColoring } from "components";
import { useModifiedTranslation } from "hooks/useModifiedTranslation";
import { DataCard } from "../../../overview/components/DataCard";

export const PortfolioSummary = ({
  portfolio: {
    currency: { securityCode },
  },
  marketValue,
  valueChangeAbsolute,
  accountBalance,
}: BaseReport) => {
  const { t } = useModifiedTranslation();

  return (
    <>
      <DataCard
        label={t("portfolioSummary.currentMarketValue")}
        value={t("numberWithCurrencyRounded", {
          value: marketValue,
          currency: securityCode,
          maximumFractionDigits: 0,
        })}
      />
      <DataCard
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
      <DataCard
        label={t("portfolioSummary.availableCash")}
        value={t("numberWithCurrencyRounded", {
          value: accountBalance,
          currency: securityCode,
        })}
      />
    </>
  );
};
