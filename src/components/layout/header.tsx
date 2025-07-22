import { useEffect, useState } from "react";
import { Link } from "react-router";
import AppLogo from "../icons/app-logo";
import Button from "../ui/button";
import Dropdown from "../ui/dropdown";

function Header() {
  const TABLET_BREAKPOINT = 768;
  const defaultIsMobile = window.innerWidth < TABLET_BREAKPOINT;
  const [isMobile, setIsMobile] = useState(defaultIsMobile);
  const [isNavOpen, setIsNavOpen] = useState(false);

  useEffect(() => {
    setIsMobile(defaultIsMobile);
  });

  return (
    <header className="wrapper mb-8">
      <div className="divide-b flex items-center justify-between gap-4 py-4">
        <Link to="/" className="transition-opacity hover:opacity-75">
          <AppLogo className="w-38 sm:w-68" />
        </Link>
        <nav>
          <ul className="flex items-center gap-4">
            <li>
              <Dropdown icon="language">
                <li>
                  <a href="">🇬🇧</a>
                </li>
                <li>
                  <a href="">🇪🇸</a>
                </li>
              </Dropdown>
            </li>
            <li>
              <Button label="Log In" variant="primary" />
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
