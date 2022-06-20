import { HTMLAttributes, ReactNode } from "react";
import classNames from "classnames";

interface LabeledDivProps extends HTMLAttributes<HTMLDivElement> {
  label: string;
  children: ReactNode;
}

export const LabeledDiv = ({
  label,
  children,
  className,
  ...rest
}: LabeledDivProps) => (
  <div className={classNames(className, "leading-7")} {...rest}>
    <div className="text-sm font-normal">{label}</div>
    {children}
  </div>
);
