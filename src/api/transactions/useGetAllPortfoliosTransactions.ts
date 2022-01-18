import { useEffect, useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { useKeycloak } from "contexts/keycloakContext";
import { startOfMonth, endOfDay } from "date-fns";
import { TRANSACTION_FIELDS } from "./fragments";
import { AllPortfoliosTransactionsQuery } from "./types";

const TRANSACTIONS_QUERY = gql`
  ${TRANSACTION_FIELDS}
  query GetTransactions(
    $startDate: String
    $endDate: String
    $contactId: Long
  ) {
    contact(id: $contactId) {
      id
      transactions(startDate: $startDate, endDate: $endDate) {
        ...TransactionsFields
      }
    }
  }
`;

const now = new Date();
const initialRange = {
  start: startOfMonth(now),
  end: endOfDay(now),
};

export const useGetAllPortfoliosTransactions = () => {
  const { linkedContact } = useKeycloak();
  const [startDate, setStartDate] = useState<Date>(initialRange.start);
  const [endDate, setEndDate] = useState<Date>(initialRange.end);

  useEffect(() => {
    initialRange.start = startDate;
    initialRange.end = endDate;
  }, [startDate, endDate]);

  const { error, data } = useQuery<AllPortfoliosTransactionsQuery>(
    TRANSACTIONS_QUERY,
    {
      variables: {
        startDate,
        endDate,
        contactId: linkedContact,
      },
      fetchPolicy: "cache-and-network",
    }
  );

  return {
    error,
    data: data?.contact.transactions,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
  };
};
