import Keycloak, {
  KeycloakError,
  KeycloakInstance,
  KeycloakProfile,
  KeycloakPromise,
} from "keycloak-js";

const keycloakInitConfig = {
  onLoad: "check-sso",
  silentCheckSsoRedirectUri:
    window.location.origin + "/keycloak-silent-check-sso.html",
  pkceMethod: "S256",
} as const;

type FAKeycloakProfile = KeycloakProfile & {
  attributes?: {
    linked_contact: string[];
  };
};

type FAKeycloakInstance = Omit<
  KeycloakInstance,
  "profile" | "loadUserProfile"
> & {
  profile?: FAKeycloakProfile;
  loadUserProfile(): KeycloakPromise<FAKeycloakProfile, void>;
};

type SubscribeFunctionType = () => void;

export type KeycloakServiceStateType = {
  initialized: boolean;
  authenticated: boolean;
  linkedContact: string | undefined;
};

export const keycloakServiceInitialState = {
  initialized: false,
  authenticated: false,
  linkedContact: undefined,
};

class KeycloakService {
  keycloak;
  state: KeycloakServiceStateType = keycloakServiceInitialState;
  subscribeFunction: SubscribeFunctionType | undefined;

  constructor(instance: FAKeycloakInstance) {
    this.keycloak = instance;
    this.init();
  }

  init() {
    this.keycloak.init(keycloakInitConfig);

    this.keycloak.onReady = this.onReady;
    this.keycloak.onAuthError = this.onError;
    this.keycloak.onAuthRefreshSuccess = this.onAuthRefreshSuccess;
    this.keycloak.onAuthRefreshError = this.onError;
    this.keycloak.onAuthLogout = this.onAuthLogout;
    this.keycloak.onTokenExpired = this.onTokenExpired;
  }

  subscribe(subscribeFunction: SubscribeFunctionType) {
    this.subscribeFunction = subscribeFunction;
  }

  unsubscribe() {
    this.subscribeFunction = undefined;
  }

  notifyStateChanged() {
    this.subscribeFunction?.();
  }

  onError = (errorData?: KeycloakError) => {
    console.log(errorData);
  };

  onTokenExpired = async () => {
    await this.keycloak.updateToken(5);
  };

  onAuthRefreshSuccess = async () => {
    await this.updateLinkedContact();
    this.updateState();
  };

  onAuthLogout = () => {
    this.state = {
      ...keycloakServiceInitialState,
    };
    this.updateState();
    this.keycloak.login();
  };

  onReady = async (authenticated: boolean) => {
    if (!authenticated) {
      this.keycloak.login();
      return;
    }
    this.state = {
      ...this.state,
      initialized: true,
      authenticated: authenticated,
    };
    await this.updateLinkedContact();
    this.updateState();
  };

  updateLinkedContact = async () => {
    if (this.state.authenticated) {
      const profile = await this.keycloak.loadUserProfile();
      const linkedContact = this.getLinkedContactFromProfile(profile);
      if (linkedContact !== this.state.linkedContact) {
        this.state = {
          ...this.state,
          linkedContact: linkedContact,
        };
      }
    }
  };

  getLinkedContactFromProfile(profile: FAKeycloakProfile) {
    return profile?.attributes?.linked_contact[0];
  }

  updateState = () => {
    this.notifyStateChanged();
  };

  isRefreshTokenValid = () => {
    if (!this.keycloak?.refreshTokenParsed?.exp) {
      return false;
    }
    return this.keycloak.refreshTokenParsed.exp > Date.now() / 1000;
  };
}

export const keycloakService = new KeycloakService(Keycloak());
