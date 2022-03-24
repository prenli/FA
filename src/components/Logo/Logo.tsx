import { useNavigate } from "react-router";
import { useParams } from "react-router-dom";

export const Logo = () => {
  const { portfolioId } = useParams();
  const navigate = useNavigate();
  return (
    <div
      className="rounded cursor-pointer h-[40px] w-[40px]"
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
