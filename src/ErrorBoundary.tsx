import { Component, PropsWithChildren } from 'react';

export class ErrorBoundary extends Component<PropsWithChildren<{}>, { hasError: boolean }> {
  state = { hasError: false };
  render() {
    if (this.state.hasError) {
      return (
        <>
          <h1>Something went wrong.</h1>
          <button
            onClick={() => {
              window.history.replaceState({}, '', window.location.pathname);
              window.location.reload();
            }}
          >
            reload
          </button>{' '}
        </>
      );
    }
    return this.props.children;
  }
  componentDidCatch(error: any, info: any) {
    console.error(error, info);
  }
  static getDerivedStateFromError(error: any) {
    return { hasError: true };
  }
}
