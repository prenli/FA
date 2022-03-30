import { ReactNode, Component, ErrorInfo as ReactErrorInfo } from "react";
import { useModifiedTranslation } from "hooks/useModifiedTranslation";
import { EmptyComponent } from "../EmptyComponent/EmptyComponent";

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
  const { t } = useModifiedTranslation();

  return (
    <div className="px-2">
      <EmptyComponent header={t("messages.error")}>
        <div>{t("messages.problemResolveInstructions")}</div>
      </EmptyComponent>
    </div>
  );
};
