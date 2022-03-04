import { Dispatch, SetStateAction } from "react";
import { TradeOrder } from "api/orders/types";
import { QueryData } from "api/types";
import { Card, DatePicker, QueryLoadingWrapper } from "components";
import { useTranslation } from "react-i18next";
import { OrdersContainer } from "./components/OrdersContainer";

interface OrdersProps extends QueryData<TradeOrder[]> {
  startDate: Date;
  setStartDate: Dispatch<SetStateAction<Date>>;
  endDate: Date;
  setEndDate: Dispatch<SetStateAction<Date>>;
}

export const Orders = ({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  ...queryData
}: OrdersProps) => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col gap-4">
      <Card>
        <div className="flex gap-2 p-2 text-normal">
          <div className="md:w-48 grow md:grow-0">
            <DatePicker
              label={t("transactionsPage.datePickerFromLabel")}
              value={startDate}
              onChange={setStartDate}
              maxDate={endDate}
            />
          </div>
          <div className="md:w-48 grow md:grow-0">
            <DatePicker
              label={t("transactionsPage.datePickerFromTo")}
              value={endDate}
              onChange={setEndDate}
              minDate={startDate}
            />
          </div>
        </div>
      </Card>
      <QueryLoadingWrapper {...queryData} SuccessComponent={OrdersContainer} />
    </div>
  );
};
