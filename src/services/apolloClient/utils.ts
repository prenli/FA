import traverse from "traverse";

// we filter data related to holding history - we do not want to persist it in local storage (because of its size)
export const persistenceMapper = async (data: string) => {
  const parsed = JSON.parse(data);
  traverse(parsed).forEach(function () {
    if (this.key?.includes("MarketDataObservation")) {
      this.remove();
    }
    if (this.key?.includes("marketDataHistory")) {
      this.remove();
    }
  });

  return JSON.stringify(parsed);
};
