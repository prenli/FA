import { ReactComponent as CalendarIcon } from "assets/calendar.svg";
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

  return (
    <div className="flex flex-col gap-0 w-full ">
      {label && (
        <label className="mb-1 text-sm font-medium text-gray-900">
          {label}
        </label>
      )}
      <ReactDatePicker
        calendarIcon={<CalendarIcon />}
        clearIcon={null}
        className="isolate py-3 px-3.5 text-base font-normal leading-tight text-gray-500 bg-gray-50 rounded-lg border border-gray-200"
        locale={i18n.language}
        {...props}
      />
    </div>
  );
};
