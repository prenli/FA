import { gql, useQuery } from "@apollo/client";
import { getFetchPolicyOptions } from "api/utils";

const TRANSACTIONS_QUERY = gql`
  query GetBuyData($portfolioId: Long, $securityCode: String) {
    portfolio(id: $portfolioId) {
      id
      currency {
        securityCode
      }
      portfolioReport {
        portfolioId: portfolio {
          id
          contact {
            id
          }
        }
        accountBalance
      }
    }
    securities(securityCode: $securityCode) {
      id
      name
      url2
      currency {
        securityCode
      }
    }
  }
`;

interface PortfolioTransactionsQuery {
  portfolio: {
    currency: {
      securityCode: string;
    };
    portfolioReport: {
      accountBalance: number;
    };
  };
  securities: {
    name: string;
    url2: string;
    currency: {
      securityCode: string;
    };
  }[];
}

export const useGetBuyData = (
  portfolioId: string | undefined,
  securityCode: string | undefined
) => {
  const { loading, error, data } = useQuery<PortfolioTransactionsQuery>(
    TRANSACTIONS_QUERY,
    {
      variables: {
        portfolioId,
        securityCode,
      },
      ...getFetchPolicyOptions(`useGetBuyData.${portfolioId}`),
    }
  );

  return {
    loading,
    error,
    data: data && {
      securityName: data.securities[0]?.name,
      url2: data.securities[0]?.url2,
      availableCash: data.portfolio.portfolioReport.accountBalance,
      currency: data.portfolio.currency.securityCode,
    },
  };
};
