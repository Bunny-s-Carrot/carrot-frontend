import { api } from "../../infra/api";
import { ProductTypeWithLocation, ProductDetailType } from "./productDto";

const getProducts = async () => {
  try {
    const { data } = await api.get<{ payload: ProductTypeWithLocation[] }>('/product');
    return data;
  } catch (e: any) {
    throw Error(e);
  }
}

const getProductDetail = async (product_id: string) => {
  try {
    const { data } = await api.get<{ payload: ProductDetailType }>(
      `product/${product_id}`);

    return data;
  } catch (e: any) {
    throw Error(e);
  }
}

const productApi = {
  getProducts,
  getProductDetail,
}

export default productApi;