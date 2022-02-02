import { persistor } from "./apolloClient";

export let isInstalled = true;
export let isStandalone = false;

export const bootstrapPwa = () => {
  if (window.matchMedia("(display-mode: standalone)").matches) {
    isStandalone = true;
  }
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
