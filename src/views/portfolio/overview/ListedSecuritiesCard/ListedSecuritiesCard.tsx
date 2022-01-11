import React, { ReactNode } from "react";
import { SecurityPosition } from "api/types";
import { Card } from "components";

interface ListedSecuritiesCardProps {
  securities: SecurityPosition[];
  label: ReactNode;
}

export const ListedSecuritiesCard = ({
  securities,
  label,
}: ListedSecuritiesCardProps) => (
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
            <div key={securityCode} className="flex justify-between">
              <div>{name}</div>
              <div>{valueChangeAbsolute}</div>
            </div>
          );
        })}
      </div>
    </div>
  </Card>
);
