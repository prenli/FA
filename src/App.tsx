import { ErrorBoundary } from "components/ErrorBoundary/ErrorBoundary";
import { InitialLanguageProvider } from "providers/InitialLanguageProvider";
import { KeycloakProvider } from "providers/KeycloakProvider";
import { ToastContainer } from "react-toastify";
import { keycloakService } from "services/keycloakService";
import { RootRoutes } from "./pages/routes";
import { APILanguageProvider } from "./providers/APILanguageProvider/APILanguageProvider";
import { PersistedApolloProvider } from "./providers/PersistedApolloProvider";
import { ServiceWorkerRegistrationProvider } from "./providers/ServiceWorkerRegistrationProvider";
import "react-toastify/dist/ReactToastify.css";
import "styles/fonts.css";

function App() {
  return (
    <InitialLanguageProvider>
      <ServiceWorkerRegistrationProvider>
        <ErrorBoundary>
          <KeycloakProvider keycloak={keycloakService}>
            <PersistedApolloProvider>
              <APILanguageProvider>
                <RootRoutes />
              </APILanguageProvider>
            </PersistedApolloProvider>
          </KeycloakProvider>
          <ToastContainer />
        </ErrorBoundary>
      </ServiceWorkerRegistrationProvider>
    </InitialLanguageProvider>
  );
}

export default App;
