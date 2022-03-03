import { AllocationByType } from "api/holdings/types";
import { Card } from "components";
import { useTranslation } from "react-i18next";
import { HoldingSummaryShort } from "./HoldingSummaryShort";

interface CurrencyTypeGroupProps extends AllocationByType {
  currency: string;
}

export const CurrencyTypeGroup = ({
  name,
  figures: { marketValue },
  allocationBySecurity,
  currency,
}: CurrencyTypeGroupProps) => {
  const { t } = useTranslation();

  return (
    <Card
      header={
        <TypeHeader name={name} marketValue={marketValue} currency={currency} />
      }
    >
      <div className="flex justify-between py-1 px-2 text-sm font-semibold text-gray-500 bg-gray-100">
        <div>{t("holdingsPage.name")}</div>
        <div>{t("holdingsPage.availableCash")}</div>
      </div>
      <div className="px-2 divider">
        <div className="flex flex-col divide-y">
          {allocationBySecurity.map((security) => (
            <HoldingSummaryShort
              key={security.code}
              currency={security.security.currencyCode}
              hideValueChange
              hideFlag
              {...security}
              figures={{
                ...security.figures,
                marketValue:
                  security.figures.marketValue * security.figures.fxRate,
              }}
              showDetailsOnClick={false}
            />
          ))}
        </div>
      </div>
    </Card>
  );
};

interface TypeHeaderProps {
  name: string;
  marketValue: number;
  currency: string;
}

const TypeHeader = ({ name, marketValue, currency }: TypeHeaderProps) => {
  const { t } = useTranslation();
  return (
    <div className="flex justify-between items-center">
      <div>{name}</div>
      <div className="text-right">
        <div className="text-lg font-bold">
          {t("numberWithCurrency", {
            value: marketValue,
            currency,
          })}
        </div>
      </div>
    </div>
  );
};
