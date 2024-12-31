import { NotificationTypes } from "@/types/NotificationType";
import { AlertCircle, Info, CheckCircle } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";

export const NotificationRender = ({
  notification,
}: {
  notification: NotificationTypes[];
}) => {
  const getIcon = (type?: string) => {
    switch (type) {
      case "error":
        return <AlertCircle className="h-5 w-5 text-destructive" />;
      case "warning":
        return <Info className="h-5 w-5 text-warning" />;
      case "success":
        return <CheckCircle className="h-5 w-5 text-success" />;
    }
  };

  const getToastClass = (type: string) => {
    switch (type) {
      case "error":
        return "border-destructive";
      case "warning":
        return "border-warning";
      case "success":
        return "border-success";
    }
  };
  
  return (
    <div className="space-y-2 mt-2 p-2">
      {notification.map((data) => (
        <div
          key={data.id}
          className={`${getToastClass(data.type)} w-full flex flex-col md:flex-row items-center justify-between gap-2 border-2 p-2`}
        >
          <div className="flex items-center gap-2">
          {getIcon(data.type)}
            <Avatar>
              <AvatarImage src={data.meta.user.profile} />
              <AvatarFallback></AvatarFallback>
            </Avatar>
            <h1>{data.message}</h1>
          </div>
          {data.action_type === "follow" && data.link && (
            <Button
              onClick={() => {
                console.log(data.link);
              }}
            >
              Follow
            </Button>
          )}
        </div>
      ))}
    </div>
  );
};
