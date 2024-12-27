import { formatDistanceToNow, format } from "date-fns";

export const DateFormatter = (date: string) => {
  const timeAgo = formatDistanceToNow(new Date(date), { addSuffix: true });
  return timeAgo;
};

export const ReturnDate = (date: string) => {
  const formattedDate = format(new Date(date), 'dd-MMMM-yy')

  return formattedDate
};
