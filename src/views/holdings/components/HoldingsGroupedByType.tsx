import { AllocationByType } from "api/holdings/types";
import {
  Card,
  CountryFlag,
  GainLoseColoring,
  ResponsiveDataGrid,
} from "components";
import { useMatchesBreakpoint } from "hooks/useMatchesBreakpoint";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";

interface HoldingsGroupedByTypeProps extends AllocationByType {
  currency: string;
}

export const HoldingsGroupedByType = ({
  name,
  figures: { marketValue: groupMarketValue, tradeAmount: groupTradeAmount },
  allocationBySecurity,
  currency,
  code: groupCode,
}: HoldingsGroupedByTypeProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const isMdVersion = useMatchesBreakpoint("md");
  const isLgVersion = useMatchesBreakpoint("lg");
  const isXlVersion = useMatchesBreakpoint("xl");

  return (
    <Card
      header={
        <TypeHeader
          name={name}
          marketValue={groupMarketValue}
          tradeAmount={groupTradeAmount}
          currency={currency}
        />
      }
    >
      <ResponsiveDataGrid
        headerLabels={
          isMdVersion
            ? [
                t("holdingsPage.name"),
                groupCode === "CURRENCY"
                  ? t("holdingsPage.accountNumber")
                  : t("holdingsPage.isinCode"),
                ...(isLgVersion ? [t("holdingsPage.units")] : []),
                ...(isXlVersion ? [t("holdingsPage.purchaseValue")] : []),
                t("holdingsPage.marketValue"),
                t("holdingsPage.unrealizedProfits"),
              ]
            : [t("holdingsPage.name"), t("holdingsPage.marketValue")]
        }
      >
        {allocationBySecurity.map((security) => {
          const {
            name,
            code,
            security: { isinCode, countryCode },
            figures: { marketValue, tradeAmount, amount, purchaseTradeAmount },
          } = security;
          const valueChange = marketValue - tradeAmount;

          return (
            <ResponsiveDataGrid.Row
              key={security.code}
              onClick={() =>
                groupCode !== "CURRENCY" && navigate(`holdings/${code}`)
              }
            >
              <div className="text-lg md:text-base font-semibold leading-5 text-gray-900">
                <span>{name}</span>
                {groupCode !== "CURRENCY" && (
                  <CountryFlag
                    code={countryCode}
                    className="inline ml-1.5 align-baseline w-[20px] h-[14px]"
                  />
                )}
              </div>
              <div className="text-xs md:text-base font-light">
                {isinCode || code || "-"}
              </div>
              {isLgVersion && (
                <div className="text-base font-medium">
                  {t("number", { value: amount })}
                </div>
              )}
              {isXlVersion && (
                <div className="text-base font-medium">
                  {t("numberWithCurrency", {
                    value: purchaseTradeAmount,
                    currency: currency,
                  })}
                </div>
              )}
              <div className="text-base font-medium">
                {t("numberWithCurrency", { value: marketValue, currency })}
              </div>
              <div className="text-xs md:text-base font-medium">
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
            </ResponsiveDataGrid.Row>
          );
        })}
      </ResponsiveDataGrid>
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
