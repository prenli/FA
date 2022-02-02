import React, { ReactNode, useState, useEffect } from "react";
import { ApolloProvider } from "@apollo/client";
import { ApolloClient } from "@apollo/client/core/ApolloClient";
import { getPersistedApolloClient } from "services/apolloClient";
import { Center, LoadingIndicator } from "../components";

interface PersistedApolloProviderProps {
  children: ReactNode;
}

export const PersistedApolloProvider = ({
  children,
}: PersistedApolloProviderProps) => {
  const [client, setClient] = useState<ApolloClient<unknown>>();

  useEffect(() => {
    async function init() {
      const client = await getPersistedApolloClient();
      setClient(client);
    }

    try {
      init();
    } catch (error) {
      console.error(error);
    }
  }, []);

  if (!client) {
    return (
      <Center>
        <LoadingIndicator />
      </Center>
    );
  }

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
