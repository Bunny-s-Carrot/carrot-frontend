import { createContext, useState, useContext } from "react";


const CustomContext = createContext<any>({});

export const CustomProvider = ({ children }: any) => {
  const [state, setState] = useState({});
  const [scrollTop, setScrollTop] = useState(0);

  return (
    <CustomContext.Provider 
      value={{ state, setState, scrollTop, setScrollTop }}>
      {children}
    </CustomContext.Provider>
  )
}

export const useCustomContext = () => useContext(CustomContext);

export default CustomContext;