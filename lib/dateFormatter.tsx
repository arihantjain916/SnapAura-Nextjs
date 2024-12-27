import { formatDistanceToNow } from "date-fns";

export const DateFormatter = (date: string) => {
  const timeAgo = formatDistanceToNow(new Date(date), { addSuffix: true });
  return timeAgo;
};
