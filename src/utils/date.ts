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
  return new Date(dateArray[0], dateArray[1], dateArray[2]);
};
