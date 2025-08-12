import { AxiosError } from "axios";
import {
  authLoginPending,
  authLoginFulfilled,
  authLoginRejected,
  authLogin,
  authLogoutFulfilled,
  authLogout,
  uiResetError,
  advertsLoadedPending,
  advertsLoadedFulfilled,
  advertsLoadedRejected,
  advertsLoaded,
  advertsTagsPending,
  advertsTagsFulfilled,
  advertsTagsRejected,
  advertsTags,
  advertsDetailPending,
  advertsDetailFulfilled,
  advertsDetailRejected,
  advertsDetail,
  advertsDeletedPending,
  advertsDeletedFulfilled,
  advertsDeletedRejected,
  advertsDeleted,
  advertsCreatedPending,
  advertsCreatedFulfilled,
  advertsCreatedRejected,
  advertsCreated,
} from "./actions";
import type { Advert, CreateAdvertDto } from "@/pages/adverts/types";
import type { Credentials } from "@/pages/auth/types";

//#region Auth

describe("authLogin", () => {
  describe("authLoginPending", () => {
    it("should return auth/login/pending", () => {
      const expected = { type: "auth/login/pending" };
      const result = authLoginPending();
      expect(result).toEqual(expected);
    });
  });

  describe("authLoginFulfilled", () => {
    it("should return auth/login/fulfilled", () => {
      const expected = { type: "auth/login/fulfilled" };
      const result = authLoginFulfilled();
      expect(result).toEqual(expected);
    });
  });

  describe("authLoginRejected", () => {
    it("should return auth/login/rejected with error", () => {
      const error = new AxiosError<{ message: string }>();
      const expected = { type: "auth/login/rejected", payload: error };
      const result = authLoginRejected(error);
      expect(result).toEqual(expected);
      expect(result.payload.message).toEqual(error.message);
    });
  });

  describe("authLogin", () => {
    const credentials: Credentials = {
      email: "john@doe.com",
      password: "1234",
    };
    const from = "/from";
    const thunk = authLogin(credentials, false);
    const dispatch = vi.fn();
    const api = { auth: { login: vi.fn() } };
    const router = {
      state: { location: { state: { from } } },
      navigate: vi.fn(),
    };
    const error = new AxiosError<{ message: string }>();

    afterEach(() => {
      dispatch.mockClear();
      router.navigate.mockClear();
    });

    it("should resolve login and navigate to from path", async () => {
      api.auth.login = vi.fn().mockResolvedValue(undefined);
      // @ts-expect-error: getState not needed
      await thunk(dispatch, undefined, { api, router });
      expect(dispatch).toHaveBeenCalledTimes(2);
      expect(dispatch).toHaveBeenNthCalledWith(1, authLoginPending());
      expect(dispatch).toHaveBeenNthCalledWith(2, authLoginFulfilled());
      expect(api.auth.login).toHaveBeenCalledWith(credentials, false);
      expect(router.navigate).toHaveBeenCalledWith(from, { replace: true });
    });
    it("should reject login when api fails", async () => {
      api.auth.login = vi.fn().mockRejectedValue(error);
      await expect(() =>
        // @ts-expect-error: getState not needed
        thunk(dispatch, undefined, { api, router }),
      ).rejects.toThrowError(error);
      expect(dispatch).toHaveBeenCalledTimes(2);
      expect(dispatch).toHaveBeenNthCalledWith(1, authLoginPending());
      expect(dispatch).toHaveBeenNthCalledWith(2, authLoginRejected(error));
      expect(api.auth.login).toHaveBeenCalledOnce();
      expect(router.navigate).not.toHaveBeenCalled();
    });
    it("should navigate to index when from path not provided", async () => {
      const router = {
        state: { location: { state: undefined } },
        navigate: vi.fn(),
      };
      api.auth.login.mockResolvedValue(undefined);
      // @ts-expect-error: getState not needed
      await thunk(dispatch, undefined, { api, router });
      expect(router.navigate).toHaveBeenCalledWith("/", { replace: true });
    });
  });
});

