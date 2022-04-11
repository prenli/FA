import { Form } from "@formio/react";
import { LoadingIndicator, Logo, UserMenu } from "components";
import "./styles.css";
import { useLocation } from "react-router-dom";
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
  } = useFormExecutor();

  const { state: locationState } = useLocation() as unknown as LocationProps;
  const initialData = {
    ...locationState?.initialData,
    ...propsInitialData,
    ...apiInitialData,
  };

  return formDefinition ? (
    <div>
      <div className="bg-white sm:border-b border-gray-200 sm:shadow-md ">
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
      <div className="sm:pt-4 pb-4">
        {submitData && (
          <Form
            form={formDefinition}
            onSubmit={submitData}
            onError={console.log}
            onChange={console.log}
            submission={{
              data: initialData,
            }}
          />
        )}
      </div>
    </div>
  ) : (
    <div className="h-screen">
      <LoadingIndicator center />
    </div>
  );
};
