import React from "react";
import { ApolloError } from "@apollo/client";
import { Center } from "../Center/Center";
import { LoadingIndicator } from "../LoadingIndicator/LoadingIndicator";
import { QueryError } from "../QueryError/QueryError";

interface QueryLoadingWrapperProps<T> {
  error: ApolloError | undefined;
  data: T | undefined;
  SuccessComponent: (props: { data: T }) => JSX.Element;
}

export const QueryLoadingWrapper = <TData,>({
  error,
  data,
  SuccessComponent,
}: QueryLoadingWrapperProps<TData>) => {
  if (error) {
    return <QueryError />;
  }
  if (data) {
    return <SuccessComponent data={data} />;
  }
  return (
    <Center>
      <LoadingIndicator />
    </Center>
  );
};
