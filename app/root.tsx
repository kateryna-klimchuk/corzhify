import { LinksFunction } from "@remix-run/node";
import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useRouteError,
} from "@remix-run/react";

import stylesheet from "~/tailwind.css?url";
import { CartProvider } from "~/contexts/CartContext";
import { AuthProvider } from "~/contexts/AuthContext";
import { ToastProvider } from "~/contexts/ToastContext";
import { ThemeProvider } from "~/contexts/ThemeContext";
import { WishlistProvider } from "~/contexts/WishlistContext";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
];

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="bg-white dark:bg-gray-900 transition-colors">
        <ThemeProvider>
          <AuthProvider>
            <ToastProvider>
              <WishlistProvider>
                <CartProvider>
                  <Outlet />
                  <ScrollRestoration />
                  <Scripts />
                </CartProvider>
              </WishlistProvider>
            </ToastProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();

  let message = "An unexpected error occurred";
  let status = 500;

  if (isRouteErrorResponse(error)) {
    message = error.data || error.statusText;
    status = error.status;
  } else if (error instanceof Error) {
    message = error.message;
  }

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Error {status}</title>
        <Meta />
        <Links />
      </head>
      <body className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center p-8">
          <h1 className="text-4xl font-bold text-red-600 mb-4">{status}</h1>
          <p className="text-gray-700 mb-4">{message}</p>
          <a href="/" className="text-blue-600 hover:underline">
            Go Home
          </a>
        </div>
        <Scripts />
      </body>
    </html>
  );
}
