export const getNameFromBackendTranslations = (
  backendTranslationsMap: Record<string, string>,
  fallbackTranslation: string,
  locale: string
) => {
  return (
    backendTranslationsMap[locale.replace("-", "_")] || fallbackTranslation
  );
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
