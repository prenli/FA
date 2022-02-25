import { useGetContactInfo } from "api/initial/useGetContactInfo";
import { LoadingIndicator, QueryError } from "components";
import { useFeedI18nextWithLocale } from "./useFeedI18nextWithLocale";

interface LocaleFeederProps {
  children: JSX.Element;
}

export const LocaleFeeder = ({ children }: LocaleFeederProps) => {
  const { data, error } = useGetContactInfo();
  const { isReady } = useFeedI18nextWithLocale(data?.language);

  if (error && !data) {
    return <QueryError />;
  }

  if (!isReady) {
    return (
      <div className="h-screen">
        <LoadingIndicator center />
      </div>
    );
  }

  return children;
};
