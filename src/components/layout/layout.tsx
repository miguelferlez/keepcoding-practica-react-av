import type { ReactNode } from "react";
import Header from "./header";
import Footer from "./footer";

function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <h1 className="sr-only">%VITE_APP_TITLE%</h1>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}

export default Layout;
