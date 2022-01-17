import { intlFormat } from "date-fns";

interface FormatOptions {
  localeMatcher?: "lookup" | "best fit";
  weekday?: "narrow" | "short" | "long";
  era?: "narrow" | "short" | "long";
  year?: "numeric" | "2-digit";
  month?: "numeric" | "2-digit" | "narrow" | "short" | "long";
  day?: "numeric" | "2-digit";
  hour?: "numeric" | "2-digit";
  minute?: "numeric" | "2-digit";
  second?: "numeric" | "2-digit";
  timeZoneName?: "short" | "long";
  formatMatcher?: "basic" | "best fit";
  hour12?: boolean;
  timeZone?: string;
}

export const formatToLocalDate = (
  date: Date,
  formatOptions: FormatOptions,
  locale: string
) => {
  return intlFormat(date, formatOptions, {
    locale,
  });
};
export const formatToLocalShortDate = (date: Date, locale: string) => {
  return formatToLocalDate(
    date,
    {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    },
    locale
  );
};
