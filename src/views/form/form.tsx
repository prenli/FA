import { Form } from "@formio/react";
import { useStartProcess } from "api/flowable/useStartProcess";
import { useParams } from "react-router-dom";
import { useKeycloak } from "../../providers/KeycloakProvider";
import "./styles.css";

export const FormView = () => {
  const { formKey } = useParams();
  const { data } = useStartProcess(formKey);
  const formDefinition = data?.startProcess?.formDefinition;
  const { userProfile } = useKeycloak();

  return formDefinition ? (
    <div className="flex justify-center w-screen h-screen">
      <Form
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
  ) : null;
};
