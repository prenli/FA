import { ApolloClient, InMemoryCache, HttpLink, from } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { LocalStorageWrapper, CachePersistor } from "apollo3-cache-persist";
import { API_URL } from "config";
import { keycloakService } from "./keycloakService";

const httpLink = new HttpLink({
  uri: `${API_URL}/graphql`,
  fetchOptions: {
    mode: "cors",
  },
});

const authMiddleware = setContext(async (operation, { headers }) => {
  const token = await keycloakService.getToken();
  return {
    headers: {
      ...headers,
      authorization: `Bearer ${token}`,
    },
  };
});

export const getPersistedApolloClient = async () => {
  const cache = new InMemoryCache({
    typePolicies: {
      PortfolioReport: {
        keyFields: ["portfolioId"],
        fields: {
          portfolioReportItems: {
            merge: false,
          },
        },
      },
      PortfolioReportItem: {
        keyFields: ["portfolioId", "security", ["id"]],
      },
      AnalysisDTO: {
        keyFields: ["allocationTopLevel", ["portfolio", ["id"]]],
      },
    },
  });
  const persistor = new CachePersistor({
    cache,
    storage: new LocalStorageWrapper(window.localStorage),
    maxSize: 20971520, // 20 MB
  });

  await persistor.restore();

  return new ApolloClient({
    link: from([authMiddleware, httpLink]),
    cache,
  });
};
