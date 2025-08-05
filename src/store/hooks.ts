import { useAppDispatch, useAppSelector } from ".";
import {
  advertsLoaded,
  advertsTags,
  authLogin,
  authLogout,
  uiResetError,
} from "./actions";
import { getIsLogged } from "./selectors";
import type { Credentials } from "@/pages/auth/types";

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

export function useUiResetErrorAction() {
  const dispatch = useAppDispatch();
  return function () {
    return dispatch(uiResetError());
  };
}

export function useAdvertsLoadedAction() {
  const dispatch = useAppDispatch();
  return function () {
    return dispatch(advertsLoaded());
  };
}

export function useAdvertsTagsAction() {
  const dispatch = useAppDispatch();
  return function () {
    return dispatch(advertsTags());
  };
}
