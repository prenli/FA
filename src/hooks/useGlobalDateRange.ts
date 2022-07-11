import { useEffect, useReducer } from "react";
import { startOfMonth } from "utils/date";
import { ReactSubscriber } from "utils/ReactSubscriber";

// state for keeping date range btw mounting/unmounting for range date pickers
interface StorageState {
  startDate: Date;
  endDate: Date;
}

class GlobalDateRange extends ReactSubscriber<StorageState> {
  constructor() {
    super({
      startDate: startOfMonth(new Date()),
      endDate: new Date(),
    });
  }

  setStartDate(newDate: Date) {
    this.state.startDate = newDate;
    this.updateState();
  }

  setEndDate(newDate: Date) {
    this.state.endDate = newDate;
    this.updateState();
  }
}

const globalDateRange = new GlobalDateRange();

export const useGlobalDateRange = () => {
  const [, forceRender] = useReducer((previous) => previous + 1, 0);

  useEffect(() => {
    const index = globalDateRange.subscribe(forceRender);
    return () => globalDateRange.unsubscribe(index);
  }, []);

  return {
    ...globalDateRange.State,
    setStartDate: (newDate: Date) => {
      globalDateRange.setStartDate(newDate);
    },
    setEndDate: (newDate: Date) => {
      globalDateRange.setEndDate(newDate);
    },
  };
};
