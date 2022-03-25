import { KeycloakProvider } from "providers/KeycloakProvider";
import { ToastContainer } from "react-toastify";
import { keycloakService } from "services/keycloakService";
import { LoadingIndicator } from "./components";
import { RootRoutes } from "./pages/routes";
import { PersistedApolloProvider } from "./providers/PersistedApolloProvider";
import { ServiceWorkerRegistrationProvider } from "./providers/ServiceWorkerRegistrationProvider";
import { UserSettingsProvider } from "./providers/UserSettingsProvider/UserSettingsProvider";
import "react-toastify/dist/ReactToastify.css";
import "styles/fonts.css";

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
          <UserSettingsProvider>
            <ServiceWorkerRegistrationProvider>
              <RootRoutes />
            </ServiceWorkerRegistrationProvider>
          </UserSettingsProvider>
        </PersistedApolloProvider>
      </KeycloakProvider>
      <ToastContainer />
    </div>
  );
}

export default App;
