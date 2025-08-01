import type { AppThunk } from "./index";
import type { Credentials } from "../pages/auth/types";
import { login } from "../services/auth";
import { AxiosError } from "axios";
import type { Advert } from "../pages/adverts/types";

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

export const uiResetError = (): UiResetError => {
  return { type: "ui/reset-error" };
};

// Adverts

type AdvertsLoadedFulfilled = {
  type: "adverts/loaded/fulfilled";
  payload: Advert[];
};

type AdvertsLoadedPending = {
  type: "adverts/loaded/pending";
};

type AdvertsLoadedRejected = {
  type: "adverts/loaded/rejected";
  payload: AxiosError<{ message: string }>;
};

const advertsLoadedFulfilled = (adverts: Advert[]): AdvertsLoadedFulfilled => ({
  type: "adverts/loaded/fulfilled",
  payload: adverts,
});

const advertsLoadedPending = (): AdvertsLoadedPending => ({
  type: "adverts/loaded/pending",
});

const advertsLoadedRejected = (
  error: AxiosError<{ message: string }>,
): AdvertsLoadedRejected => ({
  type: "adverts/loaded/rejected",
  payload: error,
});

export function advertsLoaded(): AppThunk<Promise<void>> {
  return async function (dispatch, getState, { api }) {
    const state = getState();

    if (state.adverts.loaded) {
      return;
    }

    try {
      advertsLoadedPending();
      const adverts = await api.adverts.getAdverts();
      dispatch(advertsLoadedFulfilled(adverts));
    } catch (error) {
      if (error instanceof AxiosError) {
        dispatch(advertsLoadedRejected(error));
      }
      throw error;
    }
  };
}

export type Actions =
  | AuthLoginFulfilled
  | AuthLoginPending
  | AuthLoginRejected
  | AuthLogout
  | UiResetError
  | AdvertsLoadedFulfilled
  | AdvertsLoadedPending
  | AdvertsLoadedRejected;
