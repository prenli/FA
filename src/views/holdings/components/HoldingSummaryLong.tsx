import { AllocationBySecurity } from "api/holdings/types";
import { GainLoseColoring, CountryFlag } from "components";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

interface HoldingProps extends AllocationBySecurity {
  currency: string;
  hideValueChange?: boolean;
  hideFlag?: boolean;
  showDetailsOnClick?: boolean;
}

export const HoldingSummaryLong = ({
  name,
  code,
  security: { isinCode, countryCode },
  figures: { marketValue, tradeAmount },
  currency,
  hideValueChange = false,
  hideFlag = false,
  showDetailsOnClick = true,
}: HoldingProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const valueChange = marketValue - tradeAmount;

  const onRowClick = () => showDetailsOnClick && navigate(`holdings/${code}`);

  return (
    <>
      <div
        className="col-span-2 py-2 font-semibold text-gray-900 border-t"
        onClick={onRowClick}
      >
        <span>{name}</span>
        {!hideFlag && (
          <CountryFlag
            code={countryCode}
            className="inline ml-1.5 align-baseline w-[20px] h-[14px]"
          />
        )}
      </div>
      <div className="py-2 text-center" onClick={onRowClick}>
        {isinCode || code}
      </div>
      <div className="py-2 text-right" onClick={onRowClick}>
        {t("numberWithCurrency", { value: marketValue, currency })}
      </div>
      {!hideValueChange && (
        <div className="py-2 text-right" onClick={onRowClick}>
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
      )}
    </>
  );
};
