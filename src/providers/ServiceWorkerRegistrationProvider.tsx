import { ReactNode, useCallback, useEffect } from "react";
import { ReactComponent as RefreshIcon } from "assets/refresh.svg";
import { Button, Center } from "components";
import { useTranslation } from "react-i18next";
import { Slide, toast } from "react-toastify";
import * as serviceWorkerRegistration from "../serviceWorkerRegistration";

interface ServiceWorkerRegistrationProviderProps {
  children: ReactNode;
}

export const ServiceWorkerRegistrationProvider = ({
  children,
}: ServiceWorkerRegistrationProviderProps) => {
  const { t } = useTranslation();

  const onServiceWorkerUpdate = useCallback(
    (registration: ServiceWorkerRegistration) => {
      const onPageRefresh = async () => {
        registration.waiting?.postMessage({ type: "SKIP_WAITING" });
        // clear caches
        (await caches.keys()).forEach((cacheName) => caches.delete(cacheName));
        window.location.reload();
      };
      toast.info(
        <Center>
          <div className="flex flex-col gap-2 items-center text-center whitespace-pre-line">
            <p>{t("messages.newVersion")}</p>
            <Button onClick={onPageRefresh} LeftIcon={RefreshIcon} />
          </div>
        </Center>,
        {
          toastId: "newVersionToast",
          position: toast.POSITION.BOTTOM_CENTER,
          hideProgressBar: true,
          autoClose: false,
          theme: "light",
          transition: Slide,
          icon: false,
        }
      );
    },
    [t]
  );

  useEffect(() => {
    serviceWorkerRegistration.register({
      onUpdate: onServiceWorkerUpdate,
    });
  }, [onServiceWorkerUpdate]);

  return <>{children}</>;
};
