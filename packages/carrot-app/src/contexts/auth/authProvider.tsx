import { createContext, useState, useContext } from "react";

type AuthType = {
  auth: any;
  setAuth: React.Dispatch<React.SetStateAction<any>>
}
  
const AuthContext = createContext<AuthType>({
  auth: {},
  setAuth: () => {},


});

export const AuthProvider = ({ children }: any) => {
  const [auth, setAuth] = useState({});

  return (
    <AuthContext.Provider 
      value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext<AuthType>(AuthContext);

export default AuthContext;