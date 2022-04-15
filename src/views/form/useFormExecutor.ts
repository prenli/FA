import {
  useEffect,
  useState,
  useCallback,
  SetStateAction,
  Dispatch,
} from "react";
import { TaskResponse, useCompleteTask } from "api/flowable/useCompleteTask";
import {
  StartProcessTaskResponse,
  useStartProcess,
} from "api/flowable/useStartProcess";
import { useNavigate } from "react-router";
import { useParams } from "react-router-dom";

type FormDefinition = Record<string, unknown>;

export interface Attachment {
  url: string;
  name: string;
}

interface FormData {
  formDefinition: FormDefinition | undefined;
  initialData: Record<string, unknown>;
  attachments: Attachment[] | undefined;
}

interface ProcessData {
  taskId: string | undefined;
  processInstanceId: string | undefined;
}

const attachmentsObjectToList = (
  attachments: Record<string, Attachment> | undefined
) => (attachments ? Object.values(attachments) : []);

export const useFormExecutor = () => {
  const [formData, setFormData] = useState<FormData>();
  const [processData, setProcessData] = useState<ProcessData>();
  const navigate = useNavigate();

  const [apiError, setApiError] = useState<boolean>(false);
  const resetApiError = () => setApiError(false);

  const initForm = useCallback(
    (initFormData: StartProcessTaskResponse | undefined) => {
      if (!initFormData) {
        setProcessData({
          taskId: undefined,
          processInstanceId: undefined,
        });
        return;
      }

      setFormData({
        formDefinition: JSON.parse(
          initFormData.formDefinition
        ) as FormDefinition,
        initialData: initFormData.data || {},
        attachments: attachmentsObjectToList(initFormData.data?.attachments),
      });
      setProcessData({
        taskId: initFormData.taskId,
        processInstanceId: initFormData.processInstanceId,
      });
    },
    []
  );

  useInitializeForm(initForm);

  const { completeTask } = useCompleteTask();

  const submitData =
    processData &&
    (async (submissionData: { data: Record<string, unknown> }) => {
      const formDataBeforeSubmission = formData ? { ...formData } : undefined;
      setFormData({
        formDefinition: undefined,
        initialData: {},
        attachments: [],
      });
      try {
        const completeTaskResponse = await completeTask({
          variables: {
            data: JSON.stringify(submissionData.data),
            taskId: processData.taskId,
            processInstanceId: processData.processInstanceId,
          },
        });
        const { processFinished } = finishCurrentTask(
          completeTaskResponse.data?.completeTask,
          setFormData,
          setProcessData
        );

        if (processFinished) {
          navigate("/");
        }
      } catch (error) {
        if (formDataBeforeSubmission) {
          setFormData({
            ...formDataBeforeSubmission,
            initialData: submissionData.data,
          });
        }
        setApiError(true);
      }
    });

  return {
    submitData,
    processData,
    formDefinition: formData?.formDefinition,
    initialData: formData?.initialData,
    attachments: formData?.attachments,
    apiError,
    resetApiError,
  };
};

const useInitializeForm = (
  onFormInitialization: (initData: StartProcessTaskResponse | undefined) => void
) => {
  const { formKey } = useParams();
  const { startProcess } = useStartProcess(formKey);
  useEffect(() => {
    let hookRunning = true;
    const initializeForm = async () => {
      const responseData = (await startProcess()).data?.startProcess;
      if (hookRunning) {
        onFormInitialization(responseData);
      }
    };
    initializeForm();
    return () => {
      hookRunning = false;
    };
  }, [startProcess, onFormInitialization]);
};

const finishCurrentTask = (
  nextTask: TaskResponse | undefined,
  setFormData: Dispatch<SetStateAction<FormData | undefined>>,
  setProcessData: Dispatch<SetStateAction<ProcessData | undefined>>
) => {
  // process not ended we have next task
  if (nextTask?.formDefinition) {
    const formDefinition = JSON.parse(nextTask.formDefinition);

    setFormData({
      formDefinition,
      initialData: nextTask.data || {},
      attachments: attachmentsObjectToList(nextTask.data?.attachments),
    });
    setProcessData({
      taskId: nextTask.taskId,
      processInstanceId: nextTask.processInstanceId,
    });
  }

  return {
    processFinished: !nextTask?.formDefinition,
  };
};
