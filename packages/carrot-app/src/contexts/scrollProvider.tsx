import { createContext, useState, useContext } from "react";


const ScrollContext = createContext<any>({});

export const ScrollProvider = ({ children }: any) => {
  const [scrollTop, setScrollTop] = useState<number>(0);

  return (
    <ScrollContext.Provider 
      value={{ scrollTop, setScrollTop }}
    >
      {children}
    </ScrollContext.Provider>
  )
}

export const useScrollContext = () => useContext(ScrollContext);

export default ScrollContext;