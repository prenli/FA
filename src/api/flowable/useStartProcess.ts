import { useEffect } from "react";
import { useMutation, gql } from "@apollo/client";
import { FLOWABLE_API_NAME } from "services/apolloClient";

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

interface StartProcessResponse {
  startProcess: {
    formDefinition: string;
    taskId: string;
    processInstanceId: string;
    data: Record<string, unknown>;
  };
}

type FormDefinition = Record<string, unknown> | undefined;

export const useStartProcess = (key: string | undefined) => {
  const [startProcess, { data, loading, error, reset }] =
    useMutation<StartProcessResponse>(START_PROCESS, {
      variables: {
        key,
      },
      context: { apiName: FLOWABLE_API_NAME },
    });

  useEffect(() => {
    startProcess();
  }, [startProcess]);

  return {
    loading,
    error,
    reset,
    data: data && {
      ...data.startProcess,
      formDefinition: JSON.parse(
        data.startProcess.formDefinition
      ) as FormDefinition,
    },
  };
};
