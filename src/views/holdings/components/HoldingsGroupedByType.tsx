import { AllocationByType } from "api/holdings/types";
import { Card, GainLoseColoring } from "components";
import { useTranslation } from "react-i18next";
import { HoldingSummary } from "./HoldingSummary";

interface HoldingsGroupedByTypeProps extends AllocationByType {
  currency: string;
}

export const HoldingsGroupedByType = ({
  name,
  figures: { marketValue, tradeAmount },
  allocationBySecurity,
  currency,
}: HoldingsGroupedByTypeProps) => {
  const { t } = useTranslation();
  return (
    <Card
      header={
        <TypeHeader
          name={name}
          marketValue={marketValue}
          tradeAmount={tradeAmount}
          currency={currency}
        />
      }
    >
      <div className="flex justify-between py-1 px-2 text-sm font-semibold text-gray-500 bg-gray-100">
        <div>{t("holdingsPage.name")}</div>
        <div>{t("holdingsPage.marketValue")}</div>
      </div>
      <div className="px-2 divider">
        <div className="flex flex-col divide-y">
          {allocationBySecurity.map((security) => (
            <HoldingSummary
              key={security.code}
              currency={currency}
              {...security}
            />
          ))}
        </div>
      </div>
    </Card>
  );
};

interface TypeHeaderProps {
  name: string;
  currency: string;
  marketValue: number;
  tradeAmount: number;
}

const TypeHeader = ({
  name,
  marketValue,
  tradeAmount,
  currency,
}: TypeHeaderProps) => {
  const { t } = useTranslation();
  const valueChange = marketValue - tradeAmount;
  return (
    <div className="flex justify-between items-center">
      <div>{name}</div>
      <div className="text-right">
        <div className="text-base font-bol">
          {t("numberWithCurrency", {
            value: marketValue,
            currency,
          })}
        </div>
        <div className="text-sm font-medium">
          <GainLoseColoring value={valueChange}>
            {t("numberWithCurrency", {
              value: valueChange,
              currency,
              formatParams: {
                value: { signDisplay: "always" },
              },
            })}
          </GainLoseColoring>
        </div>
      </div>
    </div>
  );
};
