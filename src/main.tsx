import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import { Provider } from "react-redux";
import App from "./app";
import "./index.css";
import { setAuthorizationHeader } from "./api/client";
import ErrorBoundary from "./pages/error/error-boundary";
import configureStore from "./store";
import storage from "./utils/storage";
import ThemeProvider from "./utils/theme-provider";

const accessToken = storage.get("auth");
const router = createBrowserRouter([{ path: "*", element: <App /> }]);
const store = configureStore(
  { auth: Boolean(localStorage && accessToken) },
  router,
);

if (accessToken) {
  setAuthorizationHeader(accessToken);
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary>
      <Provider store={store}>
        <ThemeProvider>
          <RouterProvider router={router} />
        </ThemeProvider>
      </Provider>
    </ErrorBoundary>
  </StrictMode>,
);
