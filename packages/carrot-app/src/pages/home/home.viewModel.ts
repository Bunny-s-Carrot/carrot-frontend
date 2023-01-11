import { useQuery } from "@tanstack/react-query"
import productApi from "../../api/product"


const useProductViewModel = () => {

  const { data } = useQuery(['product'], productApi.getProducts)

  return {
    data
  }
}

export default useProductViewModel