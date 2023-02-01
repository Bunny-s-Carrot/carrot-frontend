import { api } from "../../infra/api";
import { PostType, PostDetailType, CreatePostType, WriteCommentType, WriteRecommentType  } from "./postDto";

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

const createComment = async ({
  post_id,
  writer_id,
  content
}: WriteCommentType) => {
  try {
    const result = await api.post('/post/:post_id',
    {
      post_id,
      writer_id,
      content
    })

    return result;
  } catch (e: any) {
    throw Error(e);
  }
}

const createRecomment = async ({
  post_id,
  writer_id,
  content,
  mother_id
}: WriteRecommentType) => {
  try {
    const result = await api.post('/post/:post_id/comment/:comment_id',
    {
      post_id,
      writer_id,
      content,
      mother_id
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
    createPost,
    createComment,
    createRecomment
}

export default postApi;