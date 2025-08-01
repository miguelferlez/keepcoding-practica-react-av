import type { AxiosError } from "axios";
import type { Actions } from "./actions";
import type { Advert } from "../pages/adverts/types";

export type State = {
  auth: boolean;
  ui: {
    pending: boolean;
    error: AxiosError<{ message: string }> | null;
  };
  adverts: { loaded: boolean; data: Advert[] };
};

const defaultState: State = {
  auth: false,
  ui: {
    pending: false,
    error: null,
  },
  adverts: { loaded: false, data: [] },
};

export function auth(
  state = defaultState.auth,
  action: Actions,
): State["auth"] {
  switch (action.type) {
    case "auth/login/fulfilled":
      return true;
    case "auth/logout":
      return false;
    default:
      return state;
  }
}

export function ui(state = defaultState.ui, action: Actions): State["ui"] {
  switch (action.type) {
    case "auth/login/pending":
      return { pending: true, error: null };
    case "auth/login/fulfilled":
      return { pending: false, error: null };
    case "auth/login/rejected":
      return { pending: false, error: action.payload };
    case "adverts/loaded/pending":
      return { pending: true, error: null };
    case "adverts/loaded/fulfilled":
      return { pending: false, error: null };
    case "adverts/loaded/rejected":
      return { pending: false, error: action.payload };
    case "ui/reset-error":
      return { ...state, error: null };
    default:
      return state;
  }
}

export function adverts(
  state = defaultState.adverts,
  action: Actions,
): State["adverts"] {
  switch (action.type) {
    case "adverts/loaded/fulfilled":
      return { loaded: true, data: action.payload };
    default:
      return state;
  }
}
