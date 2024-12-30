import { UserType } from "./UserType";

export interface PostType {
  id: string;
  user_id: string;
  caption: string;
  created_at: string | null;
  updated_at: string | null;
  likes: LikeType[] | [];
  images: ImageType[];
  comments: CommentType[] | [];
}

interface CommentType {
  id: string;
  post: string;
  comment: string;
  user_id: string;
  parent_id: string | null;
  created_at: string | null;
  updated_at: string | null;
  user: UserType;
}

interface LikeType {
  id: string;
  user_id: string;
  post_id: string;
  created_at: string;
  updated_at: string;
}

interface ImageType {
  id: string;
  image: string;
  post_id: string;
  created_at: string | null;
  updated_at: string | null;
}
