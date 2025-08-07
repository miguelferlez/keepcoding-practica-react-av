import { Link } from "react-router";
import Modal from "@/components/shared/modal";
import Button from "@/components/ui/button";
import { logout } from "@/services/auth";
import { useAuth, useLogoutAction, useModal } from "@/store/hooks";

function AuthButton() {
  const isLogged = useAuth();
  const { isModalOpen, closeModal, showModal } = useModal();
  const logoutAction = useLogoutAction();

  async function handleLogout() {
    await logout();
    logoutAction();
  }

  return isLogged ? (
    <>
      <Button onClick={showModal} variant="outline" label="Log Out" />
      {isModalOpen && (
        <Modal
          title="Logging out?"
          text="Are you sure you want to close your session? Authentication will be required to access this page."
          buttonLabel="Yes, log out"
          type="warning"
          isOpen={isModalOpen}
          onClose={closeModal}
          onConfirm={handleLogout}
        />
      )}
    </>
  ) : (
    <Link to="/login" className="btn btn-primary">
      Log In
    </Link>
  );
}

export default AuthButton;
