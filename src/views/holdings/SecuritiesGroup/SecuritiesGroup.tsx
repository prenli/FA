import React from "react";
import { Card } from "components";
import { SecurityPosition } from "../SecurityPosition/SecurityPosition";
import { TypeSecuritiesGroup } from "../useGroupedSecuritiesByType/useGroupedSecuritiesByType";

type SecuritiesGroupProps = TypeSecuritiesGroup;
export const SecuritiesGroup = ({
  label,
  securities,
}: SecuritiesGroupProps) => (
  <Card>
    <div className="p-2">
      <div className="py-1 text-lg font-semibold capitalize border-b">
        {label}
      </div>
      <div className="flex flex-col divide-y">
        {securities.map((security) => (
          <SecurityPosition key={security.security.id} {...security} />
        ))}
      </div>
    </div>
  </Card>
);