describe("authLogout", () => {
  describe("authLogoutFulfilled", () => {
    it("should return auth/logout", () => {
      const expected = { type: "auth/logout" };
      const result = authLogoutFulfilled();
      expect(result).toEqual(expected);
    });
  });

  describe("authLogout", () => {
    const thunk = authLogout();
    const dispatch = vi.fn();
    const api = { auth: { logout: vi.fn() } };
    const router = {
      state: { location: { state: "/" } },
      navigate: vi.fn(),
    };

    it("should resolve logout", async () => {
      api.auth.logout = vi.fn().mockResolvedValue(undefined);
      // @ts-expect-error: getState not needed
      await thunk(dispatch, undefined, { api, router });
      expect(dispatch).toHaveBeenCalledOnce();
      expect(dispatch).toHaveBeenNthCalledWith(1, authLogoutFulfilled());
      expect(api.auth.logout).toHaveBeenCalledOnce();
    });
  });
});

//#endregion

//#region Ui

describe("uiResetError", () => {
  it("should return ui/reset-error", () => {
    const expected = { type: "ui/reset-error" };
    const result = uiResetError();
    expect(result).toEqual(expected);
  });
});

//#endregion

//#region Adverts

describe("advertsLoaded", () => {
  describe("advertsLoadedPending", () => {
    it("should return adverts/loaded/pending", () => {
      const expected = { type: "adverts/loaded/pending" };
      const result = advertsLoadedPending();
      expect(result).toEqual(expected);
    });
  });

  describe("advertsLoadedFulfilled", () => {
    it("should return adverts/loaded/fulfilled with empty adverts", () => {
      const expected = { type: "adverts/loaded/fulfilled", payload: [] };
      const result = advertsLoadedFulfilled([]);
      expect(result).toEqual(expected);
      expect(result.payload).toHaveLength(0);
    });

    it("should return adverts/loaded/fulfilled with 2 adverts", () => {
      const adverts: Advert[] = [
        {
          id: "1",
          createdAt: "2025-08-10T10:25:58.000Z",
          name: "",
          sale: false,
          price: 0,
          tags: [],
          photo: null,
        },
        {
          id: "2",
          createdAt: "2025-08-11T12:05:28.000Z",
          name: "",
          sale: false,
          price: 0,
          tags: [],
          photo: null,
        },
      ];
      const expected = { type: "adverts/loaded/fulfilled", payload: adverts };
      const result = advertsLoadedFulfilled(adverts);
      expect(result).toEqual(expected);
      expect(result.payload).toHaveLength(2);
    });
  });

  describe("advertsLoadedRejected", () => {
    it("should return adverts/loaded/rejected with error", () => {
      const error = new AxiosError<{ message: string }>();
      const expected = { type: "adverts/loaded/rejected", payload: error };
      const result = advertsLoadedRejected(error);
      expect(result).toEqual(expected);
      expect(result.payload.message).toEqual(error.message);
    });
  });

  describe("advertsLoaded", () => {
    const adverts: Advert[] = [
      {
        id: "1",
        createdAt: "2025-08-10T10:25:58.000Z",
        name: "",
        sale: false,
        price: 0,
        tags: [],
        photo: null,
      },
      {
        id: "2",
        createdAt: "2025-08-11T12:05:28.000Z",
        name: "",
        sale: false,
        price: 0,
        tags: [],
        photo: null,
      },
    ];
    const thunk = advertsLoaded();
    const dispatch = vi.fn();
    const getState = () => ({
      adverts: { loaded: false, data: [] },
    });
    const api = { adverts: { getAdverts: vi.fn() } };

    afterEach(() => {
      dispatch.mockClear();
    });

    it("should do nothing when adverts already loaded", async () => {
      const getState = () => ({
        adverts: { loaded: true, data: [] },
      });
      // @ts-expect-error: getState extra props not needed
      await thunk(dispatch, getState, { api });
      expect(dispatch).not.toHaveBeenCalled();
      expect(api.adverts.getAdverts).not.toHaveBeenCalled();
    });
    it("should resolve load with empty adverts after 1s", async () => {
      vi.useFakeTimers();
      api.adverts.getAdverts = vi.fn().mockResolvedValue([]);
      // @ts-expect-error: getState extra props not needed
      await thunk(dispatch, getState, { api });
      vi.advanceTimersByTime(1000);
      expect(dispatch).toHaveBeenCalledTimes(2);
      expect(dispatch).toHaveBeenNthCalledWith(1, advertsLoadedPending());
      expect(dispatch).toHaveBeenNthCalledWith(2, advertsLoadedFulfilled([]));
      expect(api.adverts.getAdverts).toHaveBeenCalledOnce();
      expect(await api.adverts.getAdverts()).toEqual([]);
    });
    it("should resolves load with 2 adverts after 1s", async () => {
      vi.useFakeTimers();
      api.adverts.getAdverts = vi.fn().mockResolvedValue(adverts);
      // @ts-expect-error: getState extra props not needed
      await thunk(dispatch, getState, { api });
      vi.advanceTimersByTime(1000);
      expect(dispatch).toHaveBeenCalledTimes(2);
      expect(dispatch).toHaveBeenNthCalledWith(1, advertsLoadedPending());
      expect(dispatch).toHaveBeenNthCalledWith(
        2,
        advertsLoadedFulfilled(adverts),
      );
      expect(api.adverts.getAdverts).toHaveBeenCalledOnce();
      expect(await api.adverts.getAdverts()).toEqual(adverts);
    });
    it("should reject load when api fails", async () => {
      const error = new AxiosError<{ message: "error message" }>();
      api.adverts.getAdverts = vi.fn().mockRejectedValue(error);
      await expect(() =>
        // @ts-expect-error: getState extra props not needed
        thunk(dispatch, getState, { api }),
      ).rejects.toThrowError(error);
      expect(dispatch).toHaveBeenCalledTimes(2);
      expect(dispatch).toHaveBeenNthCalledWith(1, advertsLoadedPending());
      expect(dispatch).toHaveBeenNthCalledWith(2, advertsLoadedRejected(error));
      expect(api.adverts.getAdverts).toHaveBeenCalledOnce();
    });
  });
});

