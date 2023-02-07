import { api } from "../../infra/api";
import { UpdateHeartType } from "./heartDto";

const updateHeart = async ({
  type,
  id,
  user_id,
  plus
}: UpdateHeartType) => {
  try {
    const result = await api.post(`/heart`,
    {
      type,
      product_id: type === 'product' ? id :null,
      post_id: type === 'post' ? id : null,
      user_id,
      plus
    });
    return result;
  } catch (e:any) {
    throw Error(e);
  }
}

const getHeart = async (type: string, id: string, login_id: string) => {
  try {
    const { data } = await api.get<{ payload: { heart: boolean } }>(`/heart/${type}/${id}`,
    {
      params: { login_id }
    });
    return data.payload;
  } catch (e: any) {
    throw Error(e);
  }

}

const heartApi = {
  updateHeart,
  getHeart,
}

export default heartApi