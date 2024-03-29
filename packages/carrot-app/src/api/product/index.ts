import { api, fileApi } from '../../infra/api';
import { ProductTypeWithLocation, ProductDetailType } from './productDto';

type ProductData = {
  image: File[];
  seller_id: number;
  seller_location: number;
  seller_adm_cd: string;
  title: string;
  price: number;
  contents: string;
  wanted_location: string;
  price_suggest: boolean;
  share: boolean;
  classif_id: number;
};

const getProducts = async (admCodes: string) => {
  try {
    const { data } = await api.get<{ payload: ProductTypeWithLocation[] }>(
      '/product',
      {
        params: { admCodes },
      },
    );
    return data;
  } catch (e: any) {
    throw Error(e);
  }
};

const getProductDetail = async (product_id: string) => {
  try {
    const { data } = await api.get<{ payload: ProductDetailType }>(
      `product/${product_id}`,
    );

    return data;
  } catch (e: any) {
    throw Error(e);
  }
};

const createProduct = async ({
  image,
  seller_id,
  seller_location,
  seller_adm_cd,
  title,
  price,
  contents,
  wanted_location,
  price_suggest,
  share,
  classif_id,
}: ProductData) => {
  try {
    const result = await api
      .post('/product', {
        seller_id,
        seller_location,
        seller_adm_cd,
        title,
        price,
        contents,
        wanted_location,
        price_suggest,
        share,
        classif_id,
      })
      .then((res) => {
        fileApi.post(`/product/image/upload`, {
          payload: res,
          image,
        });
      });

    return result;
  } catch (e: any) {
    throw Error(e);
  }
};

const deleteProduct = async ({ product_id }: { product_id: number }) => {
  const response = await api
    .delete(`/product/${product_id}/delete`)
    .then((_) => {
      api.get(`/product/image/${product_id}/delete`);
    });

  return response;
};

const getImageList = async (productId: string) => {
  try {
    const { data } = await api.get(`/product/image/${productId}`);
    return data.payload;
  } catch (e: any) {
    throw Error(e);
  }
};

const getThumbnail = async (productId: string) => {
  try {
    const { data } = await api.get(`product/image/${productId}/thumbnail`);
    return data.payload;
  } catch (e: any) {
    throw Error(e);
  }
};

const productApi = {
  getProducts,
  getProductDetail,
  createProduct,
  deleteProduct,
  getImageList,
  getThumbnail,
};

export default productApi;
