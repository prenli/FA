import { useReducer } from "react";
import { gql, useQuery } from "@apollo/client";
import { Option } from "components/Select/Select";
import { useGetContractIdData } from "providers/ContractIdProvider";
import { tradableTag } from "services/permissions/trade";
import { SecurityTypeCode } from "../holdings/types";
import { useGetContactInfo } from "../initial/useGetContactInfo";
import { getFetchPolicyOptions } from "../utils";

const TRADABLE_SECURITIES_QUERY = gql`
  query GetTradableSecurities(
    $currency: String
    $countryCode: String
    $securityType: String
    $name: String
    $tradableTag: [String]
  ) {
    securities(
      tags: $tradableTag
      countryCode: $countryCode
      securityType: $securityType
      name: $name
    ) {
      id
      name
      isinCode
      securityCode
      url
      url2
      country {
        id
        name
        code
      }
      latestMarketData {
        id
        date: obsDate
        price: closeView
      }
      type {
        id
        name
        code
      }
      currency {
        id
        securityCode
      }
      fxRate(quoteCurrency: $currency)
    }
  }
`;

export interface TradableSecurity {
  id: number;
  name: string;
  securityCode: string;
  isinCode: string;
  url: string;
  url2: string;
  latestMarketData?: {
    price: number;
    date: string;
  };
  currency: {
    securityCode: string;
  };
  country?: {
    code: string;
    name: string;
  };
  type?: {
    code: SecurityTypeCode;
    name: string;
  };
  fxRate: number;
}

export interface TradableSecuritiesQuery {
  securities: TradableSecurity[];
}

interface TradableSecuritiesFilters {
  country: Option;
  type: Option;
  name: string;
}

const filtersReducer = (
  filters: TradableSecuritiesFilters,
  newFilters: Partial<TradableSecuritiesFilters>
) => ({ ...filters, ...newFilters });

const noFilterOption = {
  id: null,
  label: "-",
};

const initialFilters = {
  country: noFilterOption,
  type: noFilterOption,
  name: "",
};

// filters are temporary hardcoded, in future will be provided by API
const filtersOptions = {
  country: [
    noFilterOption,
    {
      id: "US",
      label: "USA",
    },
    {
      id: "SE",
      label: "Sweden",
    },
    {
      id: "FI",
      label: "Finland",
    },
  ],
  type: [
    noFilterOption,
    {
      label: "Collective investment vehicles",
      id: "C",
    },
    {
      label: "Fund",
      id: "FUND",
    },
    {
      label: "Stock",
      id: "STOCK",
    },
    {
      label: "Private Equity",
      id: "PE",
    },
    {
      label: "ETF",
      id: "ETFs",
    },
    {
      label: "Bond",
      id: "BOND",
    },
  ],
};

export const useGetTradebleSecurities = () => {
  const { selectedContactId } = useGetContractIdData();
  const { data: { portfoliosCurrency } = { portfoliosCurrency: "EUR" } } =
    useGetContactInfo(false, selectedContactId);
  const [filters, setFilters] = useReducer(filtersReducer, initialFilters);

  const { loading, error, data } = useQuery<TradableSecuritiesQuery>(
    TRADABLE_SECURITIES_QUERY,
    {
      variables: {
        countryCode: filters.country.id,
        securityType: filters.type.id,
        name: filters.name,
        currency: portfoliosCurrency,
        tradableTag,
      },
      ...getFetchPolicyOptions(
        `useGetTradebleSecurities.${filters.country.id}.${filters.type.id}.${filters.name}`
      ),
    }
  );

  return {
    loading,
    error,
    data: data?.securities,
    filters,
    setFilters,
    filtersOptions,
  };
};
