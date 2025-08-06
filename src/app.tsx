import { lazy, Suspense } from "react";
import { Navigate, Outlet, Route, Routes } from "react-router";
import Layout from "./components/layout/layout";
import Loader from "./components/ui/loader";
import RequireAuth from "./pages/auth/components/require-auth";
import NotFoundPage from "./pages/error/not-found-page";

const LazyLoginPage = lazy(() => import("./pages/auth/login-page"));
const LazyAdvertsPage = lazy(() => import("./pages/adverts/adverts-page"));
const LazyAdvertPage = lazy(() => import("./pages/adverts/advert-page"));

function App() {
  return (
    <Routes>
      <Route index element={<Navigate to="/adverts" />} />
      <Route
        path="/login"
        element={
          <Suspense fallback={<Loader />}>
            <LazyLoginPage />
          </Suspense>
        }
      />
      <Route
        path="/adverts"
        element={
          <RequireAuth>
            <Layout>
              <Outlet />
            </Layout>
          </RequireAuth>
        }
      >
        <Route
          index
          element={
            <Suspense fallback={<Loader />}>
              <LazyAdvertsPage />
            </Suspense>
          }
        />
        <Route
          path=":advertId"
          element={
            <Suspense fallback={<Loader />}>
              <LazyAdvertPage />
            </Suspense>
          }
        />
      </Route>
      <Route path="/not-found" element={<NotFoundPage />} />
      <Route path="*" element={<Navigate to="/not-found" />} />
    </Routes>
  );
}

export default App;
