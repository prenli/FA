import { useEffect } from "react";
import { useMutation, gql } from "@apollo/client";
import { FLOWABLE_API_NAME } from "services/apolloClient";

const START_PROCESS = gql`
  mutation ($key: String) {
    startProcess(key: $key) {
      formDefinition
      taskId
      processInstanceId
    }
  }
`;

export const useStartProcess = (key: string | undefined) => {
  const [startProcess, { data, loading, error, reset }] = useMutation(
    START_PROCESS,
    {
      variables: {
        key,
      },
      context: { apiName: FLOWABLE_API_NAME },
    }
  );

  useEffect(() => {
    startProcess();
  }, [startProcess]);

  return { data, loading, error, reset };
};
