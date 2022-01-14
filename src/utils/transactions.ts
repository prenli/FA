export const getTransactionTypeName = (
  typeNamesAsMap: Record<string, string>,
  defaultTypeName: string,
  locale: string
) => {
  return typeNamesAsMap[locale.replace("-", "_")] || defaultTypeName;
};