describe("advertsTags", () => {
  describe("advertsTagsPending", () => {
    it("should return adverts/tags/pending", () => {
      const expected = { type: "adverts/tags/pending" };
      const result = advertsTagsPending();
      expect(result).toEqual(expected);
    });
  });

  describe("advertsTagsFulfilled", () => {
    it("should return adverts/tags/fulfilled", () => {
      const tags: string[] = ["tag"];
      const expected = { type: "adverts/tags/fulfilled", payload: tags };
      const result = advertsTagsFulfilled(tags);
      expect(result).toEqual(expected);
      expect(result.payload).toHaveLength(1);
    });
  });

  describe("advertsTagsRejected", () => {
    it("should return adverts/tags/rejected", () => {
      const error = new AxiosError<{ message: string }>();
      const expected = { type: "adverts/tags/rejected", payload: error };
      const result = advertsTagsRejected(error);
      expect(result).toEqual(expected);
      expect(result.payload.message).toEqual(error.message);
    });
  });

  describe("advertsTags", () => {
    const tags: string[] = ["tag1", "tag2"];
    const dispatch = vi.fn();
    const api = { adverts: { getAdvertsTags: vi.fn() } };
    const thunk = advertsTags();

    afterEach(() => {
      dispatch.mockClear();
    });

    it("should resolve load with 2 tags", async () => {
      api.adverts.getAdvertsTags = vi.fn().mockResolvedValue(tags);
      //@ts-expect-error: getState not needed
      await thunk(dispatch, undefined, { api });
      expect(dispatch).toHaveBeenCalledTimes(2);
      expect(dispatch).toHaveBeenNthCalledWith(1, advertsTagsPending());
      expect(dispatch).toHaveBeenNthCalledWith(2, advertsTagsFulfilled(tags));
      expect(api.adverts.getAdvertsTags).toHaveBeenCalledOnce();
      expect(await api.adverts.getAdvertsTags()).toEqual(tags);
      expect(await api.adverts.getAdvertsTags()).toHaveLength(2);
    });
    it("should reject load with error", async () => {
      const error = new AxiosError<{ message: "error message" }>();
      api.adverts.getAdvertsTags = vi.fn().mockRejectedValue(error);
      await expect(() =>
        // @ts-expect-error: getState not needed
        thunk(dispatch, undefined, { api }),
      ).rejects.toThrowError(error);
      expect(dispatch).toHaveBeenCalledTimes(2);
      expect(dispatch).toHaveBeenNthCalledWith(1, advertsTagsPending());
      expect(dispatch).toHaveBeenNthCalledWith(2, advertsTagsRejected(error));
      expect(api.adverts.getAdvertsTags).toHaveBeenCalledOnce();
    });
  });
});

