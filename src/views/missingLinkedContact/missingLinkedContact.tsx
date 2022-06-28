import {
  Process,
  useGetContactProcesses,
} from "api/flowable/useGetContactProcesses";
import { QueryLoadingWrapper } from "components";
import { Navigate } from "react-router";
import { NoOnboardingProcess } from "./components/NoOnboardingProcess";

export const MissingLinkedContactWrapper = () => {
  const queryData = useGetContactProcesses("ONBOARDING");

  return (
    <QueryLoadingWrapper
      {...queryData}
      SuccessComponent={MissingLinkedContact}
    />
  );
};

interface MissingLinkedContactProps {
  data: Process[];
}

const MissingLinkedContact = ({ data }: MissingLinkedContactProps) => {
  if (data.length !== 0) {
    const { key, name } = data[0];
    return <Navigate to={`/form/${key}`} state={{ header: name }} />;
  }

  return <NoOnboardingProcess />;
};
