import { ApolloClient, InMemoryCache, HttpLink, from } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { LocalStorageWrapper, CachePersistor } from "apollo3-cache-persist";
import { API_URL } from "config";
import { keycloakService } from "../keycloakService";
import { isInstalled } from "../pwa";
import { persistenceMapper } from "./utils";

const httpLink = new HttpLink({
  uri: `${API_URL}/graphql`,
  //uri: `${API_URL}/services/fund/graphql`,
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
    Document: {
      keyFields: ["identifier"],
    },
    TransactionType: {
      keyFields: ["typeCode"],
    },
  },
});

export const persistor = new CachePersistor({
  cache,
  storage: new LocalStorageWrapper(window.localStorage),
  maxSize: 20971520, // 20 MB
  persistenceMapper: persistenceMapper,
});

export const getPersistedApolloClient = async () => {
  await persistor.restore();

  if (!isInstalled) {
    persistor.pause();
  }

  return new ApolloClient({
    link: from([authMiddleware, httpLink]),
    cache,
  });
};
