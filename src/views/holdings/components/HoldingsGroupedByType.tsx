import { AllocationByType } from "api/holdings/types";
import { Card, GainLoseColoring } from "components";
import { useTranslation } from "react-i18next";
import { useMatchesBreakpoint } from "../../../hooks/useMatchesBreakpoint";
import { HoldingSummaryLong } from "./HoldingSummaryLong";
import { HoldingSummaryShort } from "./HoldingSummaryShort";

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

  const isLargeVersion = useMatchesBreakpoint("md");

  const HoldingSummary = isLargeVersion
    ? HoldingSummaryLong
    : HoldingSummaryShort;

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
      <div className="flex md:grid md:grid-cols-5 justify-between py-1 px-2 text-sm font-semibold text-gray-500 bg-gray-100">
        <div className="col-span-2">{t("holdingsPage.name")}</div>
        {isLargeVersion && (
          <div className="text-center">{t("holdingsPage.isinCode")}</div>
        )}
        <div className="text-right">{t("holdingsPage.marketValue")}</div>
        {isLargeVersion && (
          <div className="text-right">
            {t("holdingsPage.unrealizedProfits")}
          </div>
        )}
      </div>
      <div className="px-2 ">
        <div className="flex md:grid flex-col md:grid-cols-5 md:leading-5 divide-y">
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

//const GridHeader = () => {};

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
