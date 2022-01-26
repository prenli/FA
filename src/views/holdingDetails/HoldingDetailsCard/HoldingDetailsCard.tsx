import React from "react";
import { Card } from "components";

interface Props {
  label: string;
}

export const HoldingDetailsCard: React.FC<Props> = ({ label, children }) => {
  return (
    <Card>
      <div className="p-2">
        <div className="py-1 text-lg font-semibold capitalize border-b">
          {label}
        </div>
        <div className="grid grid-cols-2 gap-4 py-2">{children}</div>
      </div>
    </Card>
  );
};
