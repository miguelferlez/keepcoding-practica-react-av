import { useState } from "react";
import { useAppDispatch, useAppSelector } from ".";
import {
  advertsCreated,
  advertsDeleted,
  advertsDetail,
  advertsLoaded,
  advertsTags,
  authLogin,
  authLogout,
  uiResetError,
} from "./actions";
import { getIsLogged } from "./selectors";
import type { Credentials } from "@/pages/auth/types";
import type { CreateAdvertDto } from "@/pages/adverts/types";

export function useAuth() {
  return useAppSelector(getIsLogged);
}

export function useModal() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  function showModal() {
    setIsModalOpen(true);
  }
  function closeModal() {
    setIsModalOpen(false);
  }
  return { isModalOpen, showModal, closeModal };
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

export function useAdvertsDetailAction() {
  const dispatch = useAppDispatch();
  return function (advertId: string) {
    return dispatch(advertsDetail(advertId));
  };
}

export function useAdvertsDeletedAction() {
  const dispatch = useAppDispatch();
  return function (advertId: string) {
    return dispatch(advertsDeleted(advertId));
  };
}

export function useAdvertsCreatedAction() {
  const dispatch = useAppDispatch();
  return function (advert: CreateAdvertDto) {
    return dispatch(advertsCreated(advert));
  };
}
