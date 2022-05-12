import { FunctionComponent, ComponentPropsWithoutRef, SVGProps } from "react";
import { ReactComponent as Spinner } from "assets/spinner.svg";
import classNames from "classnames";

type Variant = "Primary" | "Dark" | "Secondary" | "Red";
type Size = "md" | "xs";

interface ButtonProps extends ComponentPropsWithoutRef<"button"> {
  variant?: Variant;
  isFullWidth?: boolean;
  isLoading?: boolean;
  LeftIcon?: FunctionComponent<SVGProps<SVGSVGElement>>;
  size?: Size;
}

export const Button = ({
  children,
  variant = "Primary",
  isFullWidth = false,
  isLoading = false,
  LeftIcon,
  size = "md",
  disabled,
  ...props
}: ButtonProps) => (
  <button
    {...props}
    disabled={disabled}
    type="button"
    className={classNames(
      "box-border border-2 rounded-lg inline-flex items-center justify-center relative whitespace-nowrap align-middle",
      {
        "bg-primary-600 border-primary-600 hover:bg-primary-800 focus:border-2 focus:border-primary-400 text-white fill-white":
          variant === "Primary",
        "bg-red-600 border-red-600 hover:bg-red-800 focus:border-2 focus:border-red-400 text-white fill-white":
          variant === "Red",
        "bg-white border-primary-600 hover:bg-primary-100 focus:border-2 focus:border-primary-400 text-primary-600 fill-primary-600":
          variant === "Secondary",
        "bg-gray-700 border-gray-700 hover:bg-gray-800 focus:border-2 focus:border-gray-300 text-white fill-white":
          variant === "Dark",
        "w-full": isFullWidth,
        "text-sm font-medium py-2.5 px-5": size === "md",
        "text-xs font-medium py-1 px-2": size === "xs",
        "opacity-50 cursor-not-allowed": disabled,
      }
    )}
  >
    {(LeftIcon || isLoading) && (
      <span
        className={classNames("inline-flex self-center w-5 h-5 shrink-0", {
          "mr-2": children !== undefined,
        })}
      >
        {isLoading ? (
          <Spinner
            className={classNames(
              "w-5 h-5 text-primary-400 animate-spin fill-white",
              {
                "text-primary-200 fill-primary-600": variant === "Secondary",
              }
            )}
          />
        ) : (
          LeftIcon && <LeftIcon className="w-5 h-5" aria-hidden />
        )}
      </span>
    )}
    {children}
  </button>
);
