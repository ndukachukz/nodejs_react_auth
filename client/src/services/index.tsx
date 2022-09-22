import React from "react";
import { FormEvent } from "react";
import { API_AUTH_URL, API_USERS_URL } from "../../constants";
import { State, User } from "../types";

/** onFormSubmit
 * @params setState - set apps state
 * @params email - user email
 * @params password - user email
 * @params fullName - user email string | undefined
 * @params state - app State
 */

export const onSubmit =
  (
    setState: React.Dispatch<React.SetStateAction<State>>,
    { email, fullName, password, ...rest }: User,
    state?: State,
    cb?: () => void
  ) =>
  async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !fullName || !password) return;

    const myHeaders = new Headers();

    myHeaders.append("Content-Type", "application/json");

    try {
      const res = await fetch(
        `${API_AUTH_URL}${state?.isRegister ? "register" : "login"}`,
        {
          body: JSON.stringify({
            email,
            password,
            ...(state?.isRegister && {
              fullName,
            }),
            ...rest,
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
        }));
      else {
        const { id } = await res.json();

        setState((prevState) => ({
          ...prevState,
          signInError: undefined,
          signedUid: id,
        }));

        const userRes = await fetch(`${API_USERS_URL}${id}`, {
          method: "GET",
          redirect: "follow",
        });

        if (userRes.ok) {
          const user = await userRes.json();

          setState((prevState) => ({
            ...prevState,
            signInError: undefined,
            signedUid: undefined,
            user,
          }));

          cb && cb();
        } else {
          console.log(userRes.statusText);
        }
      }
    } catch (error) {
      console.log("ERROR LOGGING IN =>", error);
    }
  };
