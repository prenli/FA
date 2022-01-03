import React from "react";
import { ApolloProvider } from "@apollo/client";
import { KeycloakProvider } from "contexts/keycloakContext";
import { apolloClient } from "services/apolloClient";
import { keycloakService } from "services/keycloakService";

function App() {
  return (
    <KeycloakProvider
      keycloak={keycloakService}
      InitializingComponent={<div>Initializing...</div>}
      MissingLinkedContactComponent={<div>Missing linked contact...</div>}
    >
      <ApolloProvider client={apolloClient}>
        <div>Page content</div>
      </ApolloProvider>
    </KeycloakProvider>
  );
}

export default App;
