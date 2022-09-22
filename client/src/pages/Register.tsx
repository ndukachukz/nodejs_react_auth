import React, { ChangeEvent, useContext, useEffect, useState } from "react";
import { LockClosedIcon } from "@heroicons/react/20/solid";
import { onSubmit } from "../services";
import { AuthContext } from "../context";
import { useAuth } from "../hooks";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

export default () => {
  const { state, setState } = useContext(AuthContext);
  const navigate = useNavigate();

  const [{ email, password, fullName, ...rest }, setInputFields] = useState({
    fullName: "",
    email: "",
    password: "",
    age: 0,
    yrsExp: 0,
    occupation: "",
    address: "",
  });

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) =>
    setInputFields((prevVals) => ({
      ...prevVals,
      [e.target.name]: e.target.value,
    }));
  const location = useLocation();

  useEffect(() => {
    setState((prevState) => ({
      ...prevState,
      isRegister: true,
    }));
  }, []);

  return (
    <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Signup with your info
          </h2>
        </div>

        <form
          className="mt-8 space-y-6"
          onSubmit={onSubmit(
            setState,
            { email, password, fullName, ...rest },
            state,
            () =>
              navigate("/dashboard", {
                state: {
                  from: location,
                },
              })
          )}
        >
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="-space-y-px rounded-md shadow-sm">
            <div>
              <label htmlFor="full-name" className="sr-only">
                Full Name
              </label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                onChange={onChangeInput}
                required
                className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                placeholder="Full Name"
              />
            </div>
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
                className="relative my-2 block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                placeholder="Password"
              />
            </div>
            <div className="md:flex justify-between">
              <div>
                <label htmlFor="age" className="sr-only">
                  Age
                </label>
                <input
                  id="age"
                  name="age"
                  onChange={onChangeInput}
                  type="number"
                  required
                  className="relative my-2 block w-full appearance-none rounded-none  border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Age"
                />
              </div>
              <div>
                <label htmlFor="yrsExp" className="sr-only">
                  Experience
                </label>
                <input
                  id="yrsExp"
                  name="yrsExp"
                  onChange={onChangeInput}
                  type="number"
                  required
                  className="relative my-2 block w-full appearance-none rounded-none  border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Years of Experince"
                />
              </div>
            </div>

            <div>
              <label htmlFor="occupation" className="sr-only">
                Occupation
              </label>
              <input
                id="occupation"
                name="occupation"
                onChange={onChangeInput}
                type="text"
                required
                className="relative my-2 block w-full appearance-none rounded-none  border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                placeholder="Occupation"
              />
            </div>
            <div>
              <label htmlFor="address" className="sr-only">
                Address
              </label>
              <input
                id="address"
                name="address"
                onChange={onChangeInput}
                type="text"
                required
                className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                placeholder="address"
              />
            </div>
          </div>

          <div className="flex items-center">
            <div className="text-sm">
              <a
                href="/"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Already have an account? Login
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
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
