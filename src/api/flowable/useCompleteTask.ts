import { useMutation, gql } from "@apollo/client";
import { FLOWABLE_API_NAME } from "services/apolloClient";
import { Attachment } from "../../views/form/useFormExecutor";

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

export interface TaskResponse {
  formDefinition: string;
  taskId: string;
  processInstanceId: string;
  data?: {
    attachments?: Record<string, Attachment>;
  };
}

export const useCompleteTask = () => {
  const [completeTask, { data, loading, error, reset }] = useMutation<{
    completeTask: TaskResponse;
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
