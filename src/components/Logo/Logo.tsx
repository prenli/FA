import { useNavigate } from "react-router";
import { useParams } from "react-router-dom";

export const Logo = () => {
  const { portfolioId } = useParams();
  const navigate = useNavigate();
  return (
    <div
      className="w-10 h-10 rounded cursor-pointer"
      onClick={() =>
        navigate(
          portfolioId ? `/portfolio/${portfolioId}/overview` : "/overview"
        )
      }
    >
      <img src="/logo.svg" alt="logo" />
    </div>
  );
};
