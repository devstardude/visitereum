import { createContext, useContext, ReactNode, useState } from "react";

type authContextType = {
  did: string | null;
  setDid: (value: string | null) => void;
};

const authContextDefaultValues: authContextType = {
  did: null,
  setDid: () => {},
};

const AuthContext = createContext<authContextType>(authContextDefaultValues);

export function useAuth() {
  return useContext(AuthContext);
}

type Props = {
  children: ReactNode;
};

export function AuthProvider({ children }: Props) {
  const [did, setDidValue] = useState<string | null>(null);

  const setDid = (value: string | null) => {
    setDidValue(value);
  };

  const value = {
    did,
    setDid,
  };

  return (
    <>
      <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    </>
  );
}
