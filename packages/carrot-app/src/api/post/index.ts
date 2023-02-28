import { api, fileApi } from '../../infra/api';
import {
  PostType,
  PostDetailType,
  CreatePostType,
  WriteCommentType,
  WriteRecommentType,
  HeartType,
} from './postDto';

const getPosts = async (admCodes: string) => {
  try {
    const { data } = await api.get<{ payload: PostType[] }>('/post', {
      params: { admCodes },
    });
    return data;
  } catch (e: any) {
    throw Error(e);
  }
};

const getPostDetail = async (post_id: string, writer_id: string) => {
  try {
    const { data } = await api.get<{ payload: PostDetailType }>(
      `post/${post_id}`,
      {
        params: { loginId: writer_id },
      },
    );

    return data;
  } catch (e: any) {
    throw Error(e);
  }
};

const getPostsByCategory = async (classif_id: string) => {
  try {
    const { data } = await api.get<{ payload: PostType[] }>(
      `post/category/${classif_id}`,
    );

    return data;
  } catch (e: any) {
    throw Error(e);
  }
};

const createPost = async ({
  image,
  classif_id,
  content,
  writer_id,
  writer_location,
}: CreatePostType) => {
  try {
    let img;
    if (image.length === 0) {
      img = false;
    } else {
      img = true;
    }

    const result = await api
      .post('/post', {
        classif_id,
        content,
        writer_id,
        writer_location,
        img,
      })
      .then((res) => {
        fileApi.post(`/post/image/upload`, {
          payload: res,
          image,
        });
      });

    return result;
  } catch (e: any) {
    throw Error(e);
  }
};

const deletePost = async (postId: number) => {
  try {
    const result = await api.post(`/post/${postId}/delete`);

    return result;
  } catch (e: any) {
    throw Error(e);
  }
};

const createComment = async ({
  post_id,
  writer_id,
  content,
}: WriteCommentType) => {
  try {
    const result = await api.post('/post/:post_id/comment', {
      post_id,
      writer_id,
      content,
    });

    return result;
  } catch (e: any) {
    throw Error(e);
  }
};

const createRecomment = async ({
  post_id,
  writer_id,
  content,
  mother_id,
}: WriteRecommentType) => {
  try {
    const result = await api.post('/post/:post_id/comment/:comment_id', {
      post_id,
      writer_id,
      content,
      mother_id,
    });

    return result;
  } catch (e: any) {
    throw Error(e);
  }
};

const getImageList = async (postId: string) => {
  try {
    const { data } = await api.get(`/post/image/${postId}`);
    return data.payload;
  } catch (e: any) {
    throw Error(e);
  }
};

const updateHeart = async ({ post_id, user_id, plus }: HeartType) => {
  try {
    const result = await api.post(`/post/${post_id}/heart`, {
      post_id,
      user_id,
      plus,
    });
    return result;
  } catch (e: any) {
    throw Error(e);
  }
};

const updateEmpa = async ({ post_id, user_id, plus }: HeartType) => {
  try {
    const result = await api.post(`/post/${post_id}/empa`, {
      post_id,
      user_id,
      plus,
    });
    return result;
  } catch (e: any) {
    throw Error(e);
  }
};

const postApi = {
  getPosts,
  getPostDetail,
  getPostsByCategory,
  createPost,
  deletePost,
  createComment,
  createRecomment,
  getImageList,
  updateHeart,
  updateEmpa,
};

export default postApi;
