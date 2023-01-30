import { api } from "../../infra/api";
import { PostType, PostDetailType, CreatePostType  } from "./postDto";

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

const getPostsByCategory = async (classif_id: string) => {
  try {
        const { data } = await api.get<{ payload: PostType[] }>(
        `post/category/${classif_id}`);
    
    return data;
  } catch (e: any) {
    throw Error(e);
  }
}

const createPost = async ({
  classif_id,
  content,
  writer_id,
}: CreatePostType) => {
    try {
      const result = await api.post('/post',
      {
        classif_id,
        content,
        writer_id,
      })
      
      return result;
    } catch (e: any) {
      throw Error(e);
    }
  }


const postApi = {
    getPosts,
    getPostDetail,
    getPostsByCategory,
    createPost
}

export default postApi;