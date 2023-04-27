import { createContext, useState, useContext } from "react";


const AdmCodesContext = createContext<any>({});

export const AdmCodesProvider = ({ children }: any) => {
  const [admCodes, setAdmCodes] = useState([]);

  return (
    <AdmCodesContext.Provider 
      value={{ admCodes, setAdmCodes }}
    >
      {children}
    </AdmCodesContext.Provider>
  )
}

export const useAdmCodesContext = () => useContext(AdmCodesContext);

export default AdmCodesContext;