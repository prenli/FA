import { useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { startOfMonth } from "date-fns";
import { useKeycloak } from "../contexts/keycloakContext";
import { TRANSACTIONS_FIELDS } from "./fragments";
import { AllPortfoliosTransactionsQuery } from "./types";

const TRANSACTIONS_QUERY = gql`
  ${TRANSACTIONS_FIELDS}
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

export const useGetAllPortfoliosTransactions = () => {
  const { linkedContact } = useKeycloak();
  const now = new Date();
  const [startDate, setStartDate] = useState<Date>(startOfMonth(now));
  const [endDate, setEndDate] = useState<Date>(now);
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
