import { Fragment } from "react";
import { RadioGroup } from "@headlessui/react";
import classNames from "classnames";

interface Option {
  id: number | string;
  label: string;
}

interface HorizontalRadioProps<T> {
  value: T | undefined;
  onChange: (option: T) => void;
  options: T[];
  label?: string;
}

export const HorizontalRadio = <TOption extends Option>({
  options,
  value,
  onChange,
  label,
}: HorizontalRadioProps<TOption>) => {
  return (
    <RadioGroup
      value={value}
      onChange={onChange}
      className="flex gap-1 p-1 text-sm bg-gray-50 rounded-lg border border-gray-300 w-fit"
    >
      {label && <RadioGroup.Label>{label}</RadioGroup.Label>}
      {options.map((option) => (
        <RadioGroup.Option key={option.id} value={option} as={Fragment}>
          {({ checked }) => (
            <div
              className={classNames("cursor-pointer rounded-lg px-2 border-2", {
                "border-primary-600 bg-primary-50": checked,
                "border-transparent": !checked,
              })}
            >
              {option.label}
            </div>
          )}
        </RadioGroup.Option>
      ))}
    </RadioGroup>
  );
};
