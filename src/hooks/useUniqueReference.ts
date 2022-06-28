import { useKeycloak } from "../providers/KeycloakProvider";

export const useUniqueReference = () => {
  const { linkedContact } = useKeycloak();
  return () => `${linkedContact}:${Date.now()}`; // generates unique string for transaction recognition (reference)
};
