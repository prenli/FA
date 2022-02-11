import { ReactElement, ComponentPropsWithoutRef } from "react";
import { ReactComponent as Spinner } from "assets/spinner.svg";
import classNames from "classnames";

type Variant = "Primary" | "Dark";

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
    type="button"
    className={classNames(
      "box-border text-white fill-white stroke-white text-sm font-medium border-2 rounded-lg py-1 px-2  inline-flex items-center justify-center relative whitespace-nowrap align-middle",
      {
        "bg-blue-600 border-blue-600 hover:bg-blue-800 focus:border-2 focus:border-blue-400":
          variant === "Primary",
        "bg-gray-700 border-gray-700 hover:bg-gray-800 focus:border-2 focus:border-gray-300":
          variant === "Dark",
        "w-full": isFullWidth,
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
          <Spinner className="text-blue-400 animate-spin fill-white" />
        ) : (
          leftIcon
        )}
      </span>
    )}
    {children}
  </button>
);
