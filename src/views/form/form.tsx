import { Form } from "@formio/react";
import { useStartProcess } from "api/flowable/useStartProcess";
import { Logo, UserMenu } from "components";
import { useKeycloak } from "providers/KeycloakProvider";
import { useParams } from "react-router-dom";
import "./styles.css";

interface FormViewProps {
  header?: string;
}

export const FormView = ({ header }: FormViewProps) => {
  const { formKey } = useParams();
  const { data } = useStartProcess(formKey);
  const formDefinition = data?.startProcess?.formDefinition;
  const { userProfile } = useKeycloak();

  return formDefinition ? (
    <div>
      <div className="bg-white sm:border-b border-gray-200 sm:shadow-md ">
        <div className="md:container flex gap-2 items-center p-2 md:mx-auto text-2xl font-bold">
          <div className="mr-2">
            <Logo />
          </div>
          <div className="grow">{header}</div>
          <div className="px-2">
            <UserMenu />
          </div>
        </div>
      </div>
      <div className="sm:pt-4 pb-4">
        <Form
          as="span"
          form={JSON.parse(formDefinition)}
          onSubmit={(e: unknown) => console.log(e)}
          onError={console.log}
          onChange={console.log}
          onSubmitDone={console.log}
          submission={{
            data: {
              username: userProfile?.username,
              firstName: userProfile?.firstName,
              lastName: userProfile?.lastName,
              email: userProfile?.email,
              ...data.startProcess.data,
            },
          }}
        />
      </div>
    </div>
  ) : null;
};
