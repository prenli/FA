import { useContext } from "react";
import { createContext, ReactNode, useReducer, useEffect } from "react";
import { ReactComponent as RefreshIcon } from "assets/refresh.svg";
import { Button, ErrorMessage, LoadingIndicator } from "components";
import { useModifiedTranslation } from "hooks/useModifiedTranslation";
import {
  keycloakService,
  keycloakServiceInitialState,
  KeycloakServiceStateType,
} from "services/keycloakService";

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
      <ErrorMessageWithRefresh headerI18Key="messages.authorisationError" />
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
      <ErrorMessageWithRefresh headerI18Key="messages.missingLinkedContact" />
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

interface ErrorMessageWithRefreshProps {
  headerI18Key: string;
}

const ErrorMessageWithRefresh = ({
  headerI18Key,
}: ErrorMessageWithRefreshProps) => {
  const { t } = useModifiedTranslation();

  return (
    <div className="container m-4 mx-auto">
      <ErrorMessage header={t(headerI18Key)}>
        <div className="mb-4">{t("messages.problemResolveInstructions")}</div>
        <Button
          onClick={() => window.location.reload()}
          LeftIcon={RefreshIcon}
        />
      </ErrorMessage>
    </div>
  );
};
