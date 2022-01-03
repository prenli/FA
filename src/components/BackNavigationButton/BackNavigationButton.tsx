import React from "react";

interface BackNavigationButtonProps {
  onClick: () => void;
}

export const BackNavigationButton = ({
  onClick,
}: BackNavigationButtonProps) => (
  <button onClick={onClick} className="text-2xl font-bold">{`<-`}</button>
);
