import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./app";
import { BrowserRouter } from "react-router";
import ErrorBoundary from "./pages/error/error-boundary";
import { Provider } from "react-redux";
import storage from "./utils/storage";
import { setAuthorizationHeader } from "./api/client";
import configureStore from "./store";

const accessToken = storage.get("auth");
const store = configureStore({ auth: Boolean(localStorage && accessToken) });

if (accessToken) {
  setAuthorizationHeader(accessToken);
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <Provider store={store}>
          <App />
        </Provider>
      </BrowserRouter>
    </ErrorBoundary>
  </StrictMode>,
);
