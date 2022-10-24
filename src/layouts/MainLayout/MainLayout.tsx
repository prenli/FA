import { Suspense } from "react";
import { LoadingIndicator } from "components";
import { ErrorBoundary } from "components/ErrorBoundary/ErrorBoundary";
import { useGetContractIdData } from "providers/ContractIdProvider";
import { useKeycloak } from "providers/KeycloakProvider";
import { Outlet } from "react-router-dom";
import { useIntercom } from 'react-use-intercom';
import { useGetContactInfo } from "../../api/initial/useGetContactInfo";

export const MainLayout = () => {

  //Setting up Intercom chat properties
  const {linkedContact} = useKeycloak()
  console.log("Linked contact id", linkedContact)
  const { selectedContact } = useGetContractIdData();
  console.log("Linked contact object", selectedContact)
  const contactDataFromFA = useGetContactInfo(true,linkedContact)
  const contactRepresentatives = contactDataFromFA.data?.representees
  const representativeName = contactRepresentatives && contactRepresentatives[0] && contactRepresentatives[0].name
  console.log("representativeName", representativeName)
  const contactName = contactDataFromFA.data?.name
  const { boot} = useIntercom();

  boot({
    //TODO: Add email, phone
    name: contactName,
    customAttributes: { representativeName: representativeName},
  })

  return (
    <div className="box-border text-gray-900 bg-gray-50 h-[calc(100vh-0.5rem)]">
      <ErrorBoundary>
        <Suspense fallback={<LoadingIndicator center />}>
          <Outlet />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};
