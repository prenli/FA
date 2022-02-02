import { ApolloError } from "@apollo/client";

export interface QueryData<TData> {
  loading: boolean;
  error: ApolloError | undefined;
  data: TData | undefined;
}
