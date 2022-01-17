import React from "react";

interface TransactionValueProps {
  value: number;
  sign: number;
}

export const TransactionValue = ({ value, sign }: TransactionValueProps) => (
  <div className="font-medium">{`${sign < 0 ? "-" : "+"}${value}`}</div>
);