describe("advertsDetail", () => {
  describe("advertsDetailPending", () => {
    it("should return adverts/detail/pending", () => {
      const expected = { type: "adverts/detail/pending" };
      const result = advertsDetailPending();
      expect(result).toEqual(expected);
    });
  });

  describe("advertsDetailFulfilled", () => {
    it("should return adverts/detail/fulfilled", () => {
      const advert: Advert = {
        id: "1",
        createdAt: "2025-08-10T10:25:58.000Z",
        name: "",
        sale: false,
        price: 0,
        tags: [],
        photo: null,
      };
      const expected = { type: "adverts/detail/fulfilled", payload: advert };
      const result = advertsDetailFulfilled(advert);
      expect(result).toEqual(expected);
      expect(result.payload.id).toEqual(advert.id);
    });
  });

  describe("advertsDetailRejected", () => {
    it("should return adverts/detail/rejected", () => {
      const error = new AxiosError<{ message: string }>();
      const expected = { type: "adverts/detail/rejected", payload: error };
      const result = advertsDetailRejected(error);
      expect(result).toEqual(expected);
      expect(result.payload.message).toEqual(error.message);
    });
  });

  describe("advertsDetail", () => {
    const advert: Advert = {
      id: "1",
      createdAt: "2025-08-10T10:25:58.000Z",
      name: "",
      sale: false,
      price: 0,
      tags: [],
      photo: null,
    };
    const dispatch = vi.fn();
    const api = { adverts: { getAdvertById: vi.fn() } };
    const router = {
      state: { location: { state: "/not-found" } },
      navigate: vi.fn(),
    };

    afterEach(() => {
      dispatch.mockClear();
      router.navigate.mockClear();
    });

    it("should resolve load with details of id '1' advert", async () => {
      const thunk = advertsDetail("1");
      api.adverts.getAdvertById = vi.fn().mockResolvedValue(advert);
      //@ts-expect-error: getState not needed
      await thunk(dispatch, undefined, { api });
      expect(dispatch).toHaveBeenCalledTimes(2);
      expect(dispatch).toHaveBeenNthCalledWith(1, advertsDetailPending());
      expect(dispatch).toHaveBeenNthCalledWith(
        2,
        advertsDetailFulfilled(advert),
      );
      expect(api.adverts.getAdvertById).toHaveBeenCalledWith(advert.id);
    });
    it("should reject load and navigate to 404 when advert is null", async () => {
      const thunk = advertsDetail("2");
      api.adverts.getAdvertById = vi.fn().mockResolvedValue(null);
      // @ts-expect-error: getState not needed
      await thunk(dispatch, undefined, { api, router });
      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenNthCalledWith(1, advertsDetailPending());
      expect(api.adverts.getAdvertById).toHaveBeenCalledWith("2");
      expect(router.navigate).toHaveBeenCalledWith("/not-found", {
        replace: true,
      });
    });
    it("should reject load when api fails", async () => {
      const error = new AxiosError<{ message: string }>();
      const thunk = advertsDetail("1");
      api.adverts.getAdvertById = vi.fn().mockRejectedValue(error);
      await expect(() =>
        // @ts-expect-error: getState not needed
        thunk(dispatch, undefined, { api }),
      ).rejects.toThrowError(error);
      expect(dispatch).toHaveBeenCalledTimes(2);
      expect(dispatch).toHaveBeenNthCalledWith(1, advertsDetailPending());
      expect(dispatch).toHaveBeenNthCalledWith(2, advertsDetailRejected(error));
    });
  });
});

