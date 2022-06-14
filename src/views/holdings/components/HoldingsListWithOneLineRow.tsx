import { GainLoseColoring, Grid } from "components";
import { useMatchesBreakpoint } from "hooks/useMatchesBreakpoint";
import { useModifiedTranslation } from "hooks/useModifiedTranslation";
import { useNavigate } from "react-router";
import { getGridColsClass } from "utils/tailwindClasses";
import { GroupedHoldings, HoldingProps } from "./HoldingsGroupedByType";
import { NameWithFlag } from "./NameWithFlag";

export const HoldingsListWithOneLineRow = ({
  securities,
  groupCode,
  currency,
}: GroupedHoldings) => {
  const { t } = useModifiedTranslation();
  const navigate = useNavigate();

  const isLgVersion = useMatchesBreakpoint("lg");
  const isXlVersion = useMatchesBreakpoint("xl");

  const headersList = [
    t("holdingsPage.name"),
    groupCode === "CURRENCY"
      ? t("holdingsPage.accountNumber")
      : t("holdingsPage.isinCode"),
    ...(isLgVersion ? [t("holdingsPage.units")] : []),
    ...(isXlVersion ? [t("holdingsPage.purchaseValue")] : []),
    t("holdingsPage.marketValue"),
    t("holdingsPage.unrealizedProfits"),
  ];

  return (
    <div className={`grid ${getGridColsClass(headersList.length + 1)}`}>
      <Grid.Header>
        {headersList.map((header, index) => (
          <span key={index} className={index === 0 ? "col-span-2" : ""}>
            {header}
          </span>
        ))}
      </Grid.Header>
      {securities.map((security) => (
        <HoldingLg
          {...security}
          key={security.security.id}
          onClick={() =>
            groupCode !== "CURRENCY" &&
            navigate(`holdings/${security.security.id}`)
          }
          currency={currency}
          showFlag={groupCode !== "CURRENCY"}
        />
      ))}
    </div>
  );
};

const HoldingLg = ({
  name,
  code,
  security: { isinCode, countryCode },
  figures: { marketValue, tradeAmount, amount, purchaseTradeAmount },
  onClick,
  showFlag,
  currency,
}: HoldingProps) => {
  const { t } = useModifiedTranslation();

  const isLgVersion = useMatchesBreakpoint("lg");
  const isXlVersion = useMatchesBreakpoint("xl");

  const valueChange = marketValue - tradeAmount;
  return (
    <>
      <Grid.Row key={code} className="py-2 border-t" onClick={onClick}>
        <div className="col-span-2">
          <NameWithFlag
            name={name}
            countryCode={countryCode}
            showFlag={showFlag}
          />
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
      </Grid.Row>
    </>
  );
};
