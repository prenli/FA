import React from "react";
import { QueryData } from "api/types";
import { Center } from "../Center/Center";
import { LoadingIndicator } from "../LoadingIndicator/LoadingIndicator";
import { QueryError } from "../QueryError/QueryError";

interface QueryLoadingWrapperProps<T> extends QueryData<T> {
  SuccessComponent: (props: { data: T }) => JSX.Element;
}

export const QueryLoadingWrapper = <TData,>({
  loading,
  error,
  data,
  SuccessComponent,
}: QueryLoadingWrapperProps<TData>) => {
  if (error && !data) {
    return <QueryError />;
  }
  if (data) {
    return <SuccessComponent data={data} />;
  }
  // when offline and do not have cached data returns data === undefined, no error and not loading
  if (!loading) {
    return <div className="min-h-[400px]">No cached data</div>;
  }
  return (
    <Center>
      <LoadingIndicator />
    </Center>
  );
};
