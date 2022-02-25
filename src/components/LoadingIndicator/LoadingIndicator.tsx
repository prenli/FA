import { ReactComponent as Spinner } from "assets/spinner.svg";
import { Center } from "../Center/Center";

interface LoadingIndicatorProps {
  center?: boolean;
}

export const LoadingIndicator = ({ center = false }: LoadingIndicatorProps) => {
  const SpinnerNode = (
    <Spinner className="w-16 h-16 text-gray-200 animate-spin fill-blue-600" />
  );
  return center ? <Center>{SpinnerNode}</Center> : SpinnerNode;
};
