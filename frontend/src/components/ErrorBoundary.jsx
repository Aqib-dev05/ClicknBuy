import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    // Console me exact error dikh jayega so blank screen na rahe.
    console.error("React error boundary caught:", error, info);
  }

  render() {
    const { error } = this.state;
    if (error) {
      return (
        this.props.fallback ?? (
          <div style={{ padding: 24 }}>
            <h2 style={{ marginBottom: 8 }}>Something went wrong.</h2>
            <pre style={{ whiteSpace: "pre-wrap" }}>
              {String(error?.message ?? error)}
            </pre>
          </div>
        )
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

