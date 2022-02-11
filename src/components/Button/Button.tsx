import { ReactElement, ComponentPropsWithoutRef } from "react";
import { ReactComponent as Spinner } from "assets/spinner.svg";
import classNames from "classnames";

type Variant = "Primary" | "Secondary";

interface ButtonProps extends ComponentPropsWithoutRef<"button"> {
  variant?: Variant;
  isFullWidth?: boolean;
  isLoading?: boolean;
  leftIcon?: ReactElement;
}

export const Button = ({
  children,
  variant = "Primary",
  isFullWidth = false,
  isLoading = false,
  leftIcon,
  ...props
}: ButtonProps) => (
  <button
    {...props}
    className={classNames(
      "text-sm font-medium border border-blue-600 rounded-lg p-2 inline-flex items-center justify-center relative whitespace-nowrap align-middle",
      {
        "bg-blue-600 text-white fill-white stroke-white": variant === "Primary",
        "text-blue-600 fill-blue-600 stroke-blue-600": variant === "Secondary",
        "w-full": isFullWidth,
      }
    )}
  >
    {(leftIcon || isLoading) && (
      <span className="inline-flex self-center mr-2 w-5 h-5 shrink-0">
        {isLoading ? (
          <Spinner
            className={classNames("animate-spin ", {
              "text-blue-400 fill-white": variant === "Primary",
              "text-gray-200 fill-blue-600": variant === "Secondary",
            })}
          />
        ) : (
          leftIcon
        )}
      </span>
    )}
    {children}
  </button>
);
