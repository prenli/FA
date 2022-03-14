import { ReactComponent as ChevronLeft } from "assets/chevron-left.svg";

interface BackNavigationButtonProps {
  onClick: () => void;
}

export const BackNavigationButton = ({
  onClick,
}: BackNavigationButtonProps) => (
  <button onClick={onClick} className="text-2xl font-bold cursor-pointer">
    <ChevronLeft />
  </button>
);
