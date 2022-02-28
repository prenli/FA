import { ReactNode } from "react";
import { BaseReport } from "api/overview/types";
import { ReactComponent as ChartBackground } from "assets/chartVector.svg";
import classNames from "classnames";
import { Card, GainLoseColoring } from "components";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

type ColorScheme = "black" | "gray" | "blue";

interface PortfolioInfoCardProps extends BaseReport {
  name: string;
  colorScheme?: ColorScheme;
  id?: number;
}

export const PortfolioInfoCard = ({
  marketValue,
  valueChangeAbsolute,
  accountBalance,
  portfolio: {
    currency: { securityCode },
  },
  name,
  colorScheme = "gray",
  id,
}: PortfolioInfoCardProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const navigateToPortfolioDetails = () => {
    if (!id) {
      return;
    }
    navigate(`/portfolio/${id}`);
  };

  return (
    <Card>
      <div
        className={classNames("relative overflow-hidden", {
          "bg-gradient-to-br from-gray-500 to-black text-gray-100":
            colorScheme === "black",
          "bg-gray-200": colorScheme === "gray",
          "bg-primary-100": colorScheme === "blue",
        })}
        onClick={navigateToPortfolioDetails}
      >
        <div>
          <ChartBackground
            className={classNames("absolute bottom-0 right-0", {
              "fill-black": colorScheme === "black",
              "fill-white": ["gray", "blue"].includes(colorScheme),
            })}
          />
        </div>
        <div className="relative p-4">
          <div className="mb-5 text-xl font-bold">{name}</div>
          <div className="mb-2">
            <Label colorScheme={colorScheme}>
              {t("portfolioSummary.currentMarketValue")}
            </Label>
            <div className="text-3xl font-medium">
              {t("numberWithCurrencyRounded", {
                value: marketValue,
                currency: securityCode,
                maximumFractionDigits: 0,
              })}
            </div>
          </div>
          <div className="flex justify-between">
            <div>
              <Label colorScheme={colorScheme}>
                {t("portfolioSummary.unrealizedProfits")}
              </Label>
              <div className="text-lg font-semibold ">
                <GainLoseColoring value={valueChangeAbsolute}>
                  {t("numberWithCurrencyRounded", {
                    value: valueChangeAbsolute,
                    currency: securityCode,
                    formatParams: {
                      value: { signDisplay: "always" },
                    },
                  })}
                </GainLoseColoring>
              </div>
            </div>
            {!isNaN(accountBalance) && (
              <div className="text-right">
                <Label colorScheme={colorScheme}>
                  {t("portfolioSummary.availableCash")}
                </Label>
                <div className="text-lg font-semibold">
                  {t("numberWithCurrencyRounded", {
                    value: accountBalance,
                    currency: securityCode,
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};

interface LabelProps {
  children: ReactNode;
  colorScheme: ColorScheme;
}

const Label = ({ children, colorScheme }: LabelProps) => (
  <div
    className={classNames("text-xs font-normal", {
      "text-gray-300": colorScheme === "black",
      "text-gray-600": ["gray", "blue"].includes(colorScheme),
    })}
  >
    {children}
  </div>
);
