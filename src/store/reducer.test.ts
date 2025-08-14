import { AxiosError } from "axios";
import {
  advertsCreatedFulfilled,
  advertsCreatedPending,
  advertsCreatedRejected,
  advertsDeletedFulfilled,
  advertsDeletedPending,
  advertsDeletedRejected,
  advertsDetailFulfilled,
  advertsDetailPending,
  advertsDetailRejected,
  advertsLoadedFulfilled,
  advertsLoadedPending,
  advertsLoadedRejected,
  advertsTagsFulfilled,
  advertsTagsPending,
  advertsTagsRejected,
  authLoginFulfilled,
  authLoginPending,
  authLoginRejected,
  authLogoutFulfilled,
  uiResetError,
} from "./actions";
import { auth, ui, adverts } from "./reducer";
import type { Advert } from "@/pages/adverts/types";

describe("auth", () => {
  it("should return true with auth/login/fulfilled", () => {
    const result = auth(false, authLoginFulfilled());
    expect(result).toBe(true);
  });
  it("should return false with auth/logout", () => {
    const result = auth(true, authLogoutFulfilled());
    expect(result).toBe(false);
  });
  it("should return auth value with any other action", () => {
    const result = auth(false, uiResetError());
    expect(result).toBe(false);
  });
});

describe("ui", () => {
  const state = {
    pending: { auth: false, adverts: false, tags: false },
    error: null,
  };
  const error = new AxiosError<{ message: string }>();

  describe("auth", () => {
    it("should manage auth pending", () => {
      const expected = {
        error: null,
        pending: { adverts: false, tags: false, auth: true },
      };
      const result = ui(state, authLoginPending());
      expect(result).toEqual(expected);
    });
    it("should manage auth fulfilled", () => {
      const expected = {
        error: null,
        pending: { adverts: false, tags: false, auth: false },
      };
      const result = ui(state, authLoginFulfilled());
      expect(result).toEqual(expected);
    });
    it("should manage auth rejected", () => {
      const expected = {
        pending: { auth: false, adverts: false, tags: false },
        error,
      };
      const result = ui(state, authLoginRejected(error));
      expect(result).toEqual(expected);
      expect(result.error).not.toBeNull();
    });
  });

  describe("adverts", () => {
    it("should manage any adverts-related pending", () => {
      const expected = {
        error: null,
        pending: { auth: false, tags: false, adverts: true },
      };
      const advertsLoaded = ui(state, advertsLoadedPending());
      const advertsDetail = ui(state, advertsDetailPending());
      const advertsDeleted = ui(state, advertsDeletedPending());
      const advertsCreated = ui(state, advertsCreatedPending());
      expect(
        advertsLoaded && advertsDetail && advertsDeleted && advertsCreated,
      ).toEqual(expected);
    });
    it("should manage adverts tags pending", () => {
      const expected = {
        error: null,
        pending: { auth: false, adverts: false, tags: true },
      };
      const result = ui(state, advertsTagsPending());
      expect(result).toEqual(expected);
    });
    it("should manage any adverts-related fulfilled", () => {
      const expected = {
        error: null,
        pending: { auth: false, tags: false, adverts: false },
      };
      //@ts-expect-error: adverts param not needed
      const advertsLoaded = ui(state, advertsLoadedFulfilled());
      //@ts-expect-error: advert param not needed
      const advertsDetail = ui(state, advertsDetailFulfilled());
      const advertsDeleted = ui(state, advertsDeletedFulfilled());
      //@ts-expect-error: advert param not needed
      const advertsCreated = ui(state, advertsCreatedFulfilled());
      expect(
        advertsLoaded && advertsDetail && advertsDeleted && advertsCreated,
      ).toEqual(expected);
    });
    it("should manage adverts tags fulfilled", () => {
      const expected = {
        error: null,
        pending: { auth: false, adverts: false, tags: false },
      };
      //@ts-expect-error: tags param not needed
      const result = ui(state, advertsTagsFulfilled());
      expect(result).toEqual(expected);
    });
    it("should manage any adverts-related rejected", () => {
      const expected = {
        pending: { auth: false, tags: false, adverts: false },
        error,
      };
      const advertsLoaded = ui(state, advertsLoadedRejected(error));
      const advertsDetail = ui(state, advertsDetailRejected(error));
      const advertsDeleted = ui(state, advertsDeletedRejected(error));
      const advertsCreated = ui(state, advertsCreatedRejected(error));
      expect(
        advertsLoaded && advertsDetail && advertsDeleted && advertsCreated,
      ).toEqual(expected);
      expect(
        advertsLoaded.error &&
          advertsDetail.error &&
          advertsDeleted.error &&
          advertsCreated.error,
      ).not.toBeNull();
    });
    it("should manage adverts tags rejected", () => {
      const expected = {
        pending: { auth: false, tags: false, adverts: false },
        error,
      };
      const result = ui(state, advertsTagsRejected(error));
      expect(result).toEqual(expected);
      expect(result.error).not.toBeNull();
    });
  });

  it("should reset ui value with ui/reset-error", () => {
    const newState = {
      pending: { auth: false, tags: false, adverts: false },
      error,
    };
    const result = ui(newState, uiResetError());
    expect(result).toEqual(state);
    expect(result.error).toBeNull();
  });

  it("should return ui value with any other action", () => {
    const expected = {
      pending: { auth: false, tags: false, adverts: false },
      error,
    };
    const result = ui(expected, authLogoutFulfilled());
    expect(result).toEqual(expected);
    expect(result.error).not.toBeNull();
  });
});