describe("advertsDeleted", () => {
  describe("advertsDeletedPending", () => {
    it("should return adverts/deleted/pending", () => {
      const expected = { type: "adverts/deleted/pending" };
      const result = advertsDeletedPending();
      expect(result).toEqual(expected);
    });
  });

  describe("advertsDeletedFulfilled", () => {
    it("should return adverts/deleted/fulfilled", () => {
      const expected = { type: "adverts/deleted/fulfilled" };
      const result = advertsDeletedFulfilled();
      expect(result).toEqual(expected);
    });
  });

  describe("advertsDeletedRejected", () => {
    it("should return adverts/deleted/rejected", () => {
      const error = new AxiosError<{ message: string }>();
      const expected = { type: "adverts/deleted/rejected", payload: error };
      const result = advertsDeletedRejected(error);
      expect(result).toEqual(expected);
      expect(result.payload.message).toEqual(error.message);
    });
  });

  describe("advertsDeleted", () => {
    const advert: Advert = {
      id: "1",
      createdAt: "2025-08-10T10:25:58.000Z",
      name: "",
      sale: false,
      price: 0,
      tags: [],
      photo: null,
    };
    const dispatch = vi.fn();
    const api = { adverts: { deleteAdvert: vi.fn() } };
    const router = {
      state: { location: { state: "/" } },
      navigate: vi.fn(),
    };
    const thunk = advertsDeleted(advert.id);

    afterEach(() => {
      dispatch.mockClear();
      router.navigate.mockClear();
    });

    it("should resolve delete advert with id '1'", async () => {
      api.adverts.deleteAdvert = vi.fn().mockResolvedValue(undefined);
      //@ts-expect-error: getState not needed
      await thunk(dispatch, undefined, { api, router });
      expect(dispatch).toHaveBeenCalledTimes(2);
      expect(dispatch).toHaveBeenNthCalledWith(1, advertsDeletedPending());
      expect(dispatch).toHaveBeenNthCalledWith(2, advertsDeletedFulfilled());
      expect(router.navigate).toHaveBeenCalledWith("/");
    });
    it("should reject delete advert with error", async () => {
      const error = new AxiosError<{ message: string }>();
      api.adverts.deleteAdvert = vi.fn().mockRejectedValue(error);
      await expect(
        // @ts-expect-error: getState not needed
        thunk(dispatch, undefined, { api, router }),
      ).rejects.toThrow(error);
      expect(dispatch).toHaveBeenNthCalledWith(1, advertsDeletedPending());
      expect(dispatch).toHaveBeenNthCalledWith(
        2,
        advertsDeletedRejected(error),
      );
    });
  });
});

describe("advertsCreated", () => {
  describe("advertsCreatedPending", () => {
    it("should return adverts/created/pending", () => {
      const expected = { type: "adverts/created/pending" };
      const result = advertsCreatedPending();
      expect(result).toEqual(expected);
    });
  });

  describe("advertsCreatedFulfilled", () => {
    it("should return adverts/created/fulfilled with adverts", () => {
      const advert: Advert = {
        id: "1",
        createdAt: "2025-08-10T10:25:58.000Z",
        name: "",
        sale: false,
        price: 0,
        tags: [],
        photo: null,
      };
      const expected = { type: "adverts/created/fulfilled", payload: advert };
      const result = advertsCreatedFulfilled(advert);
      expect(result).toEqual(expected);
      expect(result.payload).toEqual(advert);
    });
  });

  describe("advertsCreatedRejected", () => {
    it("should return adverts/created/rejected", () => {
      const error = new AxiosError<{ message: string }>();
      const expected = { type: "adverts/created/rejected", payload: error };
      const result = advertsCreatedRejected(error);
      expect(result).toEqual(expected);
      expect(result.payload.message).toEqual(error.message);
    });
  });

  describe("advertsCreated", () => {
    const advertDto: CreateAdvertDto = {
      name: "",
      sale: true,
      price: 0,
      tags: [],
      photo: undefined,
    };
    const createdAdvert: Advert = {
      ...advertDto,
      id: "1",
      createdAt: "",
      photo: null,
    };
    const dispatch = vi.fn();
    const api = { adverts: { createAdvert: vi.fn() } };
    const router = {
      navigate: vi.fn(),
    };
    const thunk = advertsCreated(advertDto);

    afterEach(() => {
      dispatch.mockClear();
      router.navigate.mockClear();
    });

    it("should resolve create and navigate to new advert", async () => {
      api.adverts.createAdvert = vi.fn().mockResolvedValue(createdAdvert);
      //@ts-expect-error: getState not needed
      await thunk(dispatch, undefined, { api, router });
      expect(dispatch).toHaveBeenCalledTimes(2);
      expect(dispatch).toHaveBeenNthCalledWith(1, advertsCreatedPending());
      expect(dispatch).toHaveBeenNthCalledWith(
        2,
        advertsCreatedFulfilled(createdAdvert),
      );
      expect(router.navigate).toHaveBeenCalledWith(
        `/adverts/${createdAdvert.id}`,
      );
    });
    it("should reject create when api fails", async () => {
      const error = new AxiosError<{ message: string }>();
      api.adverts.createAdvert = vi.fn().mockRejectedValue(error);
      //@ts-expect-error: getState not needed
      await thunk(dispatch, undefined, { api, router });
      expect(dispatch).toHaveBeenCalledTimes(2);
      expect(dispatch).toHaveBeenNthCalledWith(1, advertsCreatedPending());
      expect(dispatch).toHaveBeenNthCalledWith(
        2,
        advertsCreatedRejected(error),
      );
      expect(router.navigate).not.toHaveBeenCalled();
    });
  });
});

//#endregion
