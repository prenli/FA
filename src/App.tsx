import React from "react";
import { ApolloProvider } from "@apollo/client";
import { KeycloakProvider } from "contexts/keycloakContext";
import { apolloClient } from "services/apolloClient";
import { keycloakService } from "services/keycloakService";
import { LocaleFeeder } from "./components";
import { RootRoutes } from "./pages/routes";

function App() {
  return (
    <KeycloakProvider
      keycloak={keycloakService}
      InitializingComponent={<div>Initializing...</div>}
      MissingLinkedContactComponent={<div>Missing linked contact...</div>}
    >
      <ApolloProvider client={apolloClient}>
        <LocaleFeeder>
          <RootRoutes />
        </LocaleFeeder>
      </ApolloProvider>
    </KeycloakProvider>
  );
}

export default App;
