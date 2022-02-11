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
    ? ("blue" as const)
    : amountEffect < 0 && cashFlowEffect > 0
    ? ("red" as const)
    : amountEffect === 0 && cashFlowEffect > 0
    ? ("green" as const)
    : ("gray" as const);
