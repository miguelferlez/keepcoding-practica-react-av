import type { Advert } from "@/pages/adverts/types";
import type { RootState } from ".";
import {
  getAdvertById,
  getAdverts,
  getAdvertsTags,
  getIsLogged,
  getUi,
} from "./selectors";

describe("getIsLogged", () => {
  const state: RootState = {
    auth: false,
    ui: {
      pending: { auth: false, adverts: false, tags: false },
      error: null,
    },
    adverts: { loaded: false, data: [], tags: [] },
  };

  it("should return auth default state value", () => {
    const result = getIsLogged(state);
    expect(result).toBe(state.auth);
    expect(state.auth).toBe(false);
  });
});

describe("getUi", () => {
  const state: RootState = {
    auth: false,
    ui: {
      pending: { auth: false, adverts: false, tags: false },
      error: null,
    },
    adverts: { loaded: false, data: [], tags: [] },
  };

  it("should return ui default state values", () => {
    const expected = {
      pending: { auth: false, adverts: false, tags: false },
      error: null,
    };
    const result = getUi(state);
    expect(result).toEqual(expected);
    expect(result.pending).toEqual({
      auth: false,
      adverts: false,
      tags: false,
    });
    expect(result.error).toBeNull();
  });
});

describe("getAdverts", () => {
  const state: RootState = {
    auth: false,
    ui: {
      pending: { auth: false, adverts: false, tags: false },
      error: null,
    },
    adverts: { loaded: true, data: [], tags: [] },
  };

  it("should return array of adverts", () => {
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
    ];
    state.adverts.data = adverts;
    const result = getAdverts(state);
    expect(result).toEqual(adverts);
    expect(result).toHaveLength(1);
  });
  it("should return empty array", () => {
    state.adverts.data = [];
    const result = getAdverts(state);
    expect(result).toEqual([]);
    expect(result).toHaveLength(0);
  });
});

describe("getAdvertsTags", () => {
  const state: RootState = {
    auth: false,
    ui: {
      pending: { auth: false, adverts: false, tags: false },
      error: null,
    },
    adverts: { loaded: true, data: [], tags: [] },
  };

  it("should return array of tags", () => {
    const tags: string[] = ["tag1", "tag2"];
    state.adverts.tags = tags;
    const result = getAdvertsTags(state);
    expect(result).toEqual(tags);
    expect(result).toHaveLength(2);
  });
  it("should return empty array", () => {
    state.adverts.tags = [];
    const result = getAdvertsTags(state);
    expect(result).toEqual([]);
    expect(result).toHaveLength(0);
  });
});

describe("getAdvertsById", () => {
  const state: RootState = {
    auth: false,
    ui: {
      pending: { auth: false, adverts: false, tags: false },
      error: null,
    },
    adverts: { loaded: true, data: [], tags: [] },
  };

  it("should return advert with id '1'", () => {
    const advert: Advert = {
      id: "1",
      createdAt: "2025-08-10T10:25:58.000Z",
      name: "",
      sale: false,
      price: 0,
      tags: [],
      photo: null,
    };
    state.adverts.data = [advert];
    const result = getAdvertById("1")(state);
    expect(result).toEqual(advert);
  });
  it("should return undefined with unknown id", () => {
    state.adverts.data = [];
    const result = getAdvertById("2")(state);
    expect(result).toBeUndefined();
  });
});
