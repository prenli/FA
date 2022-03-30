import { ReactNode, useCallback, useEffect, useState } from "react";
import { ReactComponent as RefreshIcon } from "assets/refresh.svg";
import { Button, Center } from "components";
import { useModifiedTranslation } from "hooks/useModifiedTranslation";
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

const cachesToClearOnUpdate = [
  "keycloak",
  "images",
  "translations",
  "custom-html",
];

const RefreshToast = ({ registration }: RefreshToastProps) => {
  const { t } = useModifiedTranslation();
  const [loading, setLoading] = useState<boolean>(false);

  const onPageRefresh = async () => {
    setLoading(true);
    registration.waiting?.postMessage({ type: "SKIP_WAITING" });
    // clear caches
    (await caches.keys()).forEach((cacheName) => {
      if (cachesToClearOnUpdate.includes(cacheName)) caches.delete(cacheName);
    });
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
