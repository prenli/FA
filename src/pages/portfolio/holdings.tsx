import React from "react";
import { useNavigate, useParams } from "react-router-dom";

export const Holdings = () => {
  const navigate = useNavigate();
  const { portfolioId } = useParams();
  return (
    <div className="flex flex-col gap-4 items-start px-1">
      <h2 className="text-2xl font-semibold">{`Portfolio #${portfolioId} Holdings`}</h2>
      <button
        onClick={() => navigate(`./holdings/${portfolioId}`)}
        className="py-2 px-4 text-white bg-red-800 rounded-lg pointer"
      >
        Go to holding #1
      </button>
    </div>
  );
};
