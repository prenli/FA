import React, { ReactNode, useState } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  error: Error | undefined;
  errorInfo: React.ErrorInfo | undefined;
}

export class ErrorBoundary extends React.Component<Props, State> {
  public state: State = { error: undefined, errorInfo: undefined };

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
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
  errorInfo: React.ErrorInfo | undefined;
}

const ErrorInfo = ({ error, errorInfo }: ErrorInfoProps) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="px-2">
      <div onClick={() => setShowDetails(true)}>Something went wrong</div>
      {showDetails && (
        <div className="p-2">
          <div className="font-semibold">{error?.message}</div>
          <div>{errorInfo?.componentStack}</div>
        </div>
      )}
    </div>
  );
};
