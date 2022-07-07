import { useEffect, useState } from "react";

export const useStateWithDebounceCallback = (
  callback: (newValue: string) => void,
  delay = 500
) => {
  const [value, setValue] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      callback(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay, callback]);

  return { value, setValue };
};
