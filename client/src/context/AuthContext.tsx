import React, { useState } from "react";
import { State } from "../types";

interface DefaultValue {
  state: State;
  setState: React.Dispatch<React.SetStateAction<State>>;
}

export const AuthContext = React.createContext<DefaultValue>(
  {} as DefaultValue
);

export default function AuthProvider({ children }) {
  const [state, setState] = useState<State>({
    signedUid: undefined,
    signInError: undefined,
  });

  return (
    <AuthContext.Provider value={{ state, setState }}>
      {children}
    </AuthContext.Provider>
  );
}
