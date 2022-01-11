import React, { ReactNode } from "react";

interface PortfolioInfoRowProps {
  label: ReactNode;
  value?: ReactNode;
}

export const PortfolioInfoRow = ({ label, value }: PortfolioInfoRowProps) => (
  <div className="flex justify-between">
    <div>{label}</div>
    <div>{value}</div>
  </div>
);
