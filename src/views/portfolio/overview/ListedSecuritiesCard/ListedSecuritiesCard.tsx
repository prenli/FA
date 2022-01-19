import React, { ReactNode } from "react";
import { SecurityPosition } from "api/overview/types";
import { Card } from "components";
import { useTranslation } from "react-i18next";

interface ListedSecuritiesCardProps {
  securities: SecurityPosition[];
  label: ReactNode;
}

export const ListedSecuritiesCard = ({
  securities,
  label,
}: ListedSecuritiesCardProps) => {
  const { t } = useTranslation();
  return (
    <Card>
      <div className="p-3">
        <div className="pb-1 mb-1 font-bold border-b">{label}</div>
        <div className="flex flex-col gap-2">
          {securities.map((security) => {
            const {
              security: { name, securityCode },
              valueChangeAbsolute,
            } = security;
            return (
              <div
                key={securityCode}
                className="flex justify-between items-center"
              >
                <div>{name}</div>
                <div>{t("number", { value: valueChangeAbsolute })}</div>
              </div>
            );
          })}
        </div>
      </div>
    </Card>
  );
};
