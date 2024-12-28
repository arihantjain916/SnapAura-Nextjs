import { forwardRef } from "react";
import { ScrollArea } from "../ui/scroll-area";
import { ReturnDate, DateFormatter } from "@/lib/dateFormatter";


export const RenderMessage = forwardRef<HTMLDivElement, any>(
  ({ messages, senderId }, ref) => {
    return (
      <ScrollArea ref={ref} className="flex-1 p-4">
        {messages?.map((message: any) => (
          <div
            key={message.id}
            className={`flex ${
              message.senderId === senderId ? "justify-end" : "justify-start"
            } mb-4`}
          >
            <div
              className={`max-w-[70%] p-3 rounded-lg ${
                message.senderId === senderId
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              }`}
            >
              <p>{message.message}</p>
              <span className="text-xs mt-1 block opacity-70">
                {ReturnDate(message.createdAt ?? message.created_at)}{" "}
                {DateFormatter(message.createdAt ?? message.created_at)}
              </span>
            </div>
          </div>
        ))}
      </ScrollArea>
    );
  }
);
