import React, { ReactNode } from "react";

interface LabeledDivProps {
  label: ReactNode;
  children: ReactNode;
}

export const LabeledDiv = ({ label, children }: LabeledDivProps) => (
  <div className="leading-none">
    <label className="text-sm">{label}</label>
    <div className="font-bold">{children}</div>
  </div>
);
