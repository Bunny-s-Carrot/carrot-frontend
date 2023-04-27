import { createContext, useState, useContext } from "react";


const AccessTokenContext = createContext<any>({});

export const AccessTokenProvider = ({ children }: any) => {
  const [accessToken, setAccessToken] = useState('');

  return (
    <AccessTokenContext.Provider 
      value={{ accessToken, setAccessToken }}
    >
      {children}
    </AccessTokenContext.Provider>
  )
}

export const useAccessTokenContext = () => useContext(AccessTokenContext);

export default AccessTokenContext;