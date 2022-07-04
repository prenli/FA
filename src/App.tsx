import { ErrorBoundary } from "components/ErrorBoundary/ErrorBoundary";
import { InitialLanguageProvider } from "providers/InitialLanguageProvider";
import { KeycloakProvider } from "providers/KeycloakProvider";
import { keycloakService } from "services/keycloakService";
import { Toast } from "./components";
import { UserWithLinkedContactRoutes } from "./pages/userWithLinkedContact/routes";
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
                <ServiceWorkerRegistrationProvider>
                  <UserWithLinkedContactRoutes />
                </ServiceWorkerRegistrationProvider>
              </APILanguageProvider>
            </PersistedApolloProvider>
          </KeycloakProvider>
          <Toast />
        </ErrorBoundary>
      </ServiceWorkerRegistrationProvider>
    </InitialLanguageProvider>
  );
}

export default App;
