import { UserType } from "../user/userDto";

export interface PostType  {
    post_id: number;
    writer_id: number;
    title: string;
    content: string;
    chat_count: number;
    empa_count: number;
    created_at: any;
    lowest_sect_name: string;
    category_name: string;
}   


export interface PostDetailType {
    user: UserType;
    post: PostType;
}