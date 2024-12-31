import { PostType } from "./PostType";
import { UserType } from "./UserType";

export interface FollowRequestResponseType {
  data: NotificationTypes;
  user: UserType;
  post: null | PostType[];
}

export interface NotificationTypes {
  id: string;
  user_id: string;
  message: string;
  type: string;
  link: string;
  is_read: number;
  read_at: null | string;
  action_type: string;
  created_at: string;
  updated_at: string;
  user: UserType;
}
