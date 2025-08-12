import { AxiosError } from "axios";
import type { AppThunk } from "./index";
import type { Advert, CreateAdvertDto } from "@/pages/adverts/types";
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

export const authLoginFulfilled = (): AuthLoginFulfilled => ({
  type: "auth/login/fulfilled",
});
export const authLoginPending = (): AuthLoginPending => ({
  type: "auth/login/pending",
});
export const authLoginRejected = (
  error: AxiosError<{ message: string }>,
): AuthLoginRejected => ({
  type: "auth/login/rejected",
  payload: error,
});
export const authLogoutFulfilled = (): AuthLogout => ({
  type: "auth/logout",
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

export function authLogout(): AppThunk<Promise<void>> {
  return async function (dispatch, _getState, { api }) {
    await api.auth.logout();
    dispatch(authLogoutFulfilled());
  };
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

//#region Adverts loaded

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

export const advertsLoadedFulfilled = (
  adverts: Advert[],
): AdvertsLoadedFulfilled => ({
  type: "adverts/loaded/fulfilled",
  payload: adverts,
});
export const advertsLoadedPending = (): AdvertsLoadedPending => ({
  type: "adverts/loaded/pending",
});
export const advertsLoadedRejected = (
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

export const advertsTagsFulfilled = (tags: string[]): AdvertsTagsFulfilled => ({
  type: "adverts/tags/fulfilled",
  payload: tags,
});

export const advertsTagsPending = (): AdvertsTagsPending => ({
  type: "adverts/tags/pending",
});

export const advertsTagsRejected = (
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

export const advertsDetailFulfilled = (
  advert: Advert,
): AdvertsDetailFulfilled => ({
  type: "adverts/detail/fulfilled",
  payload: advert,
});
export const advertsDetailPending = (): AdvertsDetailPending => ({
  type: "adverts/detail/pending",
});
export const advertsDetailRejected = (
  error: AxiosError<{ message: string }>,
): AdvertsDetailRejected => ({
  type: "adverts/detail/rejected",
  payload: error,
});

export function advertsDetail(advertId: string): AppThunk<Promise<void>> {
  return async function (dispatch, _getState, { api, router }) {
    dispatch(advertsDetailPending());

    try {
      const advert = await api.adverts.getAdvertById(advertId);
      if (!advert) {
        router.navigate("/not-found", { replace: true });
        return;
      }
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

//#region Adverts deleted

type AdvertsDeletedFulfilled = {
  type: "adverts/deleted/fulfilled";
};
type AdvertsDeletedPending = {
  type: "adverts/deleted/pending";
};
type AdvertsDeletedRejected = {
  type: "adverts/deleted/rejected";
  payload: AxiosError<{ message: string }>;
};

export const advertsDeletedFulfilled = (): AdvertsDeletedFulfilled => ({
  type: "adverts/deleted/fulfilled",
});
export const advertsDeletedPending = (): AdvertsDeletedPending => ({
  type: "adverts/deleted/pending",
});
export const advertsDeletedRejected = (
  error: AxiosError<{ message: string }>,
): AdvertsDeletedRejected => ({
  type: "adverts/deleted/rejected",
  payload: error,
});

export function advertsDeleted(advertId: string): AppThunk<Promise<void>> {
  return async function (dispatch, _getState, { api, router }) {
    dispatch(advertsDeletedPending());

    try {
      await api.adverts.deleteAdvert(advertId);
      dispatch(advertsDeletedFulfilled());
      router.navigate("/");
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error);
        dispatch(advertsDeletedRejected(error));
      }
      throw error;
    }
  };
}

//#endregion

//#region Adverts created

type AdvertsCreatedFulFilled = {
  type: "adverts/created/fulfilled";
  payload: Advert;
};
type AdvertsCreatedPending = {
  type: "adverts/created/pending";
};
type AdvertsCreatedRejected = {
  type: "adverts/created/rejected";
  payload: AxiosError<{ message: string }>;
};

export const advertsCreatedFulfilled = (
  advert: Advert,
): AdvertsCreatedFulFilled => ({
  type: "adverts/created/fulfilled",
  payload: advert,
});
export const advertsCreatedPending = (): AdvertsCreatedPending => ({
  type: "adverts/created/pending",
});
export const advertsCreatedRejected = (
  error: AxiosError<{ message: string }>,
): AdvertsCreatedRejected => ({
  type: "adverts/created/rejected",
  payload: error,
});

export function advertsCreated(
  advert: CreateAdvertDto,
): AppThunk<Promise<void>> {
  return async function (dispatch, _getState, { api, router }) {
    try {
      dispatch(advertsCreatedPending());
      const createdAdvert = await api.adverts.createAdvert(advert);
      dispatch(advertsCreatedFulfilled(createdAdvert));
      router.navigate(`/adverts/${createdAdvert.id}`);
    } catch (error) {
      if (error instanceof AxiosError) {
        dispatch(advertsCreatedRejected(error));
      }
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
  | AdvertsDetailRejected
  | AdvertsDeletedFulfilled
  | AdvertsDeletedPending
  | AdvertsDeletedRejected
  | AdvertsCreatedFulFilled
  | AdvertsCreatedPending
  | AdvertsCreatedRejected;
