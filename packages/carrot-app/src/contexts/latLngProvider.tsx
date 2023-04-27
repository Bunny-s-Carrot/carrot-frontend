import { createContext, useState, useContext } from "react";


const LatLngContext = createContext<any>({});

export const LatLngProvider = ({ children }: any) => {

  const [userLatLng, setUserLatLng] = useState({ lat: 0, lng: 0 });

  return (
    <LatLngContext.Provider 
      value={{ userLatLng, setUserLatLng }}
    >
      {children}
    </LatLngContext.Provider>
  )
}

export const useLatLngContext = () => useContext(LatLngContext);

export default LatLngContext;