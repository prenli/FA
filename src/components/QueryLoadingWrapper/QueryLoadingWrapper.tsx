import { QueryData } from "api/types";
import { useTranslation } from "react-i18next";
import { Slide, toast } from "react-toastify";
import { Card } from "../Card/Card";
import { EmptyComponent } from "../EmptyComponent/EmptyComponent";
import { LoadingIndicator } from "../LoadingIndicator/LoadingIndicator";

interface QueryLoadingWrapperProps<T> extends QueryData<T> {
  SuccessComponent: (props: { data: T }) => JSX.Element;
}

const QUERY_ERROR_TOAST_ID = "QUERY_ERROR_TOAST_ID";

export const QueryLoadingWrapper = <TData,>({
  loading,
  error,
  data,
  SuccessComponent,
}: QueryLoadingWrapperProps<TData>) => {
  const { t } = useTranslation();
  if (error) {
    toast.error(t("messages.queryErrorWarning"), {
      toastId: QUERY_ERROR_TOAST_ID,
      position: toast.POSITION.BOTTOM_CENTER,
      hideProgressBar: true,
      theme: "colored",
      transition: Slide,
      autoClose: false,
    });
  }
  if (data) {
    return <SuccessComponent data={data} />;
  }
  // when offline and do not have cached data returns data === undefined, no error and not loading
  if (!loading || (error && !data)) {
    return (
      <Card>
        <EmptyComponent header={t("messages.noCachedData")}>
          {t("messages.noCachedDataInfo")}
        </EmptyComponent>
      </Card>
    );

    //<div className="min-h-[400px]">No cached data</div>;
  }
  return <LoadingIndicator center />;
};