describe("adverts", () => {
  const advert: Advert = {
    id: "1",
    createdAt: "2025-08-10T10:25:58.000Z",
    name: "",
    sale: false,
    price: 0,
    tags: [],
    photo: null,
  };
  const tags: string[] = ["tag1", "tag2"];
  const state = {
    loaded: false,
    data: [],
    tags: [],
  };

  it("should manage adverts/loaded/fulfilled", () => {
    const expected = { tags: [], loaded: true, data: [advert] };
    const result = adverts(state, advertsLoadedFulfilled([advert]));
    expect(result).toEqual(expected);
    expect(result.loaded).toBe(true);
    expect(result.data).toEqual([advert]);
    expect(result.data).toHaveLength(1);
  });
  it("should manage adverts/tags/fulfilled", () => {
    const expected = { loaded: false, data: [], tags: tags };
    const result = adverts(state, advertsTagsFulfilled(tags));
    expect(result).toEqual(expected);
    expect(result.loaded).toBe(false);
    expect(result.tags).toEqual(tags);
    expect(result.tags).toHaveLength(2);
  });
  it("should manage adverts/detail/fulfilled", () => {
    const expected = { loaded: false, data: [advert], tags: [] };
    const result = adverts(state, advertsDetailFulfilled(advert));
    expect(result).toEqual(expected);
    expect(result.loaded).toBe(false);
    expect(result.data).toEqual([advert]);
  });
  it("should manage adverts/deleted/fulfilled", () => {
    const expected = { loaded: false, data: [], tags: [] };
    const result = adverts(state, advertsDeletedFulfilled());
    expect(result).toEqual(expected);
    expect(result.loaded).toBe(false);
    expect(result.data).toEqual([]);
  });
  it("should manage adverts/created/fulfilled", () => {
    const expected = { loaded: false, data: [advert], tags: [] };
    const result = adverts(state, advertsCreatedFulfilled(advert));
    expect(result).toEqual(expected);
    expect(result.loaded).toBe(false);
    expect(result.data).toEqual([advert]);
    expect(result.data).toHaveLength(1);
  });
  it("should return adverts value with any other action", () => {
    const result = adverts(state, uiResetError());
    expect(result).toBe(state);
  });
});
