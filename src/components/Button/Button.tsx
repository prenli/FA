import { ReactElement, ComponentPropsWithoutRef } from "react";
import { ReactComponent as Spinner } from "assets/spinner.svg";
import classNames from "classnames";

type Variant = "Primary" | "Dark";
type Size = "md" | "xs";

interface ButtonProps extends ComponentPropsWithoutRef<"button"> {
  variant?: Variant;
  isFullWidth?: boolean;
  isLoading?: boolean;
  leftIcon?: ReactElement;
  size?: Size;
}

export const Button = ({
  children,
  variant = "Primary",
  isFullWidth = false,
  isLoading = false,
  leftIcon,
  size = "md",
  ...props
}: ButtonProps) => (
  <button
    {...props}
    type="button"
    className={classNames(
      "box-border text-white fill-white border-2 rounded-lg inline-flex items-center justify-center relative whitespace-nowrap align-middle",
      {
        "bg-blue-600 border-blue-600 hover:bg-blue-800 focus:border-2 focus:border-blue-400":
          variant === "Primary",
        "bg-gray-700 border-gray-700 hover:bg-gray-800 focus:border-2 focus:border-gray-300":
          variant === "Dark",
        "w-full": isFullWidth,
        "text-sm font-medium py-2.5 px-5": size === "md",
        "text-xs font-medium py-1 px-2": size === "xs",
      }
    )}
  >
    {(leftIcon || isLoading) && (
      <span
        className={classNames("inline-flex self-center w-5 h-5 shrink-0", {
          "mr-2": !!children,
        })}
      >
        {isLoading ? (
          <Spinner className="w-5 h-5 text-blue-400 animate-spin fill-white" />
        ) : (
          leftIcon
        )}
      </span>
    )}
    {children}
  </button>
);
