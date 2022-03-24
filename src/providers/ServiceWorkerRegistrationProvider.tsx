import { ReactNode, useCallback, useEffect, useState } from "react";
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
  const onServiceWorkerUpdate = useCallback(
    (registration: ServiceWorkerRegistration) => {
      toast.info(<RefreshToast registration={registration} />, {
        toastId: "newVersionToast",
        position: toast.POSITION.BOTTOM_CENTER,
        hideProgressBar: true,
        autoClose: false,
        theme: "light",
        transition: Slide,
        icon: false,
      });
    },
    []
  );

  useEffect(() => {
    serviceWorkerRegistration.register({
      onUpdate: onServiceWorkerUpdate,
    });
  }, [onServiceWorkerUpdate]);

  return <>{children}</>;
};

interface RefreshToastProps {
  registration: ServiceWorkerRegistration;
}

const RefreshToast = ({ registration }: RefreshToastProps) => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState<boolean>(false);

  const onPageRefresh = async () => {
    setLoading(true);
    registration.waiting?.postMessage({ type: "SKIP_WAITING" });
    // clear caches
    (await caches.keys()).forEach((cacheName) => caches.delete(cacheName));
    window.location.reload();
    setLoading(false);
  };

  return (
    <Center>
      <div className="flex flex-col gap-2 items-center text-center whitespace-pre-line">
        <p>{t("messages.newVersion")}</p>
        <Button
          onClick={onPageRefresh}
          LeftIcon={RefreshIcon}
          isLoading={loading}
        />
      </div>
    </Center>
  );
};
