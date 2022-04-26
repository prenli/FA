import { Form } from "@formio/react";
import { LoadingIndicator, Logo, UserMenu } from "components";
import "./styles.scss";
import { useLocation } from "react-router-dom";
import { ApiError } from "./components/ApiError";
import { Attachments } from "./components/Attachments";
import { ProcessNotFound } from "./components/ProcessNotFound";
import { useFormExecutor } from "./useFormExecutor";

interface FormViewProps {
  header?: string;
  initialData?: Record<string, unknown>;
}

interface LocationProps {
  state: FormViewProps & {
    from: Location;
  };
}

export const FormView = ({
  header,
  initialData: propsInitialData = {},
}: FormViewProps) => {
  const {
    formDefinition,
    initialData: apiInitialData = {},
    submitData,
    processData,
    attachments,
    apiError,
    resetApiError,
  } = useFormExecutor();

  const { state: locationState } = useLocation() as unknown as LocationProps;
  const initialData = {
    ...locationState?.initialData,
    ...propsInitialData,
    ...apiInitialData,
  };

  return (
    <>
      {formDefinition && !apiError && (
        <div className="flex overflow-hidden flex-col h-full">
          <div className="bg-white border-b border-gray-200 shadow-md">
            <div className="md:container flex gap-2 items-center p-2 md:mx-auto text-2xl font-bold">
              <div className="mr-2">
                <Logo />
              </div>
              <div className="grow">{header || locationState?.header}</div>
              <div className="px-2">
                <UserMenu />
              </div>
            </div>
          </div>
          <div className="overflow-y-auto grow-1">
            <div className="py-3 mx-auto h-full tw-container">
              <div className="grid grid-cols-1 gap-4 px-2">
                {attachments && attachments.length > 0 && (
                  <Attachments attachments={attachments} />
                )}
                {submitData && processData && (
                  <div className="formio-form">
                    <Form
                      key={processData.taskId}
                      form={formDefinition}
                      onSubmit={submitData}
                      submission={{
                        data: initialData,
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      {!formDefinition && !apiError && !processData && (
        <div className="h-screen">
          <LoadingIndicator center />
        </div>
      )}
      {apiError && <ApiError resetApiError={resetApiError} />}
      {processData && !processData.processInstanceId && <ProcessNotFound />}
    </>
  );
};
