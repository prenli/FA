import React, { ReactNode } from "react";
import { SecurityPosition } from "api/overview/types";
import { Card, GainLoseColoring } from "components";
import { useTranslation } from "react-i18next";

interface ListedSecuritiesCardProps {
  securities: SecurityPosition[];
  label: ReactNode;
  currency: string;
}

export const ListedSecuritiesCard = ({
  securities,
  label,
  currency,
}: ListedSecuritiesCardProps) => {
  const { t } = useTranslation();
  return (
    <Card header={label}>
      <div className="flex flex-col p-2 divide-y">
        {securities.map((security) => {
          const {
            security: { name, securityCode },
            valueChangeAbsolute,
          } = security;
          return (
            <div
              key={securityCode}
              className="flex justify-between items-center p-1"
            >
              <div className="text-base font-normal">{name}</div>
              <div className="whitespace-nowrap">
                <GainLoseColoring value={valueChangeAbsolute}>
                  {t("numberWithCurrencyRounded", {
                    value: valueChangeAbsolute,
                    currency,
                    formatParams: {
                      value: { signDisplay: "always" },
                    },
                  })}
                </GainLoseColoring>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};
