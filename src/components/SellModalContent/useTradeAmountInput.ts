import { useMemo, useState } from "react";
import { round } from "utils/number";

const INPUT_MODE = {
  PERCENTAGE: "PERCENTAGE",
  CURRENCY: "CURRENCY",
};
type Keys = keyof typeof INPUT_MODE;

interface InputModeOption {
  id: typeof INPUT_MODE[Keys];
  label: string;
}

export const useTradeAmountInput = (marketValue: number, currency: string) => {
  const inputModesOptions = useMemo(
    () => [
      {
        id: INPUT_MODE.PERCENTAGE,
        label: "%",
      },
      {
        id: INPUT_MODE.CURRENCY,
        label: currency,
      },
    ],
    [currency]
  );

  const [{ inputValue, inputMode }, setInputState] = useState<{
    inputMode: InputModeOption;
    inputValue: number;
  }>({ inputMode: inputModesOptions[1], inputValue: 0 });

  const onInputModeChange = (newValue: InputModeOption) => {
    if (isNaN(marketValue)) {
      setInputState((previousState) => ({
        ...previousState,
        inputMode: newValue,
      }));
      return;
    }

    if (newValue.id === INPUT_MODE.PERCENTAGE) {
      setInputState((previousState) => ({
        ...previousState,
        inputValue: round((previousState.inputValue / marketValue) * 100, 2),
        inputMode: newValue,
      }));
    } else if (newValue.id === INPUT_MODE.CURRENCY) {
      setInputState((previousState) => ({
        ...previousState,
        inputValue: round((previousState.inputValue * marketValue) / 100, 2),
        inputMode: newValue,
      }));
    }
  };
  const setTradeAmountToHalf = () => {
    if (inputMode.id === INPUT_MODE.PERCENTAGE) {
      setInputState((previousState) => ({
        ...previousState,
        inputValue: 50,
      }));
    } else if (inputMode.id === INPUT_MODE.CURRENCY) {
      setInputState((previousState) => ({
        ...previousState,
        inputValue: round(marketValue / 2, 2),
      }));
    }
  };
  const setTradeAmountToAll = () => {
    if (inputMode.id === INPUT_MODE.PERCENTAGE) {
      setInputState((previousState) => ({
        ...previousState,
        inputValue: 100,
      }));
    } else if (inputMode.id === INPUT_MODE.CURRENCY) {
      setInputState((previousState) => ({
        ...previousState,
        inputValue: marketValue,
      }));
    }
  };
  const tradeAmount =
    inputMode.id === INPUT_MODE.CURRENCY
      ? inputValue
      : round((inputValue * marketValue) / 100, 2);
  const isTradeAmountCorrect =
    !isNaN(marketValue) && tradeAmount >= 0 && tradeAmount <= marketValue;

  return {
    inputValue,
    setInputState,
    inputModesOptions,
    inputMode,
    isTradeAmountCorrect,
    tradeAmount,
    setTradeAmountToAll,
    setTradeAmountToHalf,
    onInputModeChange,
  };
};
