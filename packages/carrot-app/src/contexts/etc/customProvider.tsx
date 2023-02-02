import { createContext, useState, useContext } from "react";


const CustomContext = createContext<any>({});

export const CustomProvider = ({ children }: any) => {
  const [user, setUser] = useState<number>(0);
  const [scrollTop, setScrollTop] = useState<number>(0);
  const [accessToken, setAccessToken] = useState('');
  const [userLatLng, setUserLatLng] = useState({ lat: 0, lng: 0 });
  const [admCodes, setAdmCodes] = useState([]);
  return (
    <CustomContext.Provider 
      value={{ user, setUser, scrollTop, setScrollTop,
                accessToken, setAccessToken, userLatLng, setUserLatLng,
                admCodes, setAdmCodes }}
    >
      {children}
    </CustomContext.Provider>
  )
}

export const useCustomContext = () => useContext(CustomContext);

export default CustomContext;