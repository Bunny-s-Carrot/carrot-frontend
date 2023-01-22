import { api, fileApi } from "../../infra/api";
import { ProductTypeWithLocation, ProductDetailType } from "./productDto";

type ProductData = {
  image: File[]
  seller_id: number
  seller_location: number
  title: string
  price: number
  contents: string
  wanted_location: string
  price_suggest: boolean,
  share: boolean
  classif_id: number
}

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

const createProduct = async ({
  image,
  seller_id,
  seller_location, 
  title,
  price,
  contents,
  wanted_location,
  price_suggest,
  share,
  classif_id }: ProductData) => {
    try {
    const result = await api.post('/product',
    {
      seller_id,
      seller_location,
      title,
      price,
      contents,
      wanted_location,
      price_suggest,
      share,
      classif_id,
    }).then(res => {
      fileApi.post(`/product/image/upload`,
      {
        payload: res,
        image,
      })
    })

    return result;
  } catch (e: any) {
    throw Error(e);
  }
}

const productApi = {
  getProducts,
  getProductDetail,
  createProduct,
}

export default productApi;