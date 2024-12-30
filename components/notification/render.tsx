import { NotificationTypes } from "@/types/NotificationType";

export const NotificationRender = ({
  notification,
}: {
  notification: NotificationTypes[];
}) => {
  return (
    <>
      {notification.map((data) => (
        <div key={data.id}>
          <p>{data.id}</p>
          <h1>{data.message}</h1>
        </div>
      ))}
    </>
  );
};
