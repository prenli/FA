import { KeycloakProvider } from "providers/KeycloakProvider";
import { ToastContainer } from "react-toastify";
import { keycloakService } from "services/keycloakService";
import { LoadingIndicator, LocaleFeeder } from "./components";
import { RootRoutes } from "./pages/routes";
import { PersistedApolloProvider } from "./providers/PersistedApolloProvider";
import { ServiceWorkerRegistrationProvider } from "./providers/ServiceWorkerRegistrationProvider";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div>
      <KeycloakProvider
        keycloak={keycloakService}
        InitializingComponent={
          <div className="h-screen">
            <LoadingIndicator center />
          </div>
        }
        MissingLinkedContactComponent={<div>Missing linked contact.</div>}
      >
        <PersistedApolloProvider>
          <LocaleFeeder>
            <ServiceWorkerRegistrationProvider>
              <RootRoutes />
            </ServiceWorkerRegistrationProvider>
          </LocaleFeeder>
        </PersistedApolloProvider>
      </KeycloakProvider>
      <ToastContainer />
    </div>
  );
}

export default App;
