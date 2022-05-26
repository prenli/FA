export const round = (number: number, decimalPlaces: number) =>
  Math.round((number + Number.EPSILON) * Math.pow(10, decimalPlaces)) /
  Math.pow(10, decimalPlaces);
