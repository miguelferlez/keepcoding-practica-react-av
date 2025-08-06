import type { RootState } from ".";

export const getIsLogged = (state: RootState) => state.auth;

export const getUi = (state: RootState) => state.ui;

export const getAdverts = (state: RootState) => state.adverts.data;

export const getAdvertsTags = (state: RootState) => state.adverts.tags;

export const getAdvertById = (advertId?: string) => {
  return function (state: RootState) {
    return state.adverts.data.find((advert) => advert.id === advertId);
  };
};
