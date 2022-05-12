import { HTMLProps } from "react";
import classNames from "classnames";

interface InputProps extends HTMLProps<HTMLInputElement> {
  label: string;
  error?: string;
}

export const Input = ({
  label,
  className,
  error,
  ...inputAttributes
}: InputProps) => (
  <label
    className={classNames("text-sm font-normal", {
      "text-red-700": !!error,
    })}
  >
    {label}
    <input
      className={classNames(
        "block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-blue-500 mt-1",
        className,
        {
          "text-red-900 placeholder-red-700 bg-red-50 focus:ring-red-500 focus:border-red-500 border-red-500":
            !!error,
        }
      )}
      {...inputAttributes}
    />
    {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
  </label>
);
