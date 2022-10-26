import { ReactNode } from "react";
import { useQuery, gql } from "@apollo/client";
import { useKeycloak } from "providers/KeycloakProvider";
import { IntercomProvider } from "react-use-intercom";
import { DOCUMENT_FIELDS } from "../api/documents/fragments";
import { Document } from "../api/documents/types";
import { useGetContactInfo } from "../api/initial/useGetContactInfo";
import { getFetchPolicyOptions } from "../api/utils";

const INTERCOM_SETTINGS_FILE = "intercomSettings.json";
let INTERCOM_APP_ID = "";

type IntercomProviderWrapperProps = {
  children: ReactNode;
};

interface DocumentsByNameQuery {
  documents: Document[];
}

const DOCUMENTS_BY_NAME_QUERY = gql`
  ${DOCUMENT_FIELDS}
  query getDocumentsByNameQuery($fileName: String) {
    documents(filterText: $fileName) {
      ...DocumentFields
    }
  }
`;

export const IntercomProviderWrapper = ({
  children,
}: IntercomProviderWrapperProps) => {
  //Setting up Intercom chat properties and getting app id from FA Back documents library
  const { linkedContact } = useKeycloak();
  const contactDataFromFA = useGetContactInfo(true, linkedContact);
  const contactName = contactDataFromFA.data?.name;
  const contactRepresentatives = contactDataFromFA.data?.representees ?? [];
  const representativeName = contactRepresentatives[0]?.name;

  const { data } = useQuery<DocumentsByNameQuery>(DOCUMENTS_BY_NAME_QUERY, {
    variables: {
      fileName: INTERCOM_SETTINGS_FILE,
    },
    ...getFetchPolicyOptions(`useGetDocumentsByFilename.${linkedContact}`),
  });

  const intercomSettingsFile = data?.documents?.find(
    (document) => document.fileName === INTERCOM_SETTINGS_FILE
  );
  const intercomSettingsFileContent =
    intercomSettingsFile && JSON.parse(window.atob(intercomSettingsFile.data));
  INTERCOM_APP_ID = intercomSettingsFileContent?.appId
    ? intercomSettingsFileContent?.appId
    : "";
  console.log("data", data);
  console.log("data", INTERCOM_APP_ID);
  if (!data) return <>{children}</>;
  return (
    <IntercomProvider
      appId={INTERCOM_APP_ID}
      autoBoot={true}
      autoBootProps={{
        name: contactName,
        customAttributes: { representativeName: representativeName },
      }}
    >
      {children}
    </IntercomProvider>
  );
};
