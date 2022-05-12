import { useGetPortfolioOptions } from "hooks/useGetPortfolioOptions";
import { Select } from "../Select/Select";

interface PortfolioOption {
  id: number;
  urlPrefix: string;
  label: string;
}

interface PortfolioSelectProps {
  portfolioId: number | undefined;
  onChange: (option: PortfolioOption) => void;
  includeTotal?: boolean;
  label?: string;
}

export const PortfolioSelect = ({
  portfolioId,
  onChange,
  includeTotal = true,
  label,
}: PortfolioSelectProps) => {
  const portfolioOptions = useGetPortfolioOptions(includeTotal);

  const currentPortfolio = portfolioOptions.find(
    (portfolio) => portfolio.id === portfolioId
  );

  return (
    <Select
      value={currentPortfolio}
      onChange={onChange}
      options={portfolioOptions}
      label={label}
    />
  );
};
