import { Link } from "react-router";
import AppLogo from "../icons/app-logo";
import AuthButton from "@/pages/auth/components/auth-button";
import { useTheme } from "@/store/hooks";

function Header() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="wrapper">
      <div className="divide-b flex items-center justify-between gap-4 py-4">
        <Link to="/" className="transition-opacity hover:opacity-75">
          <AppLogo className="w-38 sm:w-68" />
        </Link>
        <nav>
          <ul className="flex items-center gap-4">
            {/* <li>
              // TODO: integrate i18next in app
              <Popover icon="language">
                <li>
                  <a href="">🇬🇧</a>
                </li>
                <li>
                  <a href="">🇪🇸</a>
                </li>
              </Popover>
            </li> */}
            <li>
              <button
                onClick={toggleTheme}
                className="text-primary flex items-center p-1 transition-opacity hover:opacity-75"
              >
                {theme === "dark" ? (
                  <span className="material-symbols-outlined">bedtime</span>
                ) : (
                  <span className="material-symbols-outlined">sunny</span>
                )}
              </button>
            </li>
            <li>
              <AuthButton />
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
