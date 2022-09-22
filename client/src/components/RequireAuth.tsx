import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default ({ children }: { children: JSX.Element }) => {
  let { state } = useAuth();
  let location = useLocation();

  if (!state.user) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
};
