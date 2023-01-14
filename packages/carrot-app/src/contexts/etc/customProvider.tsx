import { createContext, useState, useContext } from "react";


const CustomContext = createContext<any>({});

export const CustomProvider = ({ children }: any) => {
  const [state, setState] = useState({});
  const [scrollTop, setScrollTop] = useState(0);
  const [area, setArea] = useState('');
  const [accessToken, setAccessToken] = useState('')
  return (
    <CustomContext.Provider 
      value={{ state, setState, scrollTop, setScrollTop, area, setArea,
                accessToken, setAccessToken }}>
      {children}
    </CustomContext.Provider>
  )
}

export const useCustomContext = () => useContext(CustomContext);

export default CustomContext;