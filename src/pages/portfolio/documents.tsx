import { useParams } from "react-router-dom";

export const Documents = () => {
  const { portfolioId } = useParams();
  return (
    <h2 className="text-2xl font-semibold">{`Portfolio #${portfolioId} Documents`}</h2>
  );
};
