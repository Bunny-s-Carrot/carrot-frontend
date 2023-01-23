import { useEffect, useMemo } from "react"
import { useLocation } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import productApi from "../../api/product"
import { getActiveLocation } from "../../infra/location/activeLocation"
import { setFrom } from "../../infra/from"






const useHomeViewModel = () => {
  const location = useLocation();
  useEffect(() => {
    setFrom(location.pathname)

  }, [location.pathname])
  
  const activeLocation = useMemo(() => getActiveLocation(), []);
  
  const { data: products } = useQuery(['product'], productApi.getProducts)
  
 
  return {
    products,
    activeLocation,
  }
}

export default useHomeViewModel
