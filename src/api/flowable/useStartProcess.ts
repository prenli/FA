import { useMutation, gql } from "@apollo/client";
import { FLOWABLE_API_NAME } from "services/apolloClient";
import { Attachment } from "../../views/form/useFormExecutor";

const START_PROCESS = gql`
  mutation ($key: String) {
    startProcess(key: $key) {
      formDefinition
      taskId
      processInstanceId
      data
    }
  }
`;

export interface StartProcessResponseData {
  formDefinition: string;
  taskId: string;
  processInstanceId: string;
  data: {
    attachments?: Record<string, Attachment>;
  };
}

export const useStartProcess = (key: string | undefined) => {
  const [startProcess, { loading, error, reset }] = useMutation<{
    startProcess: StartProcessResponseData;
  }>(START_PROCESS, {
    variables: {
      key,
    },
    context: { apiName: FLOWABLE_API_NAME },
  });

  return {
    loading,
    error,
    reset,
    startProcess,
  };
};
