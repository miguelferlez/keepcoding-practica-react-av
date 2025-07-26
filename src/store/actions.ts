import type { AppThunk } from "./index";
import type { Credentials } from "../pages/auth/types";
import { login } from "../services/auth";

// Auth

type AuthLoginFulfilled = {
  type: "auth/login/fulfilled";
};

type AuthLoginPending = {
  type: "auth/login/pending";
};

type AuthLoginRejected = {
  type: "auth/login/rejected";
  payload: Error;
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

const authLoginRejected = (error: Error): AuthLoginRejected => ({
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
      if (error instanceof Error) {
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

type AlertResetError = {
  type: "ui/reset-error";
};

export function alertResetError(): AlertResetError {
  return { type: "ui/reset-error" };
}

export type Actions =
  | AuthLoginFulfilled
  | AuthLoginPending
  | AuthLoginRejected
  | AuthLogout
  | AlertResetError;
