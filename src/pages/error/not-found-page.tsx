import { Link } from "react-router";

function NotFoundPage() {
  return (
    <section>
      <div className="flex min-h-screen justify-center">
        <div className="max-w-sm p-8 text-center">
          <span className="text-8xl font-bold">404</span>
          <div className="mb-6">
            <div className="mb-4 flex items-center justify-center gap-2">
              <span className="xs:text-2xl -mb-1.5 font-bold">
                This page took a day off.
              </span>
              <span className="material-symbols-outlined">beach_access</span>
            </div>
            <p>
              Sorry, the page you were looking for doesn't exist or has been
              moved.
            </p>
          </div>
          <div className="flex justify-center">
            <Link to="/adverts" className="btn btn-primary">
              Back to Homepage
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default NotFoundPage;
