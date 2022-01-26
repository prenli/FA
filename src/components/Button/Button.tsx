import React, { ReactElement } from "react";
import classNames from "classnames";

type Variant = "Primary" | "Secondary";

interface ButtonProps extends React.ComponentPropsWithoutRef<"button"> {
  variant?: Variant;
  isFullWidth?: boolean;
  leftIcon?: ReactElement;
}

export const Button = ({
  children,
  variant = "Primary",
  isFullWidth = false,
  leftIcon,
  ...props
}: ButtonProps) => (
  <button
    {...props}
    className={classNames(
      "border border-black rounded-lg p-2 inline-flex items-center justify-center relative whitespace-nowrap align-middle",
      {
        "bg-black text-white fill-white": variant === "Primary",
        "text-black fill-black": variant === "Secondary",
        "w-full": isFullWidth,
      }
    )}
  >
    {leftIcon && (
      <span className="inline-flex self-center mr-2 w-4 h-4 shrink-0">
        {leftIcon}
      </span>
    )}
    {children}
  </button>
);
