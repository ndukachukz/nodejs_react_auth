import React, {
  ChangeEvent,
  FormEvent,
  useCallback,
  useEffect,
  useState,
} from "react";
import { LockClosedIcon } from "@heroicons/react/20/solid";

interface User {
  id: string;
  email: string;
  username: string;
  password: string;
  createdAt: string;
  updatedAt: string;
}
interface State {
  signedUid: undefined | string;
  signInError: undefined | string;
  isRegister?: boolean;
  user?: User;
  showDash?: boolean;
}

export default () => {
  const [state, setState] = useState<State>({
    signedUid: undefined,
    signInError: undefined,
    isRegister: true,
    showDash: false,
  });

  const [{ email, password, username }, setInputFields] = useState({
    username: "",
    email: "",
    password: "",
  });

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) =>
    setInputFields((prevVals) => ({
      ...prevVals,
      [e.target.name]: e.target.value,
    }));

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    try {
      console.log(
        `http://localhost:8080/auth/${state.isRegister ? "register" : "login"}`
      );
      const res = await fetch(
        `http://localhost:8080/auth/${state.isRegister ? "register" : "login"}`,
        {
          body: JSON.stringify({
            email,
            password,
            ...(state.isRegister && {
              username,
            }),
          }),
          method: "POST",
          headers: myHeaders,
          redirect: "follow",
        }
      );

      if (!res.ok)
        setState((prevState) => ({
          ...prevState,
          signInError: res.statusText,
          signedUid: undefined,
          isRegister: true,
        }));
      else {
        const { id } = await res.json();

        setState((prevState) => ({
          ...prevState,
          signInError: undefined,
          signedUid: id,
        }));

        const userRes = await fetch(`http://localhost:8080/users/${id}`, {
          method: "GET",
          redirect: "follow",
        });

        if (userRes.ok) {
          const user = await userRes.json();

          setState((prevState) => ({
            ...prevState,
            signInError: undefined,
            signedUid: undefined,
            isRegister: false,
            user,
            showDash: true,
          }));

          console.log("USER =>", user);
        } else {
          console.log(userRes.statusText);
        }
      }
    } catch (error) {
      console.log("ERROR LOGGING IN =>", error);
    }
  };

  useEffect(() => {
    console.log("APP STATE =>", state);
  }, [state]);

  return (
    <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            {!state.showDash && (
              <>
                {state.isRegister
                  ? "Signup with your info"
                  : "Sign in to your account"}
              </>
            )}
          </h2>
        </div>
        {!state.showDash ? (
          <form className="mt-8 space-y-6" onSubmit={onSubmit}>
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="-space-y-px rounded-md shadow-sm">
              {state.isRegister && (
                <div>
                  <label htmlFor="email-address" className="sr-only">
                    User Name
                  </label>
                  <input
                    id="username"
                    name="username"
                    type="username"
                    onChange={onChangeInput}
                    required
                    className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    placeholder="User Name"
                  />
                </div>
              )}
              <div className="">
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  onChange={onChangeInput}
                  required
                  className="relative my-2 block w-full appearance-none rounded-none  border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Email address"
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  onChange={onChangeInput}
                  type="password"
                  autoComplete="current-password"
                  required
                  className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Password"
                />
              </div>
            </div>

            <div className="flex items-center">
              <div className="text-sm">
                <button
                  onClick={() =>
                    setState({
                      isRegister: !state.isRegister,
                      signedUid: undefined,
                      signInError: undefined,
                    })
                  }
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  {state.isRegister
                    ? "Already have an account? Login"
                    : "Don't have an account? Register"}
                </button>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <LockClosedIcon
                    className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                    aria-hidden="true"
                  />
                </span>
                {state.isRegister ? "Sign Up" : "Sign in"}
              </button>
            </div>
          </form>
        ) : (
          <>HELLO, {state.user?.username}</>
        )}
      </div>
    </div>
  );
};
