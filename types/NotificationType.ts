import { PostType } from "./PostType";
import { UserType } from "./UserType";


export interface NotificationTypes {
  id: string;
  message: string;
  is_read: number;
  action_type: string;
  read_at: null | string;
  type: string;
  user_id: string;
  user: UserType;
  meta: Meta;
  updated_at: string;
  created_at: string;
}

interface Meta {
  post_id: null | string;
  post: PostType | null;
  user_id: string;
  user: UserType;
  button_text:string;
  link?: string;
}
