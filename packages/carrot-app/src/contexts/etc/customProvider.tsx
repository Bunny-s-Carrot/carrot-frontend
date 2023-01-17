import { createContext, useState, useContext } from "react";


const CustomContext = createContext<any>({});

export const CustomProvider = ({ children }: any) => {
  const [activeLocation, setActiveLocation] = useState<number>(0);
  const [scrollTop, setScrollTop] = useState<number>(0);
  const [area, setArea] = useState('');
  const [accessToken, setAccessToken] = useState('')
  const [userLatLng, setUserLatLng] = useState({
    lat: 0,
    lng: 0
  })
  return (
    <CustomContext.Provider 
      value={{ activeLocation, setActiveLocation, scrollTop, setScrollTop, area, setArea,
                accessToken, setAccessToken, userLatLng, setUserLatLng }}
    >
      {children}
    </CustomContext.Provider>
  )
}

export const useCustomContext = () => useContext(CustomContext);

export default CustomContext;