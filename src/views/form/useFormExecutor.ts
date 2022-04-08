import {
  useEffect,
  useState,
  useCallback,
  SetStateAction,
  Dispatch,
} from "react";
import {
  CompleteTaskResponse,
  useCompleteTask,
} from "api/flowable/useCompleteTask";
import {
  StartProcessResponseData,
  useStartProcess,
} from "api/flowable/useStartProcess";
import { useNavigate } from "react-router";
import { useParams } from "react-router-dom";

type FormDefinition = Record<string, unknown>;

interface Attachment {
  url: string;
}

interface FormData {
  formDefinition: FormDefinition | undefined;
  initialData: Record<string, unknown>;
  attachments: Attachment[] | undefined;
}

interface ProcessData {
  taskId: string;
  processInstanceId: string;
}

export const useFormExecutor = () => {
  const [formData, setFormData] = useState<FormData>();
  const [processData, setProcessData] = useState<ProcessData>();
  const navigate = useNavigate();

  const initForm = useCallback((initFormData: StartProcessResponseData) => {
    setFormData({
      formDefinition: JSON.parse(initFormData.formDefinition) as FormDefinition,
      initialData: initFormData.data,
      attachments: initFormData.data?.attachments as Attachment[],
    });
    setProcessData({
      taskId: initFormData.taskId,
      processInstanceId: initFormData.processInstanceId,
    });
  }, []);

  useInitializeForm(initForm);

  const { completeTask } = useCompleteTask();

  const submitData =
    processData &&
    (async (submissionData: Record<string, unknown>) => {
      setFormData({
        formDefinition: undefined,
        initialData: {},
        attachments: [],
      });
      const completeTaskResponse = await completeTask({
        variables: {
          data: JSON.stringify(submissionData),
          taskId: processData.taskId,
          processInstanceId: processData.processInstanceId,
        },
      });
      const { processFinished } = finishCurrentTask(
        completeTaskResponse.data?.completeTask,
        setFormData
      );

      if (processFinished) {
        navigate("/");
      }
    });

  return {
    submitData,
    formDefinition: formData?.formDefinition,
    initialData: formData?.initialData,
  };
};

const useInitializeForm = (
  onFormInitialization: (initData: StartProcessResponseData) => void
) => {
  const { formKey } = useParams();
  const { startProcess } = useStartProcess(formKey);
  useEffect(() => {
    let hookRunning = true;
    const initializeForm = async () => {
      const responseData = (await startProcess()).data?.startProcess;
      if (hookRunning && responseData) {
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
  nextTask: CompleteTaskResponse | undefined,
  setFormData: Dispatch<SetStateAction<FormData | undefined>>
) => {
  const formDefinition = nextTask?.formDefinition
    ? JSON.parse(nextTask?.formDefinition)
    : null;

  // process not ended we have next task
  if (formDefinition) {
    setFormData({
      formDefinition,
      initialData: nextTask?.data || {},
      attachments: nextTask?.data?.attachments as Attachment[],
    });
  }

  return {
    processFinished: !formDefinition,
  };
};
