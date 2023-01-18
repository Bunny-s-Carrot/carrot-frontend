import { useQuery } from "@tanstack/react-query"
import productApi from "../../api/product"
import userApi from "../../api/user"
import useJwtDecode from "../../hooks/auth/useJwtDecode"


const useProductViewModel = () => {

  const { getId } = useJwtDecode();
  const userId = getId();
  
  const { data: products } = useQuery(['product'], productApi.getProducts)
  
  const { data: userLocation } = useQuery([`user/${userId}/location`], 
    () => userApi.getLocationById(userId))

  return {
    products,
    userLocation
  }
}

export default useProductViewModel