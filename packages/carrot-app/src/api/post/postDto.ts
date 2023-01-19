import { UserType } from "../user/userDto";

export interface PostType  {
    post_id: number;
    writer_id: number;
    title: string;
    content: string;
    views: number;
    chat: number;
    empa: number;
    heart: number;
    created_at: any;
    lowest_sect_name: string;
    category_name: string;
}   


export interface PostDetailType {
    user: UserType;
    post: PostType;
}