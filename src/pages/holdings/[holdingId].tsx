import React from "react";
import { BackNavigationButton, Heading } from "components";
import { useNavigate, useParams } from "react-router-dom";

export const Holding = () => {
  const { holdingId } = useParams();
  const navigate = useNavigate();
  return (
    <div>
      <Heading>
        <BackNavigationButton onClick={() => navigate(-1)} />
        Holding name
      </Heading>
      <h2 className="text-2xl font-semibold">{`Holding #${holdingId}`}</h2>
    </div>
  );
};
