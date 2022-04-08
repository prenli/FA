import { useMutation, gql } from "@apollo/client";
import { FLOWABLE_API_NAME } from "services/apolloClient";

const COMPLETE_TASK = gql`
  mutation ($taskId: String, $processInstanceId: String, $data: String) {
    completeTask(
      taskId: $taskId
      processInstanceId: $processInstanceId
      data: $data
    ) {
      formDefinition
      taskId
      processInstanceId
      data
    }
  }
`;

export interface CompleteTaskResponse {
  formDefinition: string;
  taskId: string;
  processInstanceId: string;
  data: Record<string, unknown>;
}

export const useCompleteTask = () => {
  const [completeTask, { data, loading, error, reset }] = useMutation<{
    completeTask: CompleteTaskResponse;
  }>(COMPLETE_TASK, {
    context: { apiName: FLOWABLE_API_NAME },
  });

  return {
    loading,
    error,
    reset,
    data,
    completeTask,
  };
};
