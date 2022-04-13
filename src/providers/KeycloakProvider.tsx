import { useContext } from "react";
import { createContext, ReactNode, useReducer, useEffect } from "react";
import { ErrorMessage, LoadingIndicator } from "components";
import { useModifiedTranslation } from "hooks/useModifiedTranslation";
import { AuthUserRoutes } from "pages/authUser/routes";
import { ServiceWorkerRegistrationProvider } from "providers/ServiceWorkerRegistrationProvider";
import {
  keycloakService,
  keycloakServiceInitialState,
  KeycloakServiceStateType,
} from "services/keycloakService";
import { DetectedLanguageProvider } from "./DetectedLanguageProvider";
import { PersistedApolloProvider } from "./PersistedApolloProvider";

const KeycloakContext = createContext<KeycloakServiceStateType>(
  keycloakServiceInitialState
);

type KeycloakProviderProps = {
  children: ReactNode;
  keycloak: typeof keycloakService;
};

export const KeycloakProvider = (props: KeycloakProviderProps) => {
  const { keycloak, children } = props;
  const { error, initialized, linkedContact } = keycloak.state;
  const [, forceRender] = useReducer((previous) => previous + 1, 0);

  useEffect(() => {
    keycloak.subscribe(forceRender);
    return () => keycloak.unsubscribe();
  }, [forceRender, keycloak]);

  if (error) {
    return (
      <DetectedLanguageProvider>
        <KeycloakError />
      </DetectedLanguageProvider>
    );
  }

  if (!initialized) {
    return (
      <div className="h-screen">
        <LoadingIndicator center />
      </div>
    );
  }

  if (!linkedContact) {
    return (
      <DetectedLanguageProvider>
        <PersistedApolloProvider>
          <ServiceWorkerRegistrationProvider>
            <AuthUserRoutes />
          </ServiceWorkerRegistrationProvider>
        </PersistedApolloProvider>
      </DetectedLanguageProvider>
    );
  }

  return (
    <KeycloakContext.Provider value={keycloak.state}>
      {children}
    </KeycloakContext.Provider>
  );
};

export const useKeycloak = () => {
  const context = useContext(KeycloakContext);
  if (context === undefined) {
    throw new Error("useKeycloak must be used within a KeycloakProvider");
  }
  return context;
};

const KeycloakError = () => {
  const { t } = useModifiedTranslation();

  return (
    <div className="h-screen">
      <ErrorMessage header={t("messages.authorisationError")}>
        <div className="mb-4">{t("messages.problemResolveInstructions")}</div>
        <div
          onClick={() => window.location.reload()}
          className="font-semibold text-primary-500 cursor-pointer"
        >
          {t("messages.refreshPage")}
        </div>
      </ErrorMessage>
    </div>
  );
};
