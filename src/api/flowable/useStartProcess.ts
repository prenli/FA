import { useMutation, gql } from "@apollo/client";
import { FLOWABLE_API_NAME } from "services/apolloClient";
import { TaskResponse } from "./useCompleteTask";

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

export type StartProcessTaskResponse = TaskResponse;

export const useStartProcess = (key: string | undefined) => {
  const [startProcess, { loading, error, reset }] = useMutation<{
    startProcess: StartProcessTaskResponse;
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
