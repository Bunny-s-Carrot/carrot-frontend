import { api } from "../../infra/api";
import { PostType } from "./postDto";

const getPosts = async () => {
    try {
        const { data } = await api.get<{ payload: PostType[] }>('/post');
        return data;
    } catch (e:any) {
        throw Error(e);
    }
}

const postApi = {
    getPosts,
}

export default postApi;