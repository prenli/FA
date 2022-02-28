import { ReactNode, Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { ReactComponent as ChevronDown } from "assets/chevron-down.svg";
import classNames from "classnames";
import { useTranslation } from "react-i18next";

export interface Option {
  id: number | string;
  label: string;
  OptionComponent?: ReactNode;
}

interface SelectProps<T> {
  value: T | undefined;
  onChange: (option: T) => void;
  options: T[];
}

export const Select = <TOption extends Option>({
  options,
  value,
  onChange,
}: SelectProps<TOption>) => {
  const { t } = useTranslation();
  return (
    <Listbox value={value} onChange={onChange}>
      <Listbox.Button className="flex items-center py-2.5 px-4 w-full text-lg font-bold dark:placeholder-gray-400 text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-300 focus:border-primary-500 dark:border-gray-600 dark:focus:border-primary-500 focus:ring-primary-500 dark:focus:ring-primary-500">
        <div className="box-border flex flex-1 content-start leading-none">
          {value?.label ?? t("component.select.placeholder")}
        </div>
        <ChevronDown className="stroke-gray-500 w-[20px] h-[20px]" />
      </Listbox.Button>
      <Transition
        enter="transition duration-100 ease-out"
        enterFrom="transform scale-0 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-75 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
        className="relative opacity-0 scale-0" // added enterFrom classes as workaround https://github.com/tailwindlabs/headlessui/issues/587
      >
        <Listbox.Options className="absolute inset-x-0 z-10 py-1 text-base list-none bg-white dark:bg-gray-700 rounded divide-y divide-gray-100 shadow ">
          {options.map((option) => (
            <Listbox.Option key={option.id} value={option} as={Fragment}>
              {({ active, selected }) => (
                <li
                  className={classNames(
                    "block py-2 px-4 text-sm text-gray-700 dark:text-gray-200 ",
                    {
                      "dark:text-white bg-gray-100 dark:bg-gray-600": active,
                      "font-bold": selected,
                    }
                  )}
                >
                  {option.OptionComponent ?? option.label}
                </li>
              )}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </Transition>
    </Listbox>
  );
};
