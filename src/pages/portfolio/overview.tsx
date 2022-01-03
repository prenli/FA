import React from "react";
import { useParams } from "react-router-dom";

export const Overview = () => {
  const { portfolioId } = useParams();
  return (
    <h2 className="text-2xl font-semibold">{`Portfolio #${portfolioId} Overview`}</h2>
  );
};
