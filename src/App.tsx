import React from "react";
import { KeycloakProvider } from "providers/KeycloakProvider";
import { keycloakService } from "services/keycloakService";
import { LocaleFeeder } from "./components";
import { RootRoutes } from "./pages/routes";
import { PersistedApolloProvider } from "./providers/PersistedApolloProvider";

function App() {
  return (
    <KeycloakProvider
      keycloak={keycloakService}
      InitializingComponent={<div>Initializing...</div>}
      MissingLinkedContactComponent={<div>Missing linked contact...</div>}
    >
      <PersistedApolloProvider>
        <LocaleFeeder>
          <RootRoutes />
        </LocaleFeeder>
      </PersistedApolloProvider>
    </KeycloakProvider>
  );
}

export default App;
