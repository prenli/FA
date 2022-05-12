import { Fragment, MutableRefObject, ReactNode } from "react";
import { Dialog, Transition } from "@headlessui/react";

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  modalInitialFocusRef: MutableRefObject<null>;
}

export const Modal = ({
  isOpen,
  onClose,
  children,
  modalInitialFocusRef,
}: ModalProps) => {
  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog onClose={onClose} initialFocus={modalInitialFocusRef}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25" />
        </Transition.Child>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <div className="flex fixed inset-0 justify-center items-center p-4">
            <div className="flex justify-center items-center min-h-full">
              <Dialog.Panel>{isOpen && children}</Dialog.Panel>
            </div>
          </div>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
};
