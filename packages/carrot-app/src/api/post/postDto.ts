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

export interface CreatePostType {
    classif_id: number,
    writer_id: number,
    content: string,
}

export interface CommentType {
    comment_id: number;
    name: string;
    lowest_sect_name: string;
    created_at: any;
    comment: string;
    likes: number;
    depth: number;
}

export interface PostDetailType {
    user: UserType;
    post: PostType;
    comment: CommentType[];
}
