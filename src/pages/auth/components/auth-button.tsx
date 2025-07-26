import { Link } from "react-router";
import Button from "../../../components/ui/button";
import { logout } from "../../../services/auth";
import { useAuth, useLogoutAction } from "../../../store/hooks";

function AuthButton() {
  const isLogged = useAuth();
  const logoutAction = useLogoutAction();

  const handleLogoutClick = async () => {
    await logout();
    logoutAction();
  };

  return isLogged ? (
    <Button onClick={handleLogoutClick} variant="outline" label="Log Out" />
  ) : (
    <Link to="/login" className="btn btn-primary">
      Log In
    </Link>
  );
}

export default AuthButton;
