import { ApolloClient, InMemoryCache, HttpLink, from } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
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

export const apolloClient = new ApolloClient({
  link: from([authMiddleware, httpLink]),
  cache: new InMemoryCache({
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
        keyFields: ["security", ["id"]],
      },
    },
  }),
});
