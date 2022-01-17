import React, { useCallback } from "react";
import ReactDatePicker, {
  DatePickerProps as ReactDatePickerProps,
} from "react-date-picker/dist/entry.nostyle";
import "./DatePicker.css";
import "./Calendar.css";
import { useTranslation } from "react-i18next";

interface DatePickerProps extends ReactDatePickerProps {
  label?: string;
}

export const DatePicker = ({ label, ...props }: DatePickerProps) => {
  const { i18n } = useTranslation();

  const positionRef = useAdjustCalendarPosition();

  return (
    <div className="flex flex-col gap-0 ">
      {label && <label className="text-sm font-semibold">{label}</label>}
      <ReactDatePicker
        calendarIcon={null}
        clearIcon={null}
        className="rounded-lg"
        locale={i18n.language}
        inputRef={positionRef}
        {...props}
      />
    </div>
  );
};

const useAdjustCalendarPosition = () => {
  return useCallback((node: Element | null) => {
    if (!node) {
      return;
    }
    const calendarDistanceToRight =
      window.innerWidth - node.getBoundingClientRect().right;
    if (calendarDistanceToRight < 0) {
      adjustHorizontally(node, calendarDistanceToRight);
    }
  }, []);
};

const adjustHorizontally = (node: Element, overlappingDistance: number) => {
  if (!node.parentElement) {
    return;
  }
  // react-date-picker display calendar aligned to the left (or right) of input and decreased its size when necessary
  // to prevent that we set min width and move calendar to the side if calendar is overlapping window
  node.parentElement.style.minWidth = `${node.getBoundingClientRect().width}px`;
  node.parentElement.style.marginLeft = `${overlappingDistance - 20}px`;
  node.parentElement.style.marginRight = `${overlappingDistance - 20}px`;
};
