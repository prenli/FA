export const toShortISOString = (date: Date) =>
  `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

export const startOfMonth = (date: Date) => {
  const resultDate = new Date(date);
  resultDate.setDate(1);
  resultDate.setHours(0, 0, 0, 0);

  return resultDate;
};
