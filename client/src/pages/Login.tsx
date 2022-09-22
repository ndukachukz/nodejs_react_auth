import React, { ChangeEvent, useContext, useState } from "react";
import { LockClosedIcon } from "@heroicons/react/20/solid";
import { onSubmit } from "../services";
import { AuthContext } from "../context";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

export default () => {
  const { state, setState } = useContext(AuthContext);
  const navigate = useNavigate();

  const [{ email, password }, setInputFields] = useState({
    email: "",
    password: "",
  });

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) =>
    setInputFields((prevVals) => ({
      ...prevVals,
      [e.target.name]: e.target.value,
    }));
  const location = useLocation();

  return (
    <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <form
          className="mt-8 space-y-6"
          onSubmit={onSubmit(setState, { email, password }, state, () =>
            navigate("/dashboard", {
              state: {
                from: location,
              },
            })
          )}
        >
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="-space-y-px rounded-md shadow-sm">
            <div className="">
              <label htmlFor="email-address" className="sr-only">
                Email addressd
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
              <a
                href="/register"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Don't have an account? Register
              </a>
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
      </div>
    </div>
  );
};
