import { AxiosError } from "axios";
import { Provider } from "react-redux";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AdvertsPage from "./adverts-page";
import type { RootState } from "@/store";
import { advertsLoaded, advertsTags, uiResetError } from "@/store/actions";
import type { Advert } from "./types";
import { MemoryRouter } from "react-router";

vi.mock("@/store/actions");

describe("AdvertsPage", () => {
  const state: RootState = {
    auth: false,
    ui: {
      pending: { auth: false, adverts: false, tags: false },
      error: null,
    },
    adverts: { loaded: false, data: [], tags: [] },
  };

  const store = {
    getState: () => state,
    subscribe: () => {},
    dispatch: () => {},
  };

  const renderComponent = (
    adverts: Advert[] = [],
    tags: string[] = [],
    error?: AxiosError<{ message: string }>,
    pending: Partial<RootState["ui"]["pending"]> = {},
  ) => {
    state.adverts.data = adverts;
    state.adverts.tags = tags;
    state.ui.error = error || null;
    state.ui.pending = { ...state.ui.pending, ...pending };

    return render(
      // @ts-expect-error: store completed config not needed
      <Provider store={store}>
        <MemoryRouter>
          <AdvertsPage />
        </MemoryRouter>
      </Provider>,
    );
  };

  it("should dispatch loader when pending", () => {
    const { container } = renderComponent([], [], undefined, { adverts: true });

    expect(container).toMatchSnapshot();
    expect(screen.getByRole("status")).toBeInTheDocument();
    expect(advertsLoaded).toHaveBeenCalled();
    expect(advertsTags).toHaveBeenCalled();
  });

  it("should dispatch empty warning when no adverts", () => {
    const { container } = renderComponent([], [], undefined, {
      adverts: false,
    });
    const advertsEmptyWarning = screen.getByTestId(/empty/i);
    const newAdvertButton = screen.getByRole("link", {
      name: /warning-new-advert/i,
    });

    expect(container).toMatchSnapshot();
    expect(advertsEmptyWarning).toBeInTheDocument();
    expect(advertsLoaded).toHaveBeenCalled();
    expect(advertsTags).toHaveBeenCalled();
    expect(state.adverts.data).toEqual([]);
    expect(newAdvertButton).toBeEnabled();
  });

  it("should dispatch adverts list", () => {
    const advert: Advert = {
      id: "1",
      createdAt: "2025-08-10T10:25:58.000Z",
      name: "advert 1",
      sale: false,
      price: 0,
      tags: [],
      photo: null,
    };
    const { container } = renderComponent([advert], [], undefined, {
      adverts: false,
    });

    expect(container).toMatchSnapshot();
    expect(screen.getByText("advert 1")).toBeInTheDocument();
    expect(advertsLoaded).toHaveBeenCalled();
    expect(state.adverts.data).toEqual([advert]);
    expect(state.adverts.data).toHaveLength(1);
  });

  it("should dispatch not found warning when filters exclude all advert", async () => {
    const adverts: Advert[] = [
      {
        id: "1",
        createdAt: "2025-08-10T10:25:58.000Z",
        name: "advert 1",
        sale: false,
        price: 0,
        tags: [],
        photo: null,
      },
    ];
    const { container } = renderComponent(adverts, [], undefined, {
      adverts: false,
    });
    const filtersButton = screen.getByRole("link", {
      name: /nav-filters/i,
    });
    const nameFilterInput = screen.getByLabelText(/name/i);

    expect(container).toMatchSnapshot();
    await userEvent.click(filtersButton);
    await userEvent.type(nameFilterInput, "advert 2");
    const advertsNotFoundWarning = screen.getByTestId(/not-found/i);
    expect(advertsNotFoundWarning).toBeInTheDocument();
    expect(state.adverts.data).toHaveLength(1);
  });

  it("should dispatch filtered adverts", async () => {
    const adverts: Advert[] = [
      {
        id: "1",
        createdAt: "2025-08-10T10:25:58.000Z",
        name: "advert 1",
        sale: false,
        price: 5,
        tags: ["work"],
        photo: null,
      },
      {
        id: "2",
        createdAt: "2025-08-11T12:05:28.000Z",
        name: "advert 2",
        sale: true,
        price: 10,
        tags: ["work", "lifestyle"],
        photo: null,
      },
    ];
    const tags = ["work", "lifestyle"];
    const { container } = renderComponent(adverts, tags, undefined, {
      adverts: false,
    });
    const filtersButton = screen.getByRole("link", {
      name: /nav-filters/i,
    });
    const resetFiltersButton = screen.getByRole("button", { name: /reset/ });
    const nameFilterInput = screen.getByLabelText(/name/i);
    const minPriceFilterInput = screen.getByLabelText(/minimum price/i);
    const maxPriceFilterInput = screen.getByLabelText(/maximum price/i);
    const workFilterCheck = screen.getByLabelText(/work/i);
    const lifestyleFilterCheck = screen.getByLabelText(/lifestyle/i);
    const sellFilterRadio = screen.getByLabelText(/sell/i);
    const buyFilterRadio = screen.getByLabelText(/buy/i);

    expect(container).toMatchSnapshot();
    await userEvent.click(filtersButton);
    // filter by name
    await userEvent.type(nameFilterInput, "1");
    expect(screen.getByText("advert 1")).toBeInTheDocument();
    expect(screen.getAllByText(/advert/)).toHaveLength(1);
    await userEvent.click(resetFiltersButton);
    // filter by min. price
    await userEvent.type(minPriceFilterInput, "8");
    expect(screen.getByText("advert 2")).toBeInTheDocument();
    expect(screen.getAllByText(/advert/)).toHaveLength(1);
    await userEvent.click(resetFiltersButton);
    // filter by max. price
    await userEvent.type(maxPriceFilterInput, "8");
    expect(screen.getByText("advert 1")).toBeInTheDocument();
    expect(screen.getAllByText(/advert/)).toHaveLength(1);
    await userEvent.click(resetFiltersButton);
    // filter by advert type
    await userEvent.click(sellFilterRadio);
    expect(screen.getByText("advert 2")).toBeInTheDocument();
    expect(screen.getAllByText(/advert/)).toHaveLength(1);
    await userEvent.click(resetFiltersButton);
    await userEvent.click(buyFilterRadio);
    expect(screen.getByText("advert 1")).toBeInTheDocument();
    expect(screen.getAllByText(/advert/)).toHaveLength(1);
    await userEvent.click(resetFiltersButton);
    // filter by tags
    await userEvent.click(workFilterCheck);
    expect(screen.getByText("advert 1")).toBeInTheDocument();
    expect(screen.getByText("advert 2")).toBeInTheDocument();
    expect(screen.getAllByText(/advert/)).toHaveLength(2);
    await userEvent.click(resetFiltersButton);
    await userEvent.click(lifestyleFilterCheck);
    expect(screen.getByText("advert 2")).toBeInTheDocument();
    expect(screen.getAllByText(/advert/)).toHaveLength(1);
    await userEvent.click(resetFiltersButton);
  });

  it("should dispatch alert component with error message", async () => {
    const error = new AxiosError<{ message: string }>("Unauthorized");
    const { container } = renderComponent([], [], error, { adverts: false });
    const alert = screen.getByRole("alert");

    expect(container).toMatchSnapshot();
    expect(alert).toHaveTextContent(error.message);
    await userEvent.click(alert);
    expect(uiResetError).toHaveBeenCalled();
  });
});
