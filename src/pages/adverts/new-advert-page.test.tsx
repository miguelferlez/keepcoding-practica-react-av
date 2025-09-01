import { AxiosError } from "axios";
import { Provider } from "react-redux";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import NewAdvertPage from "./new-advert-page";
import type { RootState } from "@/store";
import { advertsCreated, uiResetError } from "@/store/actions";

vi.mock("@/store/actions");

describe("NewAdvertPage", () => {
  const state: RootState = {
    auth: false,
    ui: {
      pending: { auth: false, adverts: false, tags: false },
      error: null,
    },
    adverts: { loaded: false, data: [], tags: [] },
  };

  const tags = ["work", "lifestyle"];

  const store = {
    getState: () => state,
    subscribe: () => {},
    dispatch: () => {},
  };

  const renderComponent = (
    tags: string[],
    error?: AxiosError<{ message: string }>,
    pending: Partial<RootState["ui"]["pending"]> = {},
  ) => {
    state.adverts.tags = tags;
    state.ui.error = error || null;
    state.ui.pending = { ...state.ui.pending, ...pending };

    return render(
      // @ts-expect-error: store completed config not needed
      <Provider store={store}>
        <NewAdvertPage />
      </Provider>,
    );
  };

  it("should dispatch loader when pending", () => {
    const { container } = renderComponent(tags, undefined, { adverts: true });

    expect(container).toMatchSnapshot();
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("should update and check name field value", async () => {
    renderComponent(tags, undefined, { adverts: false });
    const nameInput = screen.getByLabelText(/name/i) as HTMLInputElement;
    const invalidText =
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin nec purus vitae leo aliquet.";

    await userEvent.type(nameInput, "new advert");
    expect(nameInput.value).toBe("new advert");
    await userEvent.clear(nameInput);
    await userEvent.type(nameInput, invalidText);
    expect(nameInput.maxLength).toEqual(
      Number(import.meta.env.VITE_ADVERT_MAX_CHARS),
    );
    expect(nameInput.value.length).not.toBeGreaterThan(nameInput.maxLength);
    expect(nameInput.value).toEqual(invalidText.slice(0, nameInput.maxLength));
    expect(nameInput).toBeRequired();
  });

  it("should update and check price field value", async () => {
    renderComponent(tags, undefined, { adverts: false });
    const priceInput = screen.getByLabelText(/price/i) as HTMLInputElement;
    const invalidMinPrice = Number(priceInput.min) - 1;
    const invalidMaxPrice = Number(priceInput.max) + 1;

    await userEvent.type(priceInput, "10");
    expect(priceInput.value).toBe("10");
    expect(priceInput.validity.valid).toBe(true);
    await userEvent.clear(priceInput);
    await userEvent.type(priceInput, invalidMinPrice.toString());
    expect(priceInput.validity.valid).toBe(false);
    await userEvent.clear(priceInput);
    await userEvent.type(priceInput, invalidMaxPrice.toString());
    expect(priceInput.validity.valid).toBe(false);
  });

  it("should update and check tags field value", async () => {
    renderComponent(tags, undefined, { adverts: false });
    const workTagInput = screen.getByLabelText(/work/i);
    const lifestyleTagInput = screen.getByLabelText(/lifestyle/i);

    expect(workTagInput).not.toBeChecked();
    expect(lifestyleTagInput).not.toBeChecked();
    await userEvent.click(workTagInput);
    expect(workTagInput).toBeChecked();
    await userEvent.click(workTagInput);
    expect(workTagInput).not.toBeChecked();
  });

  it("should update and check sale field value", async () => {
    renderComponent(tags, undefined, { adverts: false });
    const sellRadioInput = screen.getByLabelText(/sell/i);
    const buyRadioInput = screen.getByLabelText(/buy/i);

    expect(sellRadioInput).toBeChecked();
    expect(buyRadioInput).not.toBeChecked();
    await userEvent.click(buyRadioInput);
    expect(sellRadioInput).not.toBeChecked();
    expect(buyRadioInput).toBeChecked();
  });

  it("should update and check image field value", async () => {
    renderComponent(tags, undefined, { adverts: false });
    const imageInput = screen.getByLabelText(/drag/i) as HTMLInputElement;
    const image: File = new File(["image-content"], "image.png", {
      type: "image/png",
    });

    expect(imageInput.value).toBeFalsy();
    await userEvent.upload(imageInput, image);
    expect(imageInput.value).toBe(String.raw`C:\fakepath\image.png`);
    expect(imageInput.files).toHaveLength(1);
    expect(imageInput.files?.[0].name).toBe("image.png");
  });

  it("should dispatch advert create with input value without image", async () => {
    const { container } = renderComponent(tags, undefined, { adverts: false });
    const nameInput = screen.getByLabelText(/name/i);
    const priceInput = screen.getByLabelText(/price/i);
    const workTagInput = screen.getByLabelText(/work/i);
    const sellRadioInput = screen.getByLabelText(/sell/i);
    const submitButton = screen.getByRole("button");

    expect(container).toMatchSnapshot();
    await userEvent.type(nameInput, "advert 1");
    await userEvent.type(priceInput, "10");
    await userEvent.click(workTagInput);
    await userEvent.click(sellRadioInput);
    await userEvent.click(submitButton);
    expect(advertsCreated).toHaveBeenCalledWith({
      name: "advert 1",
      price: 10,
      tags: ["work"],
      sale: true,
      photo: undefined,
    });
  });

  it("should dispatch advert create with input value with image", async () => {
    const { container } = renderComponent(tags, undefined, { adverts: false });
    const nameInput = screen.getByLabelText(/name/i);
    const priceInput = screen.getByLabelText(/price/i);
    const workTagInput = screen.getByLabelText(/work/i);
    const lifestyleTagInput = screen.getByLabelText(/lifestyle/i);
    const buyRadioInput = screen.getByLabelText(/buy/i);
    const submitButton = screen.getByRole("button");
    const imageInput = screen.getByTestId("photo-input") as HTMLInputElement;
    const image: File = new File(["image-content"], "image.png", {
      type: "image/png",
    });

    expect(container).toMatchSnapshot();
    await userEvent.upload(imageInput, image);
    await userEvent.type(nameInput, "advert 2");
    await userEvent.type(priceInput, "10");
    await userEvent.click(workTagInput);
    await userEvent.click(lifestyleTagInput);
    await userEvent.click(buyRadioInput);
    await userEvent.click(submitButton);
    expect(advertsCreated).toHaveBeenCalledWith({
      name: "advert 2",
      price: 10,
      tags: ["work", "lifestyle"],
      sale: false,
      photo: image,
    });
  });

  it("should dispatch alert component with error message", async () => {
    const error = new AxiosError<{ message: string }>("Error message");
    const { container } = renderComponent(tags, error, { adverts: false });
    const alert = screen.getByRole("alert");

    expect(container).toMatchSnapshot();
    expect(alert).toHaveTextContent(error.message);
    await userEvent.click(alert);
    expect(uiResetError).toHaveBeenCalled();
  });
});
