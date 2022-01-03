import React from "react";
import { useNavigate } from "react-router-dom";

export const Overview = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col gap-4 items-start px-1">
      <h2 className="text-2xl font-semibold">Overview</h2>
      <button
        onClick={() => navigate("/portfolio/1")}
        className="py-2 px-4 text-white bg-blue-800 rounded-lg pointer"
      >
        Go to portfolio #1
      </button>
    </div>
  );
};
