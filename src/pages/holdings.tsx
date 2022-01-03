import React from "react";
import { useNavigate } from "react-router-dom";

export const Holdings = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col gap-4 items-start px-1">
      <h2 className="text-2xl font-semibold">All Holdings</h2>
      <button
        onClick={() => navigate("/holdings/1")}
        className="py-2 px-4 text-white bg-red-800 rounded-lg pointer"
      >
        Go to holding #1
      </button>
    </div>
  );
};
