import { combineReducers, createStore, applyMiddleware } from "redux";
import * as reducers from "./reducer";
import { useDispatch, useSelector } from "react-redux";
import { composeWithDevTools } from "@redux-devtools/extension/";
import * as thunk from "redux-thunk";
import type { Actions } from "./actions";
import type { createBrowserRouter } from "react-router";
import * as auth from "../services/auth";
import * as adverts from "../services/adverts";

const rootReducer = combineReducers(reducers);
type Router = ReturnType<typeof createBrowserRouter>;
type ExtraArgument = {
  api: { auth: typeof auth; adverts: typeof adverts };
  router: Router;
};

export default function configureStore(
  preloadedState: Partial<reducers.State>,
  router: Router,
) {
  const store = createStore(
    rootReducer,
    preloadedState as never,
    composeWithDevTools(
      applyMiddleware(
        thunk.withExtraArgument<reducers.State, Actions, ExtraArgument>({
          api: { auth, adverts },
          router,
        }),
      ),
    ),
  );

  return store;
}

export type AppStore = ReturnType<typeof configureStore>;
export type AppGetState = AppStore["getState"];
export type RootState = ReturnType<AppGetState>;
export type AppDispatch = AppStore["dispatch"];
export type AppThunk<ReturnType = void> = thunk.ThunkAction<
  ReturnType,
  RootState,
  ExtraArgument,
  Actions
>;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
