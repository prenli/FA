import React, { ReactNode } from "react";
import { Card } from "components";

interface PortfolioValueCardProps {
  label: ReactNode;
  value: number;
  currency: string;
}

export const PortfolioValueCard = ({
  label,
  value,
  currency,
}: PortfolioValueCardProps) => (
  <Card>
    <div className="flex justify-between p-2">
      <div>{label}</div>
      <div className="font-semibold">{`${value} ${currency}`}</div>
    </div>
  </Card>
);
