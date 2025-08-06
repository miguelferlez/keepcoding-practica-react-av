import { AxiosError } from "axios";
import type { AppThunk } from "./index";
import type { Advert } from "@/pages/adverts/types";
import type { Credentials } from "@/pages/auth/types";

//#region Auth

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
  return async function (dispatch, _getState, { api, router }) {
    dispatch(authLoginPending());

    try {
      await api.auth.login(credentials, remember);
      dispatch(authLoginFulfilled());
      router.navigate(router.state.location.state?.from ?? "/", {
        replace: true,
      });
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

//#endregion

//#region Ui

type UiResetError = {
  type: "ui/reset-error";
};

export const uiResetError = (): UiResetError => {
  return { type: "ui/reset-error" };
};

//#endregion

//#region Adverts

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
      dispatch(advertsLoadedPending());
      const adverts = await api.adverts.getAdverts();
      setTimeout(() => {
        dispatch(advertsLoadedFulfilled(adverts));
      }, 1000);
    } catch (error) {
      if (error instanceof AxiosError) {
        dispatch(advertsLoadedRejected(error));
      }
      throw error;
    }
  };
}

//#endregion

//#region Adverts tags

type AdvertsTagsFulfilled = {
  type: "adverts/tags/fulfilled";
  payload: string[];
};

type AdvertsTagsPending = {
  type: "adverts/tags/pending";
};

type AdvertsTagsRejected = {
  type: "adverts/tags/rejected";
  payload: AxiosError<{ message: string }>;
};

const advertsTagsFulfilled = (tags: string[]): AdvertsTagsFulfilled => ({
  type: "adverts/tags/fulfilled",
  payload: tags,
});

const advertsTagsPending = (): AdvertsTagsPending => ({
  type: "adverts/tags/pending",
});

const advertsTagsRejected = (
  error: AxiosError<{ message: string }>,
): AdvertsTagsRejected => ({
  type: "adverts/tags/rejected",
  payload: error,
});

export function advertsTags(): AppThunk<Promise<void>> {
  return async function (dispatch, _getState, { api }) {
    dispatch(advertsTagsPending());

    try {
      const tags = await api.adverts.getAdvertsTags();
      dispatch(advertsTagsFulfilled(tags));
    } catch (error) {
      if (error instanceof AxiosError) {
        dispatch(advertsTagsRejected(error));
      }
      throw error;
    }
  };
}

//#endregion

//#region Adverts detail

type AdvertsDetailFulfilled = {
  type: "adverts/detail/fulfilled";
  payload: Advert;
};
type AdvertsDetailPending = {
  type: "adverts/detail/pending";
};
type AdvertsDetailRejected = {
  type: "adverts/detail/rejected";
  payload: AxiosError<{ message: string }>;
};

const advertsDetailFulfilled = (advert: Advert): AdvertsDetailFulfilled => ({
  type: "adverts/detail/fulfilled",
  payload: advert,
});
const advertsDetailPending = (): AdvertsDetailPending => ({
  type: "adverts/detail/pending",
});
const advertsDetailRejected = (
  error: AxiosError<{ message: string }>,
): AdvertsDetailRejected => ({
  type: "adverts/detail/rejected",
  payload: error,
});

export function advertsDetail(advertId: string): AppThunk<Promise<void>> {
  return async function (dispatch, _getState, { api }) {
    dispatch(advertsDetailPending());

    try {
      const advert = await api.adverts.getAdvertById(advertId);
      dispatch(advertsDetailFulfilled(advert));
    } catch (error) {
      if (error instanceof AxiosError) {
        dispatch(advertsDetailRejected(error));
      }
      throw error;
    }
  };
}

//#endregion

export type Actions =
  | AuthLoginFulfilled
  | AuthLoginPending
  | AuthLoginRejected
  | AuthLogout
  | UiResetError
  | AdvertsLoadedFulfilled
  | AdvertsLoadedPending
  | AdvertsLoadedRejected
  | AdvertsTagsFulfilled
  | AdvertsTagsPending
  | AdvertsTagsRejected
  | AdvertsDetailFulfilled
  | AdvertsDetailPending
  | AdvertsDetailRejected;
