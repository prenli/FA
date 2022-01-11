import React from "react";
import { useGetPortfolio } from "api/useGetPortfolio";
import { BackNavigationButton, Heading as HeadingComponent } from "components";
import { useParams, useNavigate, useLocation } from "react-router-dom";

export const Heading = () => {
  const { portfolioId } = useParams();
  const { data: portfolio } = useGetPortfolio(portfolioId);
  const navigate = useNavigate();
  const location = useLocation();

  const navigateToMainTabRoute = () => {
    const rootPath = location.pathname.split("/").at(-1);
    navigate(`/${rootPath}`);
  };

  return (
    <HeadingComponent>
      <BackNavigationButton onClick={navigateToMainTabRoute} />
      {portfolio?.name ?? "Portfolio"}
    </HeadingComponent>
  );
};
