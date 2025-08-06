import { AxiosError } from "axios";
import { useState, type ChangeEvent, type FormEvent } from "react";
import { useLocation, useNavigate } from "react-router";
import type { Credentials } from "./types";
import CheckboxField from "@/components/shared/checkbox-field";
import InputField from "@/components/shared/input-field";
import Alert from "@/components/ui/alert";
import Button from "@/components/ui/button";
import { useAppSelector } from "@/store";
import { useLoginAction, useUiResetErrorAction } from "@/store/hooks";
import { getUi } from "@/store/selectors";

function LoginPage() {
  const [credentials, setCredentials] = useState<Credentials>({
    email: "",
    password: "",
  });
  const [remember, setRemember] = useState<boolean>(false);
  const { email, password } = credentials;
  const location = useLocation();
  const navigate = useNavigate();
  const loginAction = useLoginAction();
  const uiResetErrorAction = useUiResetErrorAction();
  const { pending, error } = useAppSelector(getUi);
  const isDisabled = !email || !password || pending.auth;

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setCredentials((credentials) => ({
      ...credentials,
      [event.target.name]: event.target.value,
    }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      await loginAction(credentials, remember);
      navigate(location.state?.from ?? "/", { replace: true });
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error);
      }
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="xs:border-primary/15 xs:rounded-lg xs:border xs:shadow-xl p-8 sm:max-w-md">
        <div className="flex flex-col gap-4">
          <h2 className="text-center">Log In</h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-2">
            <InputField
              type="email"
              label="Username"
              id="email"
              name="email"
              value={email}
              onChange={handleChange}
              required
            />
            <InputField
              type="password"
              label="Password"
              id="password"
              name="password"
              value={password}
              onChange={handleChange}
              required
            />
            <CheckboxField
              label="Remember me"
              id="remember"
              checked={remember}
              onChange={() => setRemember((remember) => !remember)}
            />
            <Button
              type="submit"
              label="Submit"
              disabled={isDisabled}
              variant="primary"
            />
          </form>
        </div>
      </div>
      <div className="fixed top-11.5 left-1/2 z-50 -translate-x-1/2">
        {error && (
          <Alert
            text={error.response?.data?.message || error.message}
            variant="error"
            onClick={() => uiResetErrorAction()}
          />
        )}
      </div>
    </div>
  );
}

export default LoginPage;
