import { AxiosError } from "axios";
import { Provider } from "react-redux";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AdvertsPage from "./adverts-page";
import type { RootState } from "@/store";
import { advertsLoaded, uiResetError } from "@/store/actions";
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
    error?: AxiosError<{ message: string }>,
    pending: Partial<RootState["ui"]["pending"]> = {},
  ) => {
    state.adverts.data = adverts;
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
    const { container } = renderComponent([], undefined, { adverts: true });

    expect(container).toMatchSnapshot();
    expect(screen.getByRole("status")).toBeInTheDocument();
    expect(advertsLoaded).toHaveBeenCalled();
  });

  it("should dispatch empty warning when no adverts", () => {
    const { container } = renderComponent([], undefined, { adverts: false });
    const advertsEmptyWarning = screen.getByTestId(/empty/i);
    const newAdvertButton = screen.getByRole("link", {
      name: /warning-new-advert/i,
    });

    expect(container).toMatchSnapshot();
    expect(advertsEmptyWarning).toBeInTheDocument();
    expect(advertsLoaded).toHaveBeenCalled();
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
    const { container } = renderComponent([advert], undefined, {
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
        price: 5,
        tags: ["tag1"],
        photo: null,
      },
      {
        id: "2",
        createdAt: "2025-08-11T12:05:28.000Z",
        name: "advert 2",
        sale: true,
        price: 10,
        tags: ["tag1", "tag2"],
        photo: null,
      },
    ];
    const { container } = renderComponent(adverts, undefined, {
      adverts: false,
    });
    const filtersButton = screen.getByRole("link", {
      name: /nav-filters/i,
    });
    const nameFilterInput = screen.getByLabelText(/name/i);

    expect(container).toMatchSnapshot();
    await userEvent.click(filtersButton);
    await userEvent.type(nameFilterInput, "1");
    expect(screen.getByText("advert 1")).toBeInTheDocument();
    expect(screen.getAllByText(/advert/)).toHaveLength(1);
    expect(state.adverts.data).toHaveLength(2);
    await userEvent.type(nameFilterInput, "3");
    const advertsNotFoundWarning = screen.getByTestId(/not-found/i);
    expect(advertsNotFoundWarning).toBeInTheDocument();
  });

  it("should dispatch alert component with error message", async () => {
    const error = new AxiosError<{ message: string }>("Unauthorized");
    const { container } = renderComponent([], error, { adverts: false });
    const alert = screen.getByRole("alert");

    expect(container).toMatchSnapshot();
    expect(alert).toHaveTextContent(error.message);
    await userEvent.click(alert);
    expect(uiResetError).toHaveBeenCalled();
  });
});
