import { Link } from "react-router";
import AppLogo from "../icons/app-logo";
import Button from "../ui/button";
import Popover from "../ui/popover";

function Header() {
  return (
    <header className="wrapper">
      <div className="divide-b flex items-center justify-between gap-4 py-4">
        <Link to="/" className="transition-opacity hover:opacity-75">
          <AppLogo className="w-38 sm:w-68" />
        </Link>
        <nav>
          <ul className="flex items-center gap-4">
            <li>
              <Popover icon="language">
                <li>
                  <a href="">🇬🇧</a>
                </li>
                <li>
                  <a href="">🇪🇸</a>
                </li>
              </Popover>
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
