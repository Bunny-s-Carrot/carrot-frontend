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
    addr_name: string;
    category_name: string;
}   

export interface CreatePostType {
    classif_id: number,
    writer_id: number,
    content: string,
    image: File[]
}

export interface CommentType {
    comment_id: number;
    name: string;
    addr_name: string;
    created_at: any;
    comment: string;
    likes: number;
    depth: number;
    mother_id: number;
}

export interface PostDetailType {
    user: UserType;
    post: PostType;
    comment: CommentType[];
    heart: boolean;
    empaOne: boolean;
    empaAll: number;
}

export interface WriteCommentType {
    post_id: number;
    writer_id: number;
    content: string;
}

export interface WriteRecommentType {
    post_id: number;
    writer_id: number;
    content: string;
    mother_id: number;
}

export interface HeartType {
    user_id: number;
    post_id: number;
    plus: boolean;
}