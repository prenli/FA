import { ReactNode } from "react";
import {
  Slide,
  toast,
  ToastContainer,
  ToastContainerProps,
} from "react-toastify";

interface ToastProps extends ToastContainerProps {
  children?: ReactNode;
}

export const Toast = (props: ToastProps) => (
  <ToastContainer
    position={toast.POSITION.BOTTOM_CENTER}
    hideProgressBar
    theme="colored"
    transition={Slide}
    autoClose={false}
    draggablePercent={60}
    {...props}
  />
);
