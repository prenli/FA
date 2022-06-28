export const toShortISOString = (date: Date) =>
  `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

export const startOfMonth = (date: Date) => {
  const resultDate = new Date(date);
  resultDate.setDate(1);
  resultDate.setHours(0, 0, 0, 0);

  return resultDate;
};

export const dateFromYYYYMMDD = (stringDate: string) => {
  const dateArray = stringDate.split("-").map((period) => parseInt(period));
  return new Date(dateArray[0], dateArray[1] - 1, dateArray[2]);
};

export const dateToYYYYMMDD = (date: Date) => {
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
};

export const isDateInRange = (
  date: Date,
  startDate: Date | undefined,
  endDate: Date | undefined
) => {
  const dateTime = date.getTime();
  const isOlder = !startDate || dateTime >= startDate.getTime();
  const isYounger = !endDate || dateTime <= endDate.getTime();

  return isOlder && isYounger;
};
