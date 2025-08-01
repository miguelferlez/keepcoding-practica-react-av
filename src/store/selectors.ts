import type { RootState } from ".";

export const getIsLogged = (state: RootState) => state.auth;

export const getUi = (state: RootState) => state.ui;

export const getAdverts = (state: RootState) => state.adverts.data;
