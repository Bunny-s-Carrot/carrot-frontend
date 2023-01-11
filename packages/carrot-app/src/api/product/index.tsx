import { api } from "../../infra/api";
import { ProductType } from "./productDto";

const getProducts = async () => {
  try {
    const { data } = await api.get<{ payload: ProductType[] }>('/product');
    return data;
  } catch (e: any) {
    throw Error(e);
  }
}

const productApi = {
  getProducts,
}

export default productApi;