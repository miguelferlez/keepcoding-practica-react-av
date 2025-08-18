import { AxiosError } from "axios";
import { Provider } from "react-redux";
import { MemoryRouter, Route, Routes } from "react-router";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AdvertPage from "./advert-page";
import type { Advert } from "./types";
import type { RootState } from "@/store";
import { advertsDeleted, advertsDetail, uiResetError } from "@/store/actions";

vi.mock("@/store/actions");
vi.mock("date-fns", () => {
  return {
    formatDistanceToNow: () => "X days",
  };
});

describe("AdvertPage", () => {
  const state: RootState = {
    auth: false,
    ui: {
      pending: { auth: false, adverts: false, tags: false },
      error: null,
    },
    adverts: { loaded: false, data: [], tags: [] },
  };

  const advert = {
    id: "1",
    createdAt: "2025-08-10T10:25:58.000Z",
    name: "test",
    sale: false,
    price: 0,
    tags: ["work", "lifestyle"],
    photo: null,
  };

  const store = {
    getState: () => state,
    subscribe: () => {},
    dispatch: () => {},
  };

  const renderComponent = (
    advert: Advert,
    error?: AxiosError<{ message: string }>,
    pending: Partial<RootState["ui"]["pending"]> = {},
  ) => {
    state.adverts.data = [advert];
    state.ui.error = error || null;
    state.ui.pending = { ...state.ui.pending, ...pending };

    return render(
      // @ts-expect-error: store completed config not needed
      <Provider store={store}>
        <MemoryRouter initialEntries={[`/adverts/${advert.id}`]}>
          <Routes>
            <Route path="/adverts/:advertId" element={<AdvertPage />} />
          </Routes>
        </MemoryRouter>
      </Provider>,
    );
  };

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should dispatch loader when pending", () => {
    const { container } = renderComponent(advert, undefined, { adverts: true });

    expect(container).toMatchSnapshot();
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("should dispatch advert details", () => {
    const { container } = renderComponent(advert, undefined, {
      adverts: false,
    });

    expect(container).toMatchSnapshot();
    expect(advertsDetail).toHaveBeenCalledWith(advert.id);
    expect(screen.getByText(advert.name)).toBeInTheDocument();
    expect(screen.getByText(`$${advert.price.toFixed(2)}`)).toBeInTheDocument();
    expect(screen.getByText("Buy")).toBeInTheDocument();
    expect(screen.getByText(`#${advert.tags[0]}`)).toBeInTheDocument();
    expect(screen.getAllByText(/#/)).toHaveLength(2);
  });

  it("should dispatch advert deletion when button and modal clicked", async () => {
    const { container } = renderComponent(advert, undefined, {
      adverts: false,
    });
    const deleteButton = screen.getByRole("button");

    expect(container).toMatchSnapshot();
    // open modal
    await userEvent.click(deleteButton);
    const modal = screen.getByRole("dialog");
    expect(modal).toBeInTheDocument();
    // confirm modal
    const confirmModalButton = screen.getByRole("button", { name: /yes/i });
    await userEvent.click(confirmModalButton);
    expect(advertsDeleted).toHaveBeenCalledWith(advert.id);
  });

  it("should cancel advert deletion when button clicked but modal cancel", async () => {
    const { container } = renderComponent(advert, undefined, {
      adverts: false,
    });
    const deleteButton = screen.getByRole("button");

    expect(container).toMatchSnapshot();
    // open modal
    await userEvent.click(deleteButton);
    const modal = screen.getByRole("dialog");
    expect(modal).toBeInTheDocument();
    // close modal
    const closeModalButton = screen.getByRole("button", { name: /close/ });
    await userEvent.click(closeModalButton);
    expect(advertsDeleted).not.toHaveBeenCalled();
    expect(modal).not.toBeInTheDocument();
  });

  it("should dispatch alert component with error message", async () => {
    const error = new AxiosError<{ message: string }>("Error message");
    const { container } = renderComponent(advert, error, { adverts: false });
    const alert = screen.getByRole("alert");

    expect(container).toMatchSnapshot();
    expect(alert).toHaveTextContent(error.message);
    await userEvent.click(alert);
    expect(uiResetError).toHaveBeenCalled();
  });
});
