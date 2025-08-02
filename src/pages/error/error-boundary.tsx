import { Component, type ReactNode, type ErrorInfo } from "react";
import Button from "../../components/ui/button";

interface ErrorBoundaryProps {
  children: ReactNode;
}

class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  { error: Error | null; info: unknown }
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);

    this.state = { error: null, info: null };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({ error, info: errorInfo });
  }

  render() {
    const { error, info } = this.state;

    return (
      <>
        {error ? (
          <section>
            <div className="min-h-screen sm:flex sm:justify-center">
              <div className="max-w-[640px] p-8 text-center">
                <span className="material-symbols-outlined !text-7xl !font-bold">
                  rocket_launch
                </span>
                <div className="mb-6">
                  <div className="mb-4 flex items-center justify-center gap-2">
                    <span className="xs:text-2xl -mb-1.5 font-bold">
                      Houston, we have a problem.
                    </span>
                  </div>
                  <p>
                    There was an unexpected error while processing the request.
                    If this error persists, don't hesitate to open an issue in{" "}
                    <a
                      href="https://github.com/miguelferlez/keepcoding-practica-react-av/issues"
                      target="blank"
                      className="font-medium underline transition hover:opacity-75"
                    >
                      here
                    </a>
                    .
                  </p>
                </div>
                <div className="flex justify-center">
                  <Button
                    label="Reload Page"
                    variant="outline"
                    onClick={() => window.location.reload()}
                  />
                </div>
                <div className="text-destructive mt-8 overflow-scroll rounded-lg bg-gray-100 p-4 text-left text-sm">
                  <code>{error.message}</code>
                  <code>{JSON.stringify(info)}</code>
                </div>
              </div>
            </div>
          </section>
        ) : (
          this.props.children
        )}
      </>
    );
  }
}

export default ErrorBoundary;
