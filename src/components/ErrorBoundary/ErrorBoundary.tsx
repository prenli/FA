import {
  ReactNode,
  useState,
  Component,
  ErrorInfo as ReactErrorInfo,
} from "react";
import { useTranslation } from "react-i18next";

interface Props {
  children: ReactNode;
}

interface State {
  error: Error | undefined;
  errorInfo: ReactErrorInfo | undefined;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = { error: undefined, errorInfo: undefined };

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  componentDidCatch(error: Error, errorInfo: ReactErrorInfo) {
    this.setState({ errorInfo });
  }

  render() {
    if (this.state.error) {
      return <ErrorInfo {...this.state} />;
    }
    return this.props.children;
  }
}

interface ErrorInfoProps {
  error: Error | undefined;
  errorInfo: ReactErrorInfo | undefined;
}

const ErrorInfo = ({ error, errorInfo }: ErrorInfoProps) => {
  const { t } = useTranslation();
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="px-2">
      <div onClick={() => setShowDetails(true)}>{t("messages.error")}</div>
      {showDetails && (
        <div className="p-2">
          <div className="font-semibold">{error?.message}</div>
          <div>{errorInfo?.componentStack}</div>
        </div>
      )}
    </div>
  );
};
