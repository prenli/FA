import React from "react";
import { KeycloakProvider } from "contexts/keycloakContext";
import { keycloakService } from "services/keycloakService";

function App() {
  return (
    <KeycloakProvider
      keycloak={keycloakService}
      InitializingComponent={<div>Initializing...</div>}
      MissingLinkedContactComponent={<div>Missing linked contact...</div>}
    >
      <div>Page content</div>
    </KeycloakProvider>
  );
}

export default App;
