import React from "react";
import { useParams } from "react-router-dom";

export const Trading = () => {
  const { portfolioId } = useParams();
  return (
    <h2 className="text-2xl font-semibold">{`Portfolio #${portfolioId} Trading`}</h2>
  );
};
