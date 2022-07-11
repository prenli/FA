import { ReactNode } from "react";
import { SecurityPosition } from "api/overview/types";
import { Card, GainLoseColoring } from "components";
import { useModifiedTranslation } from "hooks/useModifiedTranslation";
import { useNavigate } from "react-router";

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
  const { t } = useModifiedTranslation();
  const navigate = useNavigate();
  return (
    <Card header={label}>
      <div className="flex justify-between py-1 px-2 text-sm font-semibold text-gray-500 bg-gray-100">
        <div>{t("overviewPage.name")}</div>
        <div>{t("overviewPage.unrealizedProfits")}</div>
      </div>
      <div className="flex flex-col px-2 divide-y">
        {securities.map((security) => {
          const {
            security: { id: securityId, name },
            valueChangeAbsolute,
          } = security;
          return (
            <div
              key={securityId}
              className="flex justify-between items-center py-2 cursor-pointer"
              onClick={() => navigate(`holdings/${securityId}`)}
            >
              <div className="text-base font-normal">{name}</div>
              <div className="whitespace-nowrap">
                <GainLoseColoring value={valueChangeAbsolute}>
                  {t("numberWithCurrency", {
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
