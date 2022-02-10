import { ReactNode } from "react";

interface DataRowProps {
  label: string;
  value: ReactNode;
}

export const DataRow = ({ label, value }: DataRowProps) => (
  <div className="flex justify-between pt-3 pb-2">
    <div className="text-base font-normal">{label}</div>
    <div className="text-base font-semibold text-gray-800">{value}</div>
  </div>
);
