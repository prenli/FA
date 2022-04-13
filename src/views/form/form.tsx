import { useState } from "react";
import { Form, Errors } from "@formio/react";
import { LoadingIndicator, Logo, UserMenu } from "components";
import "./styles.css";
import { useLocation } from "react-router-dom";
import { ApiError } from "./components/ApiError";
import { Attachments } from "./components/Attachments";
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

type FormError = unknown;

export const FormView = ({
  header,
  initialData: propsInitialData = {},
}: FormViewProps) => {
  const [formErrors, setFormErrors] = useState<FormError>(null);

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
        <>
          <div className="bg-white border-b border-gray-200 shadow-md ">
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
          <div className="py-3 mx-auto tw-container">
            <div className="grid grid-cols-1 gap-4 px-2">
              {attachments && attachments.length > 0 && (
                <Attachments attachments={attachments} />
              )}
              {submitData && processData && (
                <Form
                  key={processData.taskId}
                  form={formDefinition}
                  onSubmit={submitData}
                  onError={(errors: unknown) => setFormErrors(errors)}
                  submission={{
                    data: initialData,
                  }}
                />
              )}
              <Errors errors={formErrors} />
            </div>
          </div>
        </>
      )}
      {!formDefinition && !apiError && (
        <div className="h-screen">
          <LoadingIndicator center />
        </div>
      )}
      {apiError && <ApiError resetApiError={resetApiError} />}
    </>
  );
};
