import { createContext, useContext, ReactNode, useState } from "react";
interface userPlaceCount {
  urban: number;
  nature: number;
  sea: number;
  others: number;
}
type authContextType = {
  userExist: boolean | null;
  userDid: string | null;
  userPlaceCount: userPlaceCount | null;
  setUserExist: (val: boolean | null) => void;
  setUserDid: (val: string | null) => void;
  setUserPlaceCount: (obj: userPlaceCount) => void;
};

const authContextDefaultValues: authContextType = {
  userExist: null,
  setUserExist: () => {},
  userDid: null,
  setUserDid: () => {},
  userPlaceCount: null,
  setUserPlaceCount: () => {},
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
  const [userPlaceCount, setPlaceCount] = useState<userPlaceCount | null>(null);

  const setUserExist = (val: boolean | null) => {
    setUser(val);
  };
  const setUserDid = (val: string | null) => {
    setDid(val);
  };
  const setUserPlaceCount = (val: userPlaceCount) => {
    console.log(val);
    setPlaceCount(val);
  };

  const value = {
    userExist,
    setUserExist,
    userDid,
    setUserDid,
    userPlaceCount,
    setUserPlaceCount,
  };

  return (
    <>
      <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    </>
  );
}
