export const getTransactionTypeName = (
  typeNamesAsMap: Record<string, string>,
  defaultTypeName: string,
  locale: string
) => {
  return typeNamesAsMap[locale.replace("-", "_")] || defaultTypeName;
};

export const getTransactionColor = (
  amountEffect: number,
  cashFlowEffect: number
) =>
  amountEffect > 0 && cashFlowEffect < 0
    ? "blue"
    : amountEffect < 0 && cashFlowEffect > 0
    ? "red"
    : amountEffect === 0 && cashFlowEffect > 0
    ? "green"
    : "gray";
