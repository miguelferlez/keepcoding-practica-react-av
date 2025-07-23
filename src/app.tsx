import { Navigate, Outlet, Route, Routes } from "react-router";
import Layout from "./components/layout/layout";
import AdvertsPage from "./pages/adverts/adverts-page";

function App() {
  return (
    <Routes>
      <Route index element={<Navigate to="/adverts" />}></Route>
      <Route
        path="/adverts"
        element={
          <Layout>
            <Outlet />
          </Layout>
        }
      >
        <Route index element={<AdvertsPage />}></Route>
      </Route>
    </Routes>
  );
}

export default App;
