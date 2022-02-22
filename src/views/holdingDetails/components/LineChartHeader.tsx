import { useTranslation } from "react-i18next";
import { dateFromYYYYMMDD } from "../../../utils/date";

interface LineChartHeaderProps {
  price: number;
  date: string;
  currency: string;
}

export const LineChartHeader = ({
  price,
  date,
  currency,
}: LineChartHeaderProps) => {
  const { t } = useTranslation();
  return (
    <div className="flex justify-between items-center">
      <div>{t("holdingsPage.price")}</div>
      <div className="text-right">
        <div className="text-base font-bold">
          {t("numberWithCurrency", {
            value: price,
            currency,
          })}
        </div>
        <div className="text-sm font-medium text-gray-500">
          {t("date", { date: dateFromYYYYMMDD(date) })}
        </div>
      </div>
    </div>
  );
};
