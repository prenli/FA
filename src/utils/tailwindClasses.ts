// tailwind optimize bundle size for production and contain only string classes names that appear in code
// below functions helps use classes programmatically
// read more on https://tailwindcss.com/docs/content-configuration

export const getGridColsClass = (colsNumber: number) => {
  switch (colsNumber) {
    case 1:
      return "grid-cols-1";
    case 2:
      return "grid-cols-2";
    case 3:
      return "grid-cols-3";
    case 4:
      return "grid-cols-4";
    case 5:
      return "grid-cols-5";
    case 6:
      return "grid-cols-6";
    case 7:
      return "grid-cols-7";
    case 8:
      return "grid-cols-8";
    case 9:
      return "grid-cols-9";
    case 10:
      return "grid-cols-10";
    default:
      throw new Error("Column number not defined");
  }
};
