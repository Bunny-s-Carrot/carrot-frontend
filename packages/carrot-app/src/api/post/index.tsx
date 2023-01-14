import { api } from "../../infra/api";
import { PostType, PostDetailType } from "./postDto";

const getPosts = async () => {
    try {
        const { data } = await api.get<{ payload: PostType[] }>('/post');
        return data;
    } catch (e: any) {
      throw Error(e);
    }
}

const getPostDetail = async (post_id: string) => {
  try {
    const { data } = await api.get<{ payload: PostDetailType }>(
        `post/${post_id}`);
    
    return data;
  } catch (e: any) {
    throw Error(e);
  }
}

const postApi = {
    getPosts,
    getPostDetail
}
