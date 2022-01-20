import React from "react";
import { HoldingPosition, SecurityDetailsPosition } from "api/holdings/types";
import { useNavigate } from "react-router-dom";
import { BackNavigationButton, Heading } from "../../components";

interface HoldingDetailsProps {
  data: Omit<HoldingPosition, "security"> & {
    security: SecurityDetailsPosition;
  };
}

export const HoldingDetails = ({ data }: HoldingDetailsProps) => {
  const navigate = useNavigate();
  console.log(data);

  return (
    <div>
      <Heading>
        <BackNavigationButton onClick={() => navigate(-1)} />
        {data.security.name ?? ""}
      </Heading>
      <div className="flex-1">{JSON.stringify(data)}</div>
    </div>
  );
};
