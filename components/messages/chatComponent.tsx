"use client";

import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import EmojiPicker from "emoji-picker-react";
import { ChevronLeft, Send } from "lucide-react";
import { Input } from "../ui/input";
import { useState } from "react";
import { Button } from "../ui/button";

export const ChatComponent = ({ conversation, user }: any) => {
  const [emojiDisplay, setEmojiDisplay] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const handleEmojiClick = (emoji: string) => {
    setInputValue((prev) => prev + emoji);
  };

  const handleInputChange = (e: { target: { value: string } }) => {
    setInputValue(e.target.value);
  };

  const sendMessage = () => {
    console.log(inputValue);
    // Add logic for sending a message (e.g., an API call)
  };

  return (
    <div className="flex-1 flex flex-col h-screen max-h-full">
      <div className="flex items-center gap-2 px-3 py-2 border-b border-b-slate-700 sm:px-4 sm:py-3">
        <div className="h-[42px] w-[42px] shrink-0 rounded-full">
          <img
            src={conversation.convo.otherParty.profile}
            className="h-full w-full rounded-full object-cover"
            alt="Profile"
          />
        </div>
        <div>
          <h2 className="text-base text-slate-200 text-sm sm:text-base">
            {conversation.convo.otherParty.username}
          </h2>
          <p className="text-xs text-slate-400 sm:text-sm">Online 3 min ago</p>
        </div>
      </div>

      {/* Chat messages section */}
      {/* <div className="flex-1 overflow-y-auto px-3 py-5 space-y-4">
        {conversation.messages.map((message: any) => {
          const isSender = message.senderId === user.id;
          return renderMessage(message, isSender);
        })}
      </div> */}

      {emojiDisplay && (
        <div className="absolute bottom-20 left-0 right-0 px-4">
          <EmojiPicker
            onEmojiClick={(emoji) => handleEmojiClick(emoji.emoji)}
          />
        </div>
      )}

      <div className="flex items-center gap-3 p-3 bg-slate-900 rounded-lg shadow-md py-4 mt-auto mb-12 sm:mb-4 sm:py-4 sm:p-4">
        <button
          onClick={() => setEmojiDisplay((prev) => !prev)}
          className="flex items-center justify-center w-10 h-10 text-lg bg-slate-700 text-white rounded-full hover:bg-slate-600 focus:outline-none"
        >
          😂
        </button>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Type a message..."
          className="flex-1 px-4 py-2 bg-slate-800 text-slate-200 placeholder:text-slate-400 border border-slate-700 rounded-lg focus:outline-none focus:ring focus:ring-slate-500 focus:ring-opacity-50 sm:px-3 sm:py-3 sm:text-base"
        />
        <button
          onClick={sendMessage}
          className="flex items-center justify-center px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-400 focus:ring-opacity-50 sm:px-5 sm:py-3 sm:text-base"
        >
          Send
        </button>
      </div>
    </div>

    // <>
    //   <div className="bg-white dark:bg-black p-4 flex items-center border-b border-gray-200 dark:border-gray-700">
    //     <Button variant="ghost" size="icon" className="mr-2 md:hidden">
    //       <ChevronLeft className="h-6 w-6" />
    //     </Button>
    //     <Avatar className="h-10 w-10">
    //       <AvatarImage src={"Arihant"} alt={"Arihant"} />
    //       <AvatarFallback>
    //         {"Arihant"
    //           .split(" ")
    //           .map((n) => n[0])
    //           .join("")}
    //       </AvatarFallback>
    //     </Avatar>
    //     <h2 className="ml-4 text-xl font-semibold">{"Arihant"}</h2>
    //   </div>
    //   {/* <ScrollArea className="flex-1 p-4">
    //     {messages.map((message) => (
    //       <div
    //         key={message.id}
    //         className={`flex ${message.senderId === "me" ? "justify-end" : "justify-start"} mb-4`}
    //       >
    //         <div
    //           className={`max-w-[70%] p-3 rounded-lg ${
    //             message.senderId === "me"
    //               ? "bg-blue-500 text-white"
    //               : "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
    //           }`}
    //         >
    //           <p>{message.text}</p>
    //           <span className="text-xs mt-1 block opacity-70">
    //             {message.timestamp}
    //           </span>
    //         </div>
    //       </div>
    //     ))}
    //   </ScrollArea> */}
    //   <div className="bg-white dark:bg-black p-4 border-t border-gray-200 dark:border-gray-700">
    //     <div className="flex items-center">
    //       <Input
    //         type="text"
    //         placeholder="Type a message..."
    //         value={inputValue}
    //         onChange={handleInputChange}
    //         className="flex-1 mr-2 bg-gray-100 dark:bg-gray-700 border-gray-200 dark:border-gray-600"
    //         onKeyUpCapture={(e) => e.key === "Enter" && sendMessage()}
    //       />
    //       <Button onClick={sendMessage}>
    //         <Send className="h-4 w-4" />
    //       </Button>
    //     </div>
    //   </div>
    // </>
  );
};
