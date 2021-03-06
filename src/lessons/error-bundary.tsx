import { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };
  static defaultProps = {
    fallback: <div>Something went wrong</div>,
  };
  public static getDerivedStateFromError(_: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      // return <h1>Sorry.. there was an error</h1>;
      console.log({ hasError: this.state.hasError });
      return this.props.fallback;
    }

    return this.props.children;
  }
}

export { ErrorBoundary };
