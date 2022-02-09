import React from "react";
import { useGetContactInfo } from "api/initial/useGetContactInfo";
import { Center, LoadingIndicator, QueryError } from "components";
import { useFeedI18nextWithLocale } from "./useFeedI18nextWithLocale";

interface LocaleFeederProps {
  children: JSX.Element;
}

export const LocaleFeeder = ({ children }: LocaleFeederProps) => {
  const { data, error } = useGetContactInfo();
  const { isReady } = useFeedI18nextWithLocale(data?.language);

  if (error) {
    return <QueryError />;
  }

  if (!isReady) {
    return (
      <Center>
        <LoadingIndicator />
      </Center>
    );
  }

  return children;
};
