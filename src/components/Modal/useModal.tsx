import { useCallback, useRef, useState } from "react";
import { Modal } from "./Modal";

export const useModal = <TInitialData,>() => {
  const modalInitialDataRef = useRef({});
  const [isOpen, setIsOpen] = useState(false);

  const onOpen = useCallback((initialData: TInitialData) => {
    if (initialData) {
      modalInitialDataRef.current = initialData;
    }
    setIsOpen(true);
  }, []);
  const onClose = useCallback(() => {
    setIsOpen(false);
    modalInitialDataRef.current = {};
  }, []);

  return {
    Modal,
    onOpen,
    modalProps: {
      isOpen,
      onClose,
    },
  };
};
