import { createContext, useState, useContext } from "react";


const UserContext = createContext<any>({});

export const UserProvider = ({ children }: any) => {
  const [user, setUser] = useState<number>(0);

  return (
    <UserContext.Provider 
      value={{ user, setUser }}
    >
      {children}
    </UserContext.Provider>
  )
}

export const useUserContext = () => useContext(UserContext);

export default UserContext;