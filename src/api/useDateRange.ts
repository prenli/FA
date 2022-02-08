import { useEffect, useState } from "react";

export const useDateRange = (initialRange: { start: Date; end: Date }) => {
  const [startDate, setStartDate] = useState<Date>(initialRange.start);
  const [endDate, setEndDate] = useState<Date>(initialRange.end);

  useEffect(() => {
    initialRange.start = startDate;
    initialRange.end = endDate;
  }, [startDate, endDate, initialRange]);

  return {
    startDate,
    setStartDate,
    endDate,
    setEndDate,
  };
};
