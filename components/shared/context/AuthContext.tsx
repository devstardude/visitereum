import { createContext, useContext, ReactNode, useState } from "react";

type authContextType = {
  userExist: boolean | null;
  userDid: string | null;
  setUserExist: (val: boolean | null) => void;
  setUserDid: (val: string | null) => void;
};

const authContextDefaultValues: authContextType = {
  userExist: null,
  userDid: null,
  setUserExist: () => {},
  setUserDid: () => {},
};

const AuthContext = createContext<authContextType>(authContextDefaultValues);

export function useAuth() {
  return useContext(AuthContext);
}

type Props = {
  children: ReactNode;
};

export function AuthProvider({ children }: Props) {
  const [userExist, setUser] = useState<boolean | null>(null);
  const [userDid, setDid] = useState<string | null>(null);

  const setUserExist = (val: boolean | null) => {
    setUser(val);
  };
  const setUserDid = (val: string | null) => {
    setDid(val);
  };

  const value = {
    userExist,
    setUserExist,
    userDid,
    setUserDid,
  };

  return (
    <>
      <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    </>
  );
}
