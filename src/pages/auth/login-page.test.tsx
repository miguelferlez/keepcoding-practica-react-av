import { AxiosError } from "axios";
import { Provider } from "react-redux";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LoginPage from "./login-page";
import type { RootState } from "@/store";
import { authLogin, uiResetError } from "@/store/actions";

vi.mock("@/store/actions");

describe("LoginPage", () => {
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
  const renderComponent = (error?: AxiosError<{ message: string }>) => {
    if (error) {
      state.ui.error = error;
    }

    return render(
      //@ts-expect-error: store configuration not needed
      <Provider store={store}>
        <LoginPage />
      </Provider>,
    );
  };

  it("should render", () => {
    const { container } = renderComponent();

    expect(container).toMatchSnapshot();
  });

  it("should dispatch login action", async () => {
    renderComponent();
    const usernameInput = screen.getByLabelText(/username/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const rememberCheck = screen.getByRole("checkbox");
    const submitButton = screen.getByRole("button");

    expect(submitButton).toHaveTextContent("Submit");
    expect(submitButton).toBeDisabled();
    await userEvent.type(usernameInput, "test@test.com");
    await userEvent.type(passwordInput, "1234");
    expect(submitButton).toBeEnabled();
    await userEvent.click(submitButton);
    expect(authLogin).toBeCalledWith(
      { email: "test@test.com", password: "1234" },
      false,
    );
    await userEvent.click(rememberCheck);
    expect(rememberCheck).toBeChecked();
    await userEvent.click(submitButton);
    expect(authLogin).toBeCalledWith(
      { email: "test@test.com", password: "1234" },
      true,
    );
  });

  it("should dispatch alert component with error message", async () => {
    const error = new AxiosError<{ message: string }>("Unauthorized");
    const { container } = renderComponent(error);
    const alert = screen.getByRole("alert");

    expect(container).toMatchSnapshot();
    expect(alert).toHaveTextContent(error.message);
    await userEvent.click(alert);
    expect(uiResetError).toHaveBeenCalled();
  });
});
