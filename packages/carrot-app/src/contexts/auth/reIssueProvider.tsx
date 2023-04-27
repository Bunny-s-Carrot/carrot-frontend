import { createContext, useState, useContext } from "react";


const ReIssueContext = createContext<any>({});

export const ReIssueProvider = ({ children }: any) => {
  const [reloading, setReloading] = useState(true);

  return (
    <ReIssueContext.Provider 
      value={{ reloading, setReloading }}
    >
      {children}
    </ReIssueContext.Provider>
  )
}

export const useReIssueContext = () => useContext(ReIssueContext);

export default ReIssueContext;