import { gql, useQuery } from "@apollo/client";

const TRADE_ORDERS_QUERY = gql`
  query GetContactProcesses($category: String) {
    listProcessesRunnableByMe(category: $category) {
      id
      key
      name
    }
  }
`;

type ProcessesCategories = "ONBOARDING";

export interface Process {
  key: string;
  name: string;
}

interface ContactProcessesQuery {
  listProcessesRunnableByMe: Process[];
}

export const useGetContactProcesses = (category?: ProcessesCategories) => {
  const { data, loading, error } = useQuery<ContactProcessesQuery>(
    TRADE_ORDERS_QUERY,
    {
      fetchPolicy: "network-only",
      variables: {
        category,
      },
    }
  );

  return {
    loading,
    error,
    data: data && data.listProcessesRunnableByMe,
  };
};
