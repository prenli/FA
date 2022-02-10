import { persistor } from "./apolloClient";

export let isInstalled = true;
export const isStandalone = window.matchMedia(
  "(display-mode: standalone)"
).matches;

export const bootstrapPwa = () => {
  window.addEventListener("beforeinstallprompt", () => {
    isInstalled = false;
  });
  window.addEventListener("appinstalled", () => {
    persistor.resume();
  });
};

export const getLastUsedLinkedContact = () => {
  return localStorage.getItem("linkedContact");
};

export const setLastUsedLinkedContact = (linkedContact: string | undefined) => {
  if (!linkedContact) {
    localStorage.removeItem("linkedContact");
    return;
  }
  localStorage.setItem("linkedContact", linkedContact);
};
