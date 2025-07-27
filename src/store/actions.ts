import type { AppThunk } from "./index";
import type { Credentials } from "../pages/auth/types";
import { login } from "../services/auth";
import { AxiosError } from "axios";

// Auth

type AuthLoginFulfilled = {
  type: "auth/login/fulfilled";
};

type AuthLoginPending = {
  type: "auth/login/pending";
};

type AuthLoginRejected = {
  type: "auth/login/rejected";
  payload: AxiosError<{ message: string }>;
};

type AuthLogout = {
  type: "auth/logout";
};

const authLoginFulfilled = (): AuthLoginFulfilled => ({
  type: "auth/login/fulfilled",
});

const authLoginPending = (): AuthLoginPending => ({
  type: "auth/login/pending",
});

const authLoginRejected = (
  error: AxiosError<{ message: string }>,
): AuthLoginRejected => ({
  type: "auth/login/rejected",
  payload: error,
});

export function authLogin(
  credentials: Credentials,
  remember: boolean,
): AppThunk<Promise<void>> {
  return async function (dispatch) {
    dispatch(authLoginPending());
    try {
      await login(credentials, remember);
      dispatch(authLoginFulfilled());
    } catch (error) {
      if (error instanceof AxiosError) {
        dispatch(authLoginRejected(error));
      }
      throw error;
    }
  };
}

export function authLogout(): AuthLogout {
  return { type: "auth/logout" };
}

// UI

type UiResetError = {
  type: "ui/reset-error";
};

export function uiResetError(): UiResetError {
  return { type: "ui/reset-error" };
}

export type Actions =
  | AuthLoginFulfilled
  | AuthLoginPending
  | AuthLoginRejected
  | AuthLogout
  | UiResetError;
