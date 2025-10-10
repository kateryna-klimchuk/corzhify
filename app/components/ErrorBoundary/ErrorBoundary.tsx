import { useRouteError, isRouteErrorResponse, Link } from "@remix-run/react";
import { Icon } from "~/components/Icon/Icon";

export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="max-w-md w-full text-center">
          <div className="mb-8">
            <h1 className="text-6xl font-bold text-primary-600 mb-2">
              {error.status}
            </h1>
            <h2 className="text-2xl font-semibold text-slate-800 mb-4">
              {error.status === 404 ? "Page Not Found" : "Oops! Something went wrong"}
            </h2>
            <p className="text-slate-600 mb-6">
              {error.data || error.statusText}
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <Link
              to="/"
              className="px-6 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors font-medium shadow-sm"
            >
              Go Home
            </Link>
            <button
              onClick={() => window.history.back()}
              className="px-6 py-3 border border-gray-300 text-slate-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <div className="inline-block p-4 bg-red-100 rounded-full mb-4">
            <svg
              className="w-16 h-16 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-semibold text-slate-800 mb-4">
            Unexpected Error
          </h2>
          <p className="text-slate-600 mb-6">
            We're sorry, but something unexpected happened. Please try again later.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <Link
            to="/"
            className="px-6 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors font-medium shadow-sm"
          >
            Go Home
          </Link>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 border border-gray-300 text-slate-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
          >
            Reload Page
          </button>
        </div>
      </div>
    </div>
  );
}
