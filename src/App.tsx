import { KeycloakProvider } from "providers/KeycloakProvider";
import { keycloakService } from "services/keycloakService";
import { LocaleFeeder } from "./components";
import { RootRoutes } from "./pages/routes";
import { PersistedApolloProvider } from "./providers/PersistedApolloProvider";
import { ServiceWorkerRegistrationProvider } from "./providers/ServiceWorkerRegistrationProvider";

function App() {
  return (
    <KeycloakProvider
      keycloak={keycloakService}
      InitializingComponent={<div>Initializing...</div>}
      MissingLinkedContactComponent={<div>Missing linked contact...</div>}
    >
      <PersistedApolloProvider>
        <LocaleFeeder>
          <ServiceWorkerRegistrationProvider>
            <RootRoutes />
          </ServiceWorkerRegistrationProvider>
        </LocaleFeeder>
      </PersistedApolloProvider>
    </KeycloakProvider>
  );
}

export default App;
