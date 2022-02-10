import { useContext } from "react";
import { createContext, ReactNode, useReducer, useEffect } from "react";
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
  InitializingComponent: JSX.Element;
  MissingLinkedContactComponent: JSX.Element;
};

export const KeycloakProvider = (props: KeycloakProviderProps) => {
  const {
    keycloak,
    children,
    InitializingComponent,
    MissingLinkedContactComponent,
  } = props;
  const { error, initialized, linkedContact } = keycloak.state;
  const [, forceRender] = useReducer((previous) => previous + 1, 0);

  useEffect(() => {
    keycloak.subscribe(forceRender);
    return () => keycloak.unsubscribe();
  }, [forceRender, keycloak]);

  if (error) {
    return <div className="m-4">Authorisation server error</div>;
  }

  if (!initialized) {
    return InitializingComponent;
  }

  if (!linkedContact) {
    return MissingLinkedContactComponent;
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
