import { useAppDispatch, useAppSelector } from ".";
import type { Credentials } from "../pages/auth/types";
import { authLogin, authLogout, alertResetError } from "./actions";
import { getIsLogged } from "./selectors";

export function useAuth() {
  return useAppSelector(getIsLogged);
}

export function useLoginAction() {
  const dispatch = useAppDispatch();
  return function (credentials: Credentials, remember: boolean) {
    return dispatch(authLogin(credentials, remember));
  };
}
export function useLogoutAction() {
  const dispatch = useAppDispatch();
  return function () {
    return dispatch(authLogout());
  };
}

export function useAlertResetAction() {
  const dispatch = useAppDispatch();
  return function () {
    return dispatch(alertResetError());
  };
}
