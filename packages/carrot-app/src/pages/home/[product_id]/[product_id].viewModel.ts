import { useQuery } from "@tanstack/react-query";
import productApi from "../../../api/product";
import { useParams } from "react-router-dom";

const useProductDetailViewModel = () => {
  const params = useParams<{ product_id: string }>();

  const { data } = useQuery(['product', params.product_id], () =>
    productApi.getProductDetail(params.product_id!))
  return {
    data: data?.payload
  }
}

export default useProductDetailViewModel;