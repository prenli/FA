import { useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const useNavigateToPortfolioTab = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return useCallback(
    (urlPrefix: string) => {
      const currentTab = location.pathname.split("/").at(-1);
      navigate(`${urlPrefix}/${currentTab}`);
    },
    [navigate, location]
  );
};
