import { useEffect, useRef, useState } from "react";

export const useLocalStorageState = <TState>(
  key: string,
  defaultValue: TState
) => {
  const [state, setState] = useState<TState>(() => {
    const valueInLocalStorage = window.localStorage.getItem(key);
    if (valueInLocalStorage == null) {
      return defaultValue;
    }

    return JSON.parse(valueInLocalStorage) as TState;
  });

  const prevKeyRef = useRef(key);

  useEffect(() => {
    const prevKey = prevKeyRef.current;
    if (prevKey !== key) {
      // if key will change, remove previous value
      window.localStorage.removeItem(prevKey);
    }
    prevKeyRef.current = key;
    window.localStorage.setItem(key, JSON.stringify(state));
  }, [state, key]);

  return [state, setState] as const;
};
