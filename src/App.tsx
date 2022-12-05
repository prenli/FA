import { ErrorBoundary } from "components/ErrorBoundary/ErrorBoundary";
import { APILanguageProvider } from "providers/APILanguageProvider/APILanguageProvider";
import { DetailProvider } from "providers/ContractIdProvider";
import { InitialLanguageProvider } from "providers/InitialLanguageProvider";
import { KeycloakProvider } from "providers/KeycloakProvider";
import { PersistedApolloProvider } from "providers/PersistedApolloProvider";
import { ServiceWorkerRegistrationProvider } from "providers/ServiceWorkerRegistrationProvider";
import { keycloakService } from "services/keycloakService";
import { Toast } from "./components";
import { UserWithLinkedContactRoutes } from "./pages/userWithLinkedContact/routes";
import "react-toastify/dist/ReactToastify.css";
import "styles/fonts.css";

function App() {
  return (
    <InitialLanguageProvider>
      <ServiceWorkerRegistrationProvider>
        <ErrorBoundary>
          <KeycloakProvider keycloak={keycloakService}>
            <PersistedApolloProvider>
               <DetailProvider>
                <APILanguageProvider>
                  <ServiceWorkerRegistrationProvider>
                    <UserWithLinkedContactRoutes />
                  </ServiceWorkerRegistrationProvider>
                </APILanguageProvider>
                </DetailProvider>
            </PersistedApolloProvider>
          </KeycloakProvider>
          <Toast />
        </ErrorBoundary>
      </ServiceWorkerRegistrationProvider>
    </InitialLanguageProvider>
  );
}

export default App;
