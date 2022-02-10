import { ReactNode, useEffect, useState } from "react";
import { ReactComponent as RefreshIcon } from "assets/refresh.svg";
import { Button, Center } from "components";
import { useTranslation } from "react-i18next";
import * as serviceWorkerRegistration from "../serviceWorkerRegistration";

interface ServiceWorkerRegistrationProviderProps {
  children: ReactNode;
}

export const ServiceWorkerRegistrationProvider = ({
  children,
}: ServiceWorkerRegistrationProviderProps) => {
  const { t } = useTranslation();
  const [showUpdateMessage, setShowUpdateMessage] = useState(false);
  const [serviceWorker, setServiceWorker] = useState<ServiceWorker | null>(
    null
  );

  const onServiceWorkerUpdate = (registration: ServiceWorkerRegistration) => {
    setShowUpdateMessage(true);
    setServiceWorker(registration.waiting);
  };

  useEffect(() => {
    serviceWorkerRegistration.register({
      onUpdate: onServiceWorkerUpdate,
    });
  }, []);

  const onPageRefresh = () => {
    serviceWorker?.postMessage({ type: "SKIP_WAITING" });
    setShowUpdateMessage(false);
    window.location.reload();
  };

  if (!showUpdateMessage) {
    return <>{children}</>;
  }

  return (
    <>
      {children}
      <div className="fixed inset-x-0 bottom-0 py-4 px-2 bg-white border-t">
        <Center>
          <div className="flex flex-col gap-2 items-center text-center whitespace-pre-line">
            <p>{t("messages.newVersion")}</p>
            <Button onClick={onPageRefresh}>
              <RefreshIcon />
            </Button>
          </div>
        </Center>
      </div>
    </>
  );
};
