import type { ReactNode } from "react";

const NavBar = ({ children }: { children: ReactNode }) => {
  return (
    <nav className="wrapper mb-8">
      <div className="divide-b">
        <ul className="flex flex-col gap-4 py-4 sm:flex-row sm:items-center">
          {children}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
